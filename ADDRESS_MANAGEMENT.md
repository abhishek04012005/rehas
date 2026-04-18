# User Profile Address Management

## Overview

Added comprehensive address management functionality to the user profile settings page. Users can now add, edit, view, and delete multiple addresses with support for address types (home, work, other) and default address selection.

## Features

### 1. **Address Storage**
- **Database Table**: `user_addresses`
- **Fields**:
  - id (Primary Key)
  - user_id (Foreign Key to auth.users)
  - address_type ('home' | 'work' | 'other')
  - full_name (Required)
  - phone_number (Optional)
  - address_line_1 (Required)
  - address_line_2 (Optional)
  - city (Required)
  - state (Required)
  - postal_code (Required)
  - country (Default: India)
  - is_default (Boolean)
  - is_active (Boolean)
  - created_at (Timestamp)
  - updated_at (Timestamp)

### 2. **User Interface**
Located in `/account/settings` page with the following sections:

#### Address Book Header
- "Address Book" heading
- "Add New Address" button

#### Address Display
- Grid layout showing all active user addresses
- Address cards showing:
  - Address type badge (home, work, other)
  - Default badge (if default)
  - Full address details
  - Action buttons (Set as Default, Edit, Delete)

#### Add/Edit Address Modal
- Modal form overlay
- Form fields for all address information
- Checkbox to set address as default
- Cancel and Save/Update buttons

### 3. **Core Functionality**

#### View Addresses
```typescript
const getUserAddresses = async () => {
  // Retrieves all active addresses for the logged-in user
  // Sorted by: is_default (true first), then created_at (newest first)
}
```

#### Add Address
```typescript
const addUserAddress = async (address) => {
  // Creates a new address
  // If marked as default, unsets other defaults for that address type
  // Returns the created address object
}
```

#### Update Address
```typescript
const updateUserAddress = async (id, updates) => {
  // Updates specific fields of an address
  // If setting as default, unsets other defaults for that address type
  // Only updates addresses belonging to the current user
}
```

#### Delete Address
```typescript
const deleteUserAddress = async (id) => {
  // Soft deletes by setting is_active to false
  // Prevents data loss while removing from user view
}
```

#### Set Default Address
```typescript
const setDefaultAddress = async (id) => {
  // Sets an address as the default for its type
  // Unsets all other defaults for that address type
  // Ensures only one default per address type per user
}
```

## Implementation Details

### Database Setup

Run the following SQL to create the user_addresses table:

```sql
-- Create user addresses table
CREATE TABLE IF NOT EXISTS user_addresses (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Address Information
  address_type VARCHAR(50) DEFAULT 'home' CHECK (address_type IN ('home', 'work', 'other')),
  full_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(15),
  address_line_1 VARCHAR(500) NOT NULL,
  address_line_2 VARCHAR(500),
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20) NOT NULL,
  country VARCHAR(100) DEFAULT 'India',

  -- Address metadata
  is_default BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Ensure only one default address per user per type
  UNIQUE(user_id, address_type, is_default) DEFERRABLE INITIALLY DEFERRED
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_addresses_user_id ON user_addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_user_addresses_type ON user_addresses(address_type);
CREATE INDEX IF NOT EXISTS idx_user_addresses_default ON user_addresses(user_id, is_default);

-- Auto-update timestamp function
CREATE OR REPLACE FUNCTION update_user_addresses_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_user_addresses_updated_at_trigger ON user_addresses;
CREATE TRIGGER update_user_addresses_updated_at_trigger
  BEFORE UPDATE ON user_addresses
  FOR EACH ROW
  EXECUTE FUNCTION update_user_addresses_updated_at();

-- Row Level Security
ALTER TABLE user_addresses ENABLE ROW LEVEL SECURITY;

-- Users can only see/modify their own addresses
CREATE POLICY "Users can view their own addresses" ON user_addresses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own addresses" ON user_addresses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own addresses" ON user_addresses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own addresses" ON user_addresses
  FOR DELETE USING (auth.uid() = user_id);
```

### Update AuthContext

Added new methods to `AuthContextType` interface:

```typescript
export interface UserAddress {
  id: number;
  user_id: string;
  address_type: 'home' | 'work' | 'other';
  full_name: string;
  phone_number?: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// New methods added to AuthContextType
getUserAddresses: () => Promise<{ data?: UserAddress[]; error?: string }>;
addUserAddress: (address: ...) => Promise<{ data?: UserAddress; error?: string }>;
updateUserAddress: (id: number, address: ...) => Promise<{ error?: string }>;
deleteUserAddress: (id: number) => Promise<{ error?: string }>;
setDefaultAddress: (id: number) => Promise<{ error?: string }>;
```

### Updated Settings Page

The settings page now includes:

1. **Profile Information** - Update user name (existing)
2. **Change Password** - Update user password (existing)
3. **Address Book** - NEW section for managing addresses

Address management features:
- Load addresses on page load
- Display all addresses in a grid
- Modal form for adding/editing
- Edit individual addresses
- Delete addresses (soft delete)
- Set default address
- Form validation

## File Changes

### New Files
- `src/db/user_addresses_table.sql` - Database schema

### Modified Files
- `src/context/AuthContext.tsx` - Added UserAddress interface and address management methods
- `src/app/account/settings/page.tsx` - Added address management UI
- `src/app/account/settings/settings.module.css` - Added styles for address section

## Usage

### For Users
1. Go to `/account/settings`
2. Scroll to "Address Book" section
3. Click "Add New Address" button
4. Fill in address details
5. Optionally set as default
6. Click "Save Address"

### For Developers
```typescript
import { useAuth } from '@/context/AuthContext';

function MyComponent() {
  const { getUserAddresses, addUserAddress, updateUserAddress, deleteUserAddress, setDefaultAddress } = useAuth();

  // Load addresses
  const loadAddresses = async () => {
    const result = await getUserAddresses();
    if (result.data) {
      setAddresses(result.data);
    }
  };

  // Add new address
  const handleAddAddress = async (addressData) => {
    const result = await addUserAddress(addressData);
    if (!result.error) {
      // Address added successfully
      loadAddresses();
    }
  };

  // Or use in checkout
  const updateCheckoutAddress = async (addressId) => {
    const result = await setDefaultAddress(addressId);
    if (!result.error) {
      // Use default address in checkout
    }
  };
}
```

## Integration with Checkout

The address management system can be easily integrated with the checkout process:

1. On checkout page, retrieve user's saved addresses
2. Allow selection of saved address instead of entering manually
3. Use the selected address's ID to populate checkout form
4. Refactor form to use default address data

## Security Considerations

1. **Row Level Security (RLS)**: All addresses are protected by RLS policies
2. **User Isolation**: Users can only access their own addresses
3. **Soft Deletes**: Addresses are marked as inactive, not permanently deleted
4. **Authorization**: All operations verify user_id matches current user
5. **Data Privacy**: No user addresses are exposed to other users

## Performance

1. **Indexes**: Created on user_id, address_type, and is_default for fast queries
2. **Pagination**: Currently loads all addresses (can be paginated if needed)
3. **Soft Deletes**: Uses is_active flag to filter active addresses
4. **Ordering**: Sorted by is_default and created_at for UX

## Future Enhancements

1. **Address Validation**: Integrate with postal code validation APIs
2. **Google Places Integration**: Auto-complete address fields
3. **Pagination**: For users with many addresses
4. **Address History**: Track when addresses were used
5. **Bulk Operations**: Manage multiple addresses at once
6. **Checkout Integration**: Pre-fill checkout with saved addresses
7. **Address Analytics**: Track which addresses are most used
8. **Export Addresses**: Allow users to export address list

## Testing

Manual testing checklist:
- [ ] Add new address
- [ ] Edit existing address
- [ ] Delete address
- [ ] Set address as default
- [ ] Verify soft delete (address marked is_active=false)
- [ ] Test with multiple address types
- [ ] Verify only one default per type
- [ ] Test form validation
- [ ] Test error handling
- [ ] Test RLS (user can only see own addresses)