"use client"

import type React from "react"

import { useState } from "react"
import { Mic } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const isMobile = useIsMobile()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      console.log("Search query:", query)
      setQuery("")
    }
  }

  return (
    <div className={`${isMobile ? "fixed" : "sticky"} bottom-0 left-0 right-0 bg-white border-t py-3 px-4 z-10`}>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type here..."
            className="w-full py-2 px-4 pr-12 bg-gray-100 border-none rounded-full focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
          <button
            type="button"
            className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-[#4DD0C9] text-white rounded-full"
          >
            <Mic className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  )
}

