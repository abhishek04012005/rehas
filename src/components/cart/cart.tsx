'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCheckout } from '@/context/CheckoutContext';
import { useAuth } from '@/context/AuthContext';
import styles from './cart.module.css';

export default function Cart() {
  const router = useRouter();
  const { cartItems, removeFromCart, updateCartItemQuantity, clearCart } = useCheckout();
  const { user } = useAuth();

  const totalAmount = cartItems.reduce((sum, item) => sum + item.amount * item.quantity, 0);

  const handleProceed = () => {
    if (!user) {
      router.push('/auth?redirect=/checkout');
      return;
    }
    router.push('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.cartContainer}>
        <div className={styles.emptyCartCard}>
          <h2>Your cart is empty</h2>
          <p>Add products from the shop to place a multi-item order.</p>
          <Link href="/merchandise" className={styles.emptyCartLink}>
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartCard}>
        <header className={styles.cartHeader}>
          <div>
            <h1 className={styles.cartTitle}>Shopping Cart</h1>
            <p className={styles.cartSubtitle}>{cartItems.length} item{cartItems.length > 1 ? 's' : ''} in your cart</p>
          </div>
          <div className={styles.headerActions}>
            <button type="button" className={styles.clearButton} onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </header>

        <div className={styles.cartLayout}>
          <section className={styles.cartList}>
            {cartItems.map((item) => (
              <article key={item.id} className={styles.cartItem}>
                <div className={styles.itemBadgeTop}>
                  <span>{item.type ? item.type.toUpperCase() : 'PRODUCT'}</span>
                </div>
                <div className={styles.itemContent}>
                  <div className={styles.itemInfo}>
                    <div className={styles.itemName}>{item.productTitle}</div>
                    {item.description && <p className={styles.itemDescription}>{item.description}</p>}
                    {item.isPoojaSelected && item.poojaLabel && (
                      <div className={styles.poojaNote}>Pooja: {item.poojaLabel}</div>
                    )}
                    <div className={styles.itemMetaRow}>
                      <span className={styles.priceLabel}>₹{item.amount.toFixed(2)}</span>
                      <span className={styles.perItemText}>per item</span>
                    </div>
                    <div className={styles.itemControls}>
                      <div className={styles.quantityControls}>
                        <button type="button" className={styles.quantityButton} onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}>-</button>
                        <span className={styles.quantityValue}>{item.quantity}</span>
                        <button type="button" className={styles.quantityButton} onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <button type="button" className={styles.removeButton} onClick={() => removeFromCart(item.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className={styles.itemSummary}>
                    <div className={styles.subtotalLabel}>Subtotal</div>
                    <div className={styles.subtotalValue}>₹{(item.amount * item.quantity).toFixed(2)}</div>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className={styles.summaryWrapper}>
            <div className={styles.cartSummary}>
              <div className={styles.summaryTitle}>Price Details</div>
              <div className={styles.summaryRow}>
                <span>Price ({cartItems.length} item{cartItems.length > 1 ? 's' : ''})</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Delivery Charges</span>
                <span className={styles.freeLabel}>Free</span>
              </div>
              <div className={styles.summaryDivider} />
              <div className={styles.summaryRowTotal}>
                <span>Total Amount</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
              <button type="button" className={styles.checkoutButton} onClick={handleProceed}>
                {user ? 'Proceed to Checkout' : 'Sign In to Checkout'}
              </button>
              <button type="button" className={styles.continueButton} onClick={() => router.push('/merchandise')}>
                Continue Shopping
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
