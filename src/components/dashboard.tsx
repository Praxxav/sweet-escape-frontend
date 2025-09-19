/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-imports */

import { AppSidebar } from './app-sidebar'
import { SiteHeader } from './site-header'
import { SidebarProvider } from './ui/sidebar'
import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { LoadingSpinner } from '../lib/loading';

interface Sweet {
  id: number | string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  category: string;
  image?: string;
}

export const Dashboard = () => {
  const [sweets, setSweets] = useState<Sweet[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [purchaseQuantities, setPurchaseQuantities] = useState<Record<string | number, number>>({});
  const [purchasingSweetId, setPurchasingSweetId] = useState<number | string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('')

  // ✅ Fetch sweets from backend
  useEffect(() => {
    const fetchSweets = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          window.location.href = "/login"
          return
        }

        const response = await axios.get(`${BACKEND_URL}/api/sweets`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setSweets(response.data)
      } catch (error) {
        console.error("Failed to fetch sweets", error)
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          alert("Session expired. Please login again.")
          localStorage.removeItem("token")
          window.location.href = "/login"
        }
      }
    }
    fetchSweets()
  }, [])

  // const categories = useMemo(
  //   () => [...new Set(sweets.map(sweet => sweet.category))],
  //   [sweets]
  // )

  const filteredSweets = sweets.filter(sweet => {
    const matchesSearch =
      sweet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sweet.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === '' || sweet.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // ✅ Handle purchase with backend call
  const handlePurchase = async (sweetId: number | string, quantityToPurchase: number) => {
    setPurchasingSweetId(sweetId);
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        alert("You must login first!")
        return
      }
      if (!quantityToPurchase || quantityToPurchase < 1) {
        alert("Please enter a valid quantity.");
        return;
      }

      const sweet = sweets.find(s => s.id === sweetId);
      if (sweet && quantityToPurchase > sweet.quantity) {
        alert(`Only ${sweet.quantity} items are in stock.`);
        // Reset quantity for this item to max available
        setPurchaseQuantities(prev => ({
          ...prev,
          [sweetId]: sweet.quantity,
        }));
        return;
      }

      const response = await axios.post(
        `${BACKEND_URL}/api/sweets/${sweetId}/purchase`,
        { quantity: quantityToPurchase }, // ✅ Send the selected quantity
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      // ✅ Update quantity in frontend after purchase
      setSweets(prev =>
        prev.map(s =>
          s.id === sweetId ? { ...s, quantity: response.data.sweet.quantity } : s
        )
      )

      alert("Purchase successful! 🎉")
    } catch (error) {
      console.error("Purchase failed", error)
      alert("Failed to purchase sweet. Try again later.")
    } finally {
      setPurchasingSweetId(null);
    }
  }
  
  const handleQuantityChange = (sweetId: string | number, value: string) => {
    const quantity = parseInt(value, 10);
    const sweet = sweets.find(s => s.id === sweetId);

    if (!sweet) return;

    // Prevent quantity from exceeding stock or being less than 1
    const validQuantity = Math.max(1, Math.min(quantity, sweet.quantity));

    setPurchaseQuantities(prev => ({
      ...prev,
      [sweetId]: isNaN(validQuantity) ? 1 : validQuantity,
    }));
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen bg-background font-sans antialiased overflow-hidden">
        {/* Sidebar */}
        <AppSidebar className="flex-shrink-0" />

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <SiteHeader />

          {/* Dashboard Content */}
          <main className="flex-1 overflow-auto w-full p-4 lg:p-6">
            <div className="w-full space-y-6">
              {/* Dashboard Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Sweet Escape Dashboard</h1>
                  <p className="text-muted-foreground mt-1">Browse our delicious inventory !</p>
                </div>
              </div>

              {/* Sweets Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredSweets.map(sweet => (
                  <div
                    key={sweet.id}
                    className="bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="p-6">
                      <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-1">{sweet.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
                        {sweet.description}
                      </p>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xl font-bold text-green-600">${sweet.price.toFixed(2)}</span>
                        <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                          {sweet.category}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span
                          className={`text-sm font-medium ${
                            sweet.quantity > 0
                              ? sweet.quantity <= 5
                                ? 'text-orange-600'
                                : 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {sweet.quantity > 0 ? `${sweet.quantity} in stock` : 'Out of stock'}
                        </span>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="1"
                            max={sweet.quantity}
                            value={purchaseQuantities[sweet.id] || 1}
                            onChange={(e) => handleQuantityChange(sweet.id, e.target.value)}
                            className="w-16 h-9 text-center"
                            disabled={sweet.quantity === 0}
                          />
                          <button
                            onClick={() => handlePurchase(sweet.id, purchaseQuantities[sweet.id] || 1)}
                            disabled={sweet.quantity === 0 || purchasingSweetId === sweet.id}
                            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all w-[88px] h-9 ${
                              sweet.quantity > 0
                                ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow'
                                : 'bg-muted text-muted-foreground cursor-not-allowed'
                            }`}
                          >
                            {purchasingSweetId === sweet.id ? <LoadingSpinner /> : (
                              <><ShoppingCart size={16} /> Buy</>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results */}
              {filteredSweets.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-8xl mb-4">🔍</div>
                  <h3 className="text-xl font-medium text-foreground mb-2">No sweets found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm || selectedCategory
                      ? 'Try adjusting your search or filter criteria'
                      : 'No sweets available in the inventory'}
                  </p>
                  {(searchTerm || selectedCategory) && (
                    <button
                      onClick={() => {
                        setSearchTerm('')
                        setSelectedCategory('')
                      }}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
