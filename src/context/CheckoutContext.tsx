'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

export type OrderType = 'service' | 'course' | 'product';

export interface CartItem {
  id: string;
  productTitle: string;
  amount: number;
  quantity: number;
  type?: OrderType;
  serviceId?: string;
  description?: string;
  isPoojaSelected?: boolean;
  poojaLabel?: string;
  poojaPrice?: string;
  productId?: string;
  productImage?: string;
  selectedTier?: 'root' | 'aura' | 'divine';
}

export interface ProductData {
  productTitle: string;
  amount: number;
  type?: OrderType;
  serviceId?: string;
  description?: string;
  isPoojaSelected?: boolean;
  poojaLabel?: string;
  poojaPrice?: string;
  selectedTier?: 'root' | 'aura' | 'divine';
}

interface CheckoutContextType {
  productData: ProductData | null;
  setProductData: (data: ProductData | null) => void;
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  loading: boolean;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Initialize cartItems from localStorage synchronously
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('localCartItems');
        if (savedCart) {
          return JSON.parse(savedCart);
        }
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
    return [];
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const syncLocalCartToDatabase = async () => {
    if (!user?.id) return;

    const localItems = cartItems;
    console.log('Syncing local cart to database for user:', user.id, 'local items:', localItems.length);
    
    const cartUserId = user.id;

    try {
      // Get current database cart
      const { data: dbCartItems, error: dbError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', cartUserId);

      if (dbError) {
        const errorMsg = formatDbError(dbError);
        console.warn('Error fetching DB cart items:', errorMsg);
        
        // If UUID error, it means the user ID type might not be matching
        if (errorMsg.includes('invalid input syntax for type uuid')) {
          console.error('Critical: user_id type mismatch detected. user_id:', cartUserId, 'type:', typeof cartUserId);
        }
        // Continue with sync even if DB fetch fails - we'll try to add items
      }

      console.log('Current DB items:', dbCartItems?.length || 0);

      // For each local item, check if it exists in DB
      if (localItems.length > 0) {
        for (const localItem of localItems) {
          let localProductId: string = localItem.productId || localItem.id;
          
          // Ensure product ID is string
          if (typeof localProductId === 'number') {
            localProductId = (localProductId as number).toString();
          }
          
          const existsInDb = dbCartItems?.some((dbItem) => dbItem.product_id === localProductId);
          
          if (!existsInDb) {
            // Add to database
            const dbItem = {
              user_id: cartUserId,
              product_id: localProductId,
              product_title: localItem.productTitle,
              product_type: localItem.type || 'product',
              price: localItem.amount.toString(),
              quantity: localItem.quantity,
              product_image: localItem.productImage,
              product_description: localItem.description,
              service_id: localItem.serviceId,
              is_pooja_selected: localItem.isPoojaSelected || false,
              pooja_label: localItem.poojaLabel,
              pooja_price: localItem.poojaPrice,
            };

            const { error: insertError } = await supabase.from('cart_items').insert([dbItem]);
            if (insertError) {
              const errorMsg = formatDbError(insertError);
              console.error('Error syncing item to database:', errorMsg);
              
              if (errorMsg.includes('invalid input syntax for type uuid')) {
                console.error('UUID Sync Error - localProductId:', localProductId, 'type:', typeof localProductId);
                console.error('UUID Sync Error - cartUserId:', cartUserId, 'type:', typeof cartUserId);
              }
            } else {
              console.log('Synced item to database:', localProductId);
            }
          } else {
            console.log('Item already exists in DB:', localProductId);
          }
        }
        
        // Clear localStorage after successful sync
        try {
          localStorage.removeItem('localCartItems');
          console.log('Cleared local cart from localStorage');
        } catch (e) {
          console.error('Failed to clear localStorage:', e);
        }
      }

      // Reload cart from database to get accurate state
      console.log('Loading cart from database after sync...');
      await loadCartFromDatabase();
      console.log('Cart sync completed');
    } catch (error) {
      console.error('Failed to sync cart to database:', error);
      console.error('Sync exception details:', error);
    }
  };

  // Load cart items from database when user changes
  useEffect(() => {
    if (user?.id) {
      console.log('User logged in, syncing cart...');
      // Sync local cart to database, then load fresh cart
      syncLocalCartToDatabase();
    } else {
      console.log('User logged out, keeping local cart');
    }
  }, [user?.id]);

  const formatDbError = (error: unknown) => {
    if (!error) return 'Unknown database error';
    if (error instanceof Error) return error.message;
    if (typeof error === 'object') {
      const err = error as Record<string, unknown>;
      return (
        String(err.message ?? err.error ?? err.code ?? JSON.stringify(err, null, 2))
      );
    }
    return String(error);
  };

  const loadCartFromDatabase = async () => {
    if (!user?.id) {
      console.log('No user ID, skipping cart load');
      return;
    }

    try {
      setLoading(true);
      console.log('Loading cart for user:', user.id, 'type:', typeof user.id);

      // Check if cart_items table exists by trying a simple query
      console.log('Checking if cart_items table exists...');
      const { data: tableCheckData, error: tableCheckError } = await supabase
        .from('cart_items')
        .select('id')
        .limit(1);

      if (tableCheckError) {
        console.warn('Cart table does not exist yet. Please run the cart_items_table.sql in Supabase.');
        console.error('Table check error:', formatDbError(tableCheckError));
        setLoading(false);
        return;
      }

      console.log('Table exists, proceeding with cart load');

      const cartUserId = user.id;
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', cartUserId)
        .order('created_at', { ascending: false });

      if (error) {
        const errorMessage = formatDbError(error);
        console.error('Error loading cart:', errorMessage);
        console.error('Error details:', error);
        console.error('Error object props:', Object.getOwnPropertyNames(error));
        if (errorMessage.includes('invalid input syntax for type uuid') && /^[0-9]+$/.test(cartUserId)) {
          console.error('Cart user_id appears to be UUID, but logged-in user.id is numeric. Update your cart_items.user_id to TEXT or align your auth IDs.');
        }
        return;
      }

      console.log('Cart query successful, data:', data);

      if (data && data.length > 0) {
        const formattedItems: CartItem[] = data.map(item => ({
          id: item.id,
          productTitle: item.product_title,
          amount: parseFloat((item.price || '').toString().replace(/[₹,]/g, '')) || 0,
          quantity: item.quantity,
          type: item.product_type as OrderType,
          serviceId: item.service_id,
          description: item.product_description,
          isPoojaSelected: item.is_pooja_selected,
          poojaLabel: item.pooja_label,
          poojaPrice: item.pooja_price,
          productId: item.product_id,
          productImage: item.product_image,
        }));
        console.log('Formatted cart items:', formattedItems.length, formattedItems);
        setCartItems(formattedItems);
      } else {
        console.log('No cart data found, clearing cart');
        setCartItems([]);
      }
    } catch (error) {
      console.error('Failed to load cart from database:', error);
      console.error('Exception details:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveCartToDatabase = async (items: CartItem[]) => {
    if (!user?.id) return;

    const cartUserId = user.id;

    try {
      // First, clear existing cart items for this user
      const { error: deleteError } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', cartUserId);

      if (deleteError) {
        console.error('Error clearing cart:', deleteError);
        return;
      }

      console.log('Successfully cleared all cart items for user');

      // Then insert new cart items
      if (items.length > 0) {
        const dbItems = items.map(item => ({
          user_id: cartUserId,
          product_id: item.productId || item.id,
          product_title: item.productTitle,
          product_type: item.type || 'product',
          price: item.amount.toString(),
          quantity: item.quantity,
          product_image: item.productImage,
          product_description: item.description,
          service_id: item.serviceId,
          is_pooja_selected: item.isPoojaSelected || false,
          pooja_label: item.poojaLabel,
          pooja_price: item.poojaPrice,
        }));

        const { error, data } = await supabase
          .from('cart_items')
          .insert(dbItems);

        if (error) {
          const errorMessage = formatDbError(error);
          console.error('Error saving cart to database:', errorMessage);
          console.error('Error details:', error);
        } else {
          console.log('Cart saved successfully:', dbItems.length, 'items inserted', data);
        }
      } else {
        console.log('Cart is empty, all items cleared');
      }
    } catch (error) {
      console.error('Failed to save cart to database:', error);
    }
  };

  const removeItemFromDatabase = async (itemId: string) => {
    if (!user?.id) return;

    try {
      console.log('Removing item from database:', itemId, 'Type:', typeof itemId);
      
      // Ensure itemId is a valid UUID format or handle appropriately
      if (!itemId || typeof itemId !== 'string' || itemId.trim() === '') {
        console.error('Invalid itemId to remove:', itemId);
        return false;
      }

      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) {
        const errorMsg = formatDbError(error);
        console.error('Error removing item from database:', errorMsg);
        
        // If it's a UUID syntax error, the item might not exist
        if (errorMsg.includes('invalid input syntax for type uuid')) {
          console.warn('ItemId appears invalid, skipping database removal:', itemId);
          return true; // Consider it success since the item shouldn't be there
        }
        return false;
      }

      console.log('Item successfully removed from database:', itemId);
      
      // Reload cart from database to ensure consistency
      await loadCartFromDatabase();
      return true;
    } catch (error) {
      console.error('Failed to remove item from database:', error);
      return false;
    }
  };

  const addItemToDatabase = async (item: CartItem) => {
    if (!user?.id) return;

    const cartUserId = user.id;

    try {
      console.log('Adding item to database:', item.productId || item.id);
      
      // Validate product_id is not a plain number that could cause UUID errors
      let productId: string = item.productId || item.id;
      if (typeof productId === 'number') {
        productId = (productId as number).toString();
        console.warn('Converted numeric product_id to string:', productId);
      }
      
      if (!productId || typeof productId !== 'string' || productId.trim() === '') {
        console.error('Invalid productId, cannot add to database:', productId);
        return false;
      }

      const dbItem = {
        user_id: cartUserId,
        product_id: productId,
        product_title: item.productTitle,
        product_type: item.type || 'product',
        price: item.amount.toString(),
        quantity: item.quantity,
        product_image: item.productImage,
        product_description: item.description,
        service_id: item.serviceId,
        is_pooja_selected: item.isPoojaSelected || false,
        pooja_label: item.poojaLabel,
        pooja_price: item.poojaPrice,
      };

      const { error, data } = await supabase
        .from('cart_items')
        .insert([dbItem]);

      if (error) {
        const errorMsg = formatDbError(error);
        console.error('Error adding item to database:', errorMsg);
        
        // If UUID error, log the problematic value for debugging
        if (errorMsg.includes('invalid input syntax for type uuid')) {
          console.error('UUID Error Details - cartUserId:', cartUserId, 'Type:', typeof cartUserId);
          console.error('UUID Error Details - productId:', productId, 'Type:', typeof productId);
        }
        return false;
      }

      console.log('Item successfully added to database:', data);
      
      // Reload cart from database to ensure consistency with DB-generated IDs
      await loadCartFromDatabase();
      return true;
    } catch (error) {
      console.error('Failed to add item to database:', error);
      console.error('Exception details:', error);
      return false;
    }
  };

  const handleSetProductData = (data: ProductData | null) => {
    setProductData(data);
    if (typeof window !== 'undefined') {
      try {
        if (data) {
          localStorage.setItem('checkoutProductData', JSON.stringify(data));
        } else {
          localStorage.removeItem('checkoutProductData');
        }
      } catch (error) {
        console.error('Failed to save checkout data to localStorage:', error);
      }
    }
  };

  const addToCart = async (item: CartItem) => {
    // Always add to local state, regardless of login status
    const itemProductId = item.productId || item.id;
    const existingItem = cartItems.find((existing) => (existing.productId || existing.id) === itemProductId);
    
    if (existingItem) {
      // Update quantity of existing item
      setCartItems((current) => {
        const next = [...current];
        const idx = next.findIndex((i) => (i.productId || i.id) === itemProductId);
        if (idx !== -1) {
          next[idx].quantity += item.quantity;
          console.log('Updated existing cart item quantity:', itemProductId, 'new quantity:', next[idx].quantity);
        }
        return next;
      });

      // If logged in, update in database
      if (user?.id) {
        await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + item.quantity })
          .eq('id', existingItem.id);
        
        console.log('Updated item quantity in database');
      }
    } else {
      // Generate unique ID for local items (combine product ID with timestamp if needed)
      const newItem: CartItem = {
        ...item,
        productId: itemProductId,
        id: item.id || `local-${Date.now()}`,
      };
      
      // Add new item to local state
      setCartItems((current) => {
        const updated = [...current, newItem];
        console.log('Added new cart item:', itemProductId, 'Total items:', updated.length);
        return updated;
      });

      // If logged in, add to database
      if (user?.id) {
        await addItemToDatabase(newItem);
      }
    }
  };

  const removeFromCart = async (itemId: string) => {
    // Always remove from local state
    setCartItems((current) => current.filter(item => item.id !== itemId));

    // If logged in, remove from database
    if (user?.id) {
      await removeItemFromDatabase(itemId);
    }
  };

  const updateCartItemQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return;

    // Always update local state
    setCartItems((current) => {
      return current.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
    });

    // If logged in, update in database
    if (user?.id) {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemId);

      if (error) {
        console.error('Error updating item quantity in database:', formatDbError(error));
        return;
      }

      console.log('Item quantity updated in database:', itemId);
    }
  };

  const clearCart = async () => {
    // Always clear local state
    setCartItems([]);

    // If logged in, clear from database
    if (!user?.id) return;

    const cartUserId = user.id;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', cartUserId);

      if (error) {
        console.error('Failed to clear cart from database:', formatDbError(error));
      } else {
        console.log('Cart cleared successfully');
      }
    } catch (error) {
      console.error('Failed to clear cart from database:', error);
    }
  };

  // Load product data from localStorage on mount
  useEffect(() => {
    try {
      const savedProduct = localStorage.getItem('checkoutProductData');
      if (savedProduct) {
        setProductData(JSON.parse(savedProduct));
      }
      
      // For logged-in users, load cart from database
      // For non-logged-in users, cart is already loaded from localStorage in initial state
    } catch (error) {
      console.error('Failed to load checkout data from localStorage:', error);
    }
  }, []);

  // Save local cart to localStorage whenever it changes (for offline users)
  useEffect(() => {
    if (!user?.id && typeof window !== 'undefined') {
      try {
        localStorage.setItem('localCartItems', JSON.stringify(cartItems));
        console.log('Saved local cart to localStorage:', cartItems.length, 'items');
      } catch (error) {
        console.error('Failed to save local cart to localStorage:', error);
      }
    }
  }, [cartItems, user?.id]);

  return (
    <CheckoutContext.Provider value={{
      productData,
      setProductData: handleSetProductData,
      cartItems,
      addToCart,
      removeFromCart,
      updateCartItemQuantity,
      clearCart,
      loading,
    }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within CheckoutProvider');
  }
  return context;
}

