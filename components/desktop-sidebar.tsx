"use client"

import type React from "react"

import { useUser } from "./user-context"
import { Home, Stethoscope, CalendarDays, FileText, Settings, LogOut } from "lucide-react"

interface DesktopSidebarProps {
  activeSection: string
  onNavigate: (section: string) => void
}

export default function DesktopSidebar({ activeSection, onNavigate }: DesktopSidebarProps) {
  const { user } = useUser()

  return (
    <div className="w-64 h-screen bg-white border-r flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-teal-600">Savemom Hospital</h1>
      </div>

      <div className="px-4 py-6 border-t border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={user.profileImage || "/placeholder.svg?height=100&width=100"}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-medium">{user.name}</h2>
            <p className="text-xs text-gray-500">Patient ID: {user.id}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          <NavItem
            icon={<Home className="h-5 w-5" />}
            label="Home"
            isActive={activeSection === "welcome"}
            onClick={() => onNavigate("welcome")}
          />
          <NavItem
            icon={<Stethoscope className="h-5 w-5" />}
            label="Check-Up"
            isActive={activeSection === "checkup"}
            onClick={() => onNavigate("checkup")}
          />
          <NavItem
            icon={<CalendarDays className="h-5 w-5" />}
            label="Appointments"
            isActive={activeSection === "appointments"}
            onClick={() => onNavigate("appointments")}
          />
          <NavItem
            icon={<FileText className="h-5 w-5" />}
            label="Reports"
            isActive={activeSection === "reports"}
            onClick={() => onNavigate("reports")}
          />
        </ul>
      </nav>

      <div className="p-4 border-t">
        <ul className="space-y-1">
          <NavItem icon={<Settings className="h-5 w-5" />} label="Settings" isActive={false} onClick={() => {}} />
          <NavItem icon={<LogOut className="h-5 w-5" />} label="Logout" isActive={false} onClick={() => {}} />
        </ul>
      </div>
    </div>
  )
}

interface NavItemProps {
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick: () => void
}

function NavItem({ icon, label, isActive, onClick }: NavItemProps) {
  return (
    <li>
      <button
        className={`flex items-center gap-3 w-full p-2 rounded-lg text-left ${
          isActive ? "bg-teal-50 text-teal-600" : "hover:bg-gray-100"
        }`}
        onClick={onClick}
      >
        <span className={isActive ? "text-teal-500" : "text-gray-500"}>{icon}</span>
        <span className="font-medium">{label}</span>
      </button>
    </li>
  )
}

