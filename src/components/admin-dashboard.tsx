import { useState, useEffect, type FormEvent } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { AppSidebar } from './app-sidebar';
import { SiteHeader } from './site-header';
import { SidebarProvider } from './ui/sidebar';
import { BACKEND_URL } from '../config';

interface Sweet {
  id: number | string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  category: string;
  image?: string;
}

interface Purchase {
  id: number;
  quantity: number;
  purchasedAt: string;
  user: {
    name: string | null;
    email: string;
  };
  sweet: {
    name: string;
  };
}

export function AdminDashboard() {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    image: ''
  });

  // Axios instance with token
  const token = localStorage.getItem('token');
  const api = axios.create({
    baseURL: BACKEND_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },

  });

  const fetchSweets = async () => {
    try {
      const response = await api.get('/api/sweets');
      const sweetsWithDefaults = response.data.map((sweet: Sweet) => ({
        ...sweet,
        description: sweet.description || '-',
        image: sweet.image || '🍬'
      }));
      setSweets(sweetsWithDefaults);
    } catch (error) {
      console.error('Error fetching sweets:', error);
      alert('Failed to fetch sweets. Make sure you are logged in as admin.');
    }
  };

  const fetchPurchases = async () => {
    try {
      const response = await api.get('/api/purchases');
      setPurchases(response.data);
    } catch (error) {
      console.error('Error fetching purchases:', error);
    }
  };

  useEffect(() => {
    fetchSweets();
    fetchPurchases();
  }, []);

  const resetForm = () => {
    setFormData({ name: '', description: '', price: '', quantity: '', category: '', image: '' });
    setEditingSweet(null);
    setShowForm(false);
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!formData.name || !formData.price || !formData.quantity || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }

    const sweetData = {
      name: formData.name,
      description: formData.description || '-',
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      category: formData.category,
      image: formData.image || '🍬'
    };

    try {
      if (editingSweet) {
        await api.put(`/api/sweets/${editingSweet.id}`, sweetData);
        alert('Sweet updated successfully!');
      } else {
        await api.post('/api/sweets', sweetData);
        alert('Sweet added successfully!');
      }
      resetForm();
      fetchSweets(); // Refresh sweets list
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(`Failed to ${editingSweet ? 'update' : 'add'} sweet.`);
    }
  };

  const startEdit = (sweet: Sweet) => {
    setEditingSweet(sweet);
    setFormData({
      name: sweet.name,
      description: sweet.description || '',
      price: sweet.price.toString(),
      quantity: sweet.quantity.toString(),
      category: sweet.category,
      image: sweet.image || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (sweetId: number | string) => {
    if (window.confirm('Are you sure you want to delete this sweet? 🗑️')) {
      try {
        await api.delete(`/api/sweets/${sweetId}`);
        alert('Sweet deleted successfully!');
        fetchSweets(); // Refresh sweets list
      } catch (error) {
        console.error('Error deleting sweet:', error);
        alert('Failed to delete sweet.');
      }
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen bg-background font-sans antialiased overflow-hidden">
        <AppSidebar className="flex-shrink-0" />
        <div className="flex flex-col flex-1 overflow-hidden">
          <SiteHeader />
          <main className="flex-1 overflow-auto w-full p-4 lg:p-6">
            <div className="w-full space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-foreground">Admin - Manage Sweets</h1>
                <button
                  onClick={() => { setEditingSweet(null); setFormData({ name: '', description: '', price: '', quantity: '', category: '', image: '' }); setShowForm(true); }}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium"
                >
                  <Plus size={16} />
                  Add Sweet
                </button>
              </div>

              {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-card rounded-lg border shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                    <form onSubmit={handleFormSubmit} className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-foreground">{editingSweet ? 'Edit Sweet ✏️' : 'Add New Sweet ➕'}</h2>
                        <button type="button" onClick={resetForm} className="text-muted-foreground hover:text-foreground p-1 hover:bg-muted rounded transition-colors">
                          <X size={20} />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Name *</label>
                          <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 bg-background border border-input rounded-lg" placeholder="Sweet name" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                          <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 bg-background border border-input rounded-lg resize-none" rows={3} placeholder="Describe your sweet..." />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Price ($) *</label>
                            <input type="number" step="0.01" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full px-3 py-2 bg-background border border-input rounded-lg" placeholder="0.00" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Quantity *</label>
                            <input type="number" required min="0" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} className="w-full px-3 py-2 bg-background border border-input rounded-lg" placeholder="0" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Category *</label>
                          <input type="text" required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 bg-background border border-input rounded-lg" placeholder="e.g., Chocolate, Gummies" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Emoji/Icon</label>
                          <input type="text" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="🍬" className="w-full px-3 py-2 bg-background border border-input rounded-lg" />
                        </div>
                        <div className="flex gap-3 pt-4">
                          <button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-2 px-4 rounded-lg font-medium">
                            {editingSweet ? 'Update Sweet' : 'Add Sweet'}
                          </button>
                          <button type="button" onClick={resetForm} className="flex-1 bg-muted hover:bg-muted/80 text-muted-foreground py-2 px-4 rounded-lg font-medium">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              <div className="bg-card rounded-lg border overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="p-4 font-medium">Name</th>
                      <th className="p-4 font-medium">Category</th>
                      <th className="p-4 font-medium">Price</th>
                      <th className="p-4 font-medium">Quantity</th>
                      <th className="p-4 font-medium">Description</th>
                      <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sweets.map(sweet => (
                      <tr key={sweet.id} className="border-b">
                        <td className="p-4 font-medium">{sweet.name}</td>
                        <td className="p-4 text-muted-foreground">{sweet.category}</td>
                        <td className="p-4">${sweet.price.toFixed(2)}</td>
                        <td className="p-4">{sweet.quantity}</td>
                        <td className="p-4">{sweet.description || '-'}</td>
                        <td className="p-4 text-right">
                          <button onClick={() => startEdit(sweet)} className="p-2 text-muted-foreground hover:text-blue-600"><Edit size={16} /></button>
                          <button onClick={() => handleDelete(sweet.id)} className="p-2 text-muted-foreground hover:text-red-600"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Purchase History Table */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Recent Purchases</h2>
                <div className="bg-card rounded-lg border overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="p-4 font-medium">User</th>
                        <th className="p-4 font-medium">Sweet</th>
                        <th className="p-4 font-medium">Quantity</th>
                        <th className="p-4 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchases.map(purchase => (
                        <tr key={purchase.id} className="border-b">
                          <td className="p-4 font-medium">{purchase.user.name || purchase.user.email}</td>
                          <td className="p-4 text-muted-foreground">{purchase.sweet.name}</td>
                          <td className="p-4">{purchase.quantity}</td>
                          <td className="p-4 text-muted-foreground">{new Date(purchase.purchasedAt).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
