'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Delete as DeleteIcon, Edit as EditIcon, Star as StarIcon } from '@mui/icons-material';
import { useAuth } from '@/context/AuthContext';
import styles from './addresses.module.css';

export default function AddressesPage() {
  const { user, loading, getUserAddresses, addUserAddress, updateUserAddress, deleteUserAddress, setDefaultAddress } = useAuth();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [addressForm, setAddressForm] = useState({
    address_type: 'home' as 'home' | 'work' | 'other',
    full_name: '',
    email: '',
    phone_number: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'India',
    is_default: false,
    is_active: true,
  });

  useEffect(() => {
    if (user) {
      loadAddresses();
    }
  }, [user]);

  const loadAddresses = async () => {
    const result = await getUserAddresses();
    if (result.data) {
      setAddresses(result.data);
    }
  };

  const handleAddressSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSaving(true);

    if (!addressForm.full_name.trim() || !addressForm.address_line_1.trim() || !addressForm.city.trim() || !addressForm.state.trim() || !addressForm.postal_code.trim()) {
      setError('Please fill in all required fields.');
      setSaving(false);
      return;
    }

    let result;
    if (editingAddress) {
      result = await updateUserAddress(editingAddress.id, addressForm);
    } else {
      result = await addUserAddress(addressForm);
    }

    if (result.error) {
      setError(result.error);
    } else {
      setMessage(editingAddress ? 'Address updated successfully.' : 'Address added successfully.');
      setShowAddressForm(false);
      setEditingAddress(null);
      resetAddressForm();
      loadAddresses();
      setTimeout(() => setMessage(''), 3000);
    }

    setSaving(false);
  };

  const resetAddressForm = () => {
    setAddressForm({
      address_type: 'home',
      full_name: '',
      email: '',
      phone_number: '',
      address_line_1: '',
      address_line_2: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'India',
      is_default: false,
      is_active: true,
    });
  };

  const handleEditAddress = (address: any) => {
    setEditingAddress(address);
    setAddressForm({
      address_type: address.address_type,
      full_name: address.full_name,
      email: address.email || '',
      phone_number: address.phone_number || '',
      address_line_1: address.address_line_1,
      address_line_2: address.address_line_2 || '',
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      country: address.country,
      is_default: address.is_default,
      is_active: address.is_active,
    });
    setShowAddressForm(true);
    window.scrollTo(0, 0);
  };

  const handleDeleteAddress = async (id: number) => {
    if (!confirm('Are you sure you want to delete this address?')) return;

    setSaving(true);
    const result = await deleteUserAddress(id);
    if (result.error) {
      setError(result.error);
    } else {
      setMessage('Address deleted successfully.');
      loadAddresses();
      setTimeout(() => setMessage(''), 3000);
    }
    setSaving(false);
  };

  const handleSetDefault = async (id: number) => {
    setSaving(true);
    const result = await setDefaultAddress(id);
    if (result.error) {
      setError(result.error);
    } else {
      setMessage('Default address updated successfully.');
      loadAddresses();
      setTimeout(() => setMessage(''), 3000);
    }
    setSaving(false);
  };

  if (loading) {
    return <div className={styles.loading}>Loading address book...</div>;
  }

  if (!user) {
    return (
      <div className={styles.emptyState}>
        <h1>Please sign in to manage addresses</h1>
        <p>You need to be logged in to access your address book.</p>
        <Link href="/auth?redirect=/account/addresses" className={styles.loginButton}>
          Login / Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.addressesPage}>
      <div className={styles.headerSection}>
        <div>
          <h1>Address Book</h1>
          <p>Manage your delivery addresses</p>
        </div>
        <Link href="/account/settings" className={styles.linkButton}>
          Account Settings
        </Link>
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}
      {message && <div className={styles.successBox}>{message}</div>}

      {showAddressForm && (
        <div className={styles.addressFormOverlay} onClick={() => !saving && setShowAddressForm(false)}>
          <form className={styles.addressForm} onClick={(e) => e.stopPropagation()} onSubmit={handleAddressSubmit}>
            <div className={styles.formHeader}>
              <h3>{editingAddress ? 'Edit Address' : 'Add New Address'}</h3>
              <button type="button" className={styles.closeButton} onClick={() => !saving && setShowAddressForm(false)} disabled={saving}>
                ✕
              </button>
            </div>

            <div className={styles.formGrid}>
              <label>
                <span>Address Type *</span>
                <select value={addressForm.address_type} onChange={(e) => setAddressForm({ ...addressForm, address_type: e.target.value as any })} required>
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                  <option value="other">Other</option>
                </select>
              </label>

              <label>
                <span>Full Name *</span>
                <input type="text" value={addressForm.full_name} onChange={(e) => setAddressForm({ ...addressForm, full_name: e.target.value })} placeholder="Enter full name" required />
              </label>

              <label>
                <span>Email</span>
                <input type="email" value={addressForm.email} onChange={(e) => setAddressForm({ ...addressForm, email: e.target.value })} placeholder="your.email@gmail.com" />
              </label>

              <label>
                <span>Phone Number</span>
                <input type="tel" value={addressForm.phone_number} onChange={(e) => setAddressForm({ ...addressForm, phone_number: e.target.value })} placeholder="Enter phone number" />
              </label>

              <label>
                <span>Address Line 1 *</span>
                <input type="text" value={addressForm.address_line_1} onChange={(e) => setAddressForm({ ...addressForm, address_line_1: e.target.value })} placeholder="Street address" required />
              </label>

              <label>
                <span>Address Line 2</span>
                <input type="text" value={addressForm.address_line_2} onChange={(e) => setAddressForm({ ...addressForm, address_line_2: e.target.value })} placeholder="Apartment, suite, etc. (optional)" />
              </label>

              <label>
                <span>City *</span>
                <input type="text" value={addressForm.city} onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })} placeholder="City" required />
              </label>

              <label>
                <span>State *</span>
                <input type="text" value={addressForm.state} onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })} placeholder="State" required />
              </label>

              <label>
                <span>Postal Code *</span>
                <input type="text" value={addressForm.postal_code} onChange={(e) => setAddressForm({ ...addressForm, postal_code: e.target.value })} placeholder="Postal code" required />
              </label>

              <label>
                <span>Country</span>
                <input type="text" value={addressForm.country} onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })} placeholder="Country" />
              </label>

              <label className={styles.checkboxLabel}>
                <input type="checkbox" checked={addressForm.is_default} onChange={(e) => setAddressForm({ ...addressForm, is_default: e.target.checked })} />
                <span>Set as default address</span>
              </label>
            </div>

            <div className={styles.formActions}>
              <button type="button" className={styles.cancelButton} onClick={() => setShowAddressForm(false)} disabled={saving}>
                Cancel
              </button>
              <button type="submit" className={styles.primaryButton} disabled={saving}>
                {saving ? 'Saving...' : editingAddress ? 'Update Address' : 'Add Address'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.addressHeaderBar}>
        <h2>Your Addresses</h2>
        <button className={styles.addButton} onClick={() => { setEditingAddress(null); resetAddressForm(); setShowAddressForm(true); }}>
          + Add New Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className={styles.emptyAddresses}>
          <p>No addresses saved yet. Add your first address to get started.</p>
          <button className={styles.addButton} onClick={() => { setEditingAddress(null); resetAddressForm(); setShowAddressForm(true); }}>
            Add Your First Address
          </button>
        </div>
      ) : (
        <div className={styles.addressGrid}>
          {addresses.map((address) => (
            <div key={address.id} className={styles.addressCard}>
              <div className={styles.cardHeader}>
                <div className={styles.addressType}>
                  <span className={styles.addressTypeBadge}>{address.address_type}</span>
                  {address.is_default && <span className={styles.defaultBadge}>Default</span>}
                </div>
              </div>

              <div className={styles.addressContent}>
                <h4 className={styles.addressName}>{address.full_name}</h4>
                {address.email && <p className={styles.addressEmail}>{address.email}</p>}
                {address.phone_number && <p className={styles.addressPhone}>{address.phone_number}</p>}
                <p className={styles.addressLine}>{address.address_line_1}</p>
                {address.address_line_2 && <p className={styles.addressLine}>{address.address_line_2}</p>}
                <p className={styles.addressCity}>
                  {address.city}, {address.state} {address.postal_code}
                </p>
                <p className={styles.addressCountry}>{address.country}</p>
              </div>

              <div className={styles.addressActions}>
                {!address.is_default && (
                  <button className={styles.defaultActionButton} onClick={() => handleSetDefault(address.id)} disabled={saving} title="Set as default">
                    <StarIcon fontSize="small" />
                    Default
                  </button>
                )}
                <button className={styles.editButton} onClick={() => handleEditAddress(address)} disabled={saving}>
                  <EditIcon fontSize="small" />
                  Edit
                </button>
                <button className={styles.deleteButton} onClick={() => handleDeleteAddress(address.id)} disabled={saving}>
                  <DeleteIcon fontSize="small" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
