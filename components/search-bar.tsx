"use client"

import type React from "react"
import { useState } from "react"
import { Mic } from "lucide-react"

export default function SearchBar() {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      console.log("Message sent:", message)
      setMessage("")
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-3 px-4 z-10">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type here..."
          className="flex-1 py-2 px-4 border rounded-full focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
        <button type="button" className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
          <Mic className="h-5 w-5" />
        </button>
      </form>
    </div>
  )
}

