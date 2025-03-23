"use client"

import { useUser } from "./user-context"
import { User } from "lucide-react"
import { Button } from "./ui/button"

interface HeaderProps {
  isMobile?: boolean
  onNavigate?: (section: string) => void
}

export default function Header({ isMobile = false, onNavigate }: HeaderProps) {
  const { user } = useUser()

  const handleLogoClick = () => {
    if (onNavigate) {
      onNavigate("welcome")
    }
  }

  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
          <div className="w-10 h-10 mr-3">
            <img
              src='/images/download.jpg'
              alt="Savemom Logo"
              className="w-full h-full object-contain rounded-md"
            />
          </div>
          <div>
            <h1 className={`${isMobile ? "text-sm" : "text-lg"} font-bold text-gray-800`}>
              Savemom Hospital Assistant
            </h1>
            <p className="text-xs text-gray-500">BBMP Hospital - Madurai Branch</p>
          </div>
        </div>

        <div className="flex items-center">
          <Button variant="ghost" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
              <User className="h-4 w-4 text-teal-600" />
            </div>
            <span className="text-sm font-medium hidden sm:inline">{user.name}</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

