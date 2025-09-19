"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, User, Search, Filter } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedCategory, setSelectedCategory] = useState("")
  const categories = ["Cakes", "Chocolates", "Cookies", "Indian Sweets"]

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white shadow-sm transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        {/* Sidebar trigger */}
        <SidebarTrigger className="-ml-1" />

        {/* Separator */}
        <div className="mx-2 h-4 w-px bg-gray-300" />

        {/* Page Title */}
        <h1 className="text-lg font-semibold text-gray-900">Sweet Escape</h1>

        {/* Search + Filter */}
        <div className="ml-6 hidden sm:flex flex-1 max-w-lg gap-3">
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search sweets..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Category filter */}
          <div className="relative w-48">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Current Time and Date */}
        <div className="ml-4 hidden md:flex flex-col items-end text-sm">
          <div className="font-medium text-gray-900">{formatTime(currentTime)}</div>
          <div className="text-xs text-gray-500">{formatDate(currentTime)}</div>
        </div>

        {/* Right side actions */}
        <div className="ml-auto flex items-center gap-2">
          {/* Cart button */}
          <button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
              3
            </span>
          </button>

          {/* Profile button */}
          <button className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </button>
        </div>
      </div>
    </header>
  )
}
