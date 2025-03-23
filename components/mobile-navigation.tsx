"use client"

import type React from "react"

import { Home, Stethoscope, CalendarDays, FileText, Menu, X } from "lucide-react"
import { Button } from "./ui/button"

interface MobileNavigationProps {
  activeSection: string
  onNavigate: (section: string) => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function MobileNavigation({ activeSection, onNavigate, isOpen, setIsOpen }: MobileNavigationProps) {
  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button onClick={() => setIsOpen(!isOpen)} className="w-12 h-12 rounded-full shadow-lg">
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)}>
          <div
            className="absolute bottom-20 right-4 bg-white rounded-lg shadow-xl p-2 w-56"
            onClick={(e) => e.stopPropagation()}
          >
            <NavItem
              icon={<Home className="h-5 w-5" />}
              label="Home"
              isActive={activeSection === "welcome"}
              onClick={() => {
                onNavigate("welcome")
                setIsOpen(false)
              }}
            />
            <NavItem
              icon={<Stethoscope className="h-5 w-5" />}
              label="Check-Up"
              isActive={activeSection === "checkup"}
              onClick={() => {
                onNavigate("checkup")
                setIsOpen(false)
              }}
            />
            <NavItem
              icon={<CalendarDays className="h-5 w-5" />}
              label="Appointments"
              isActive={activeSection === "appointments"}
              onClick={() => {
                onNavigate("appointments")
                setIsOpen(false)
              }}
            />
            <NavItem
              icon={<FileText className="h-5 w-5" />}
              label="Reports"
              isActive={activeSection === "reports"}
              onClick={() => {
                onNavigate("reports")
                setIsOpen(false)
              }}
            />
          </div>
        </div>
      )}

      {/* Bottom Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-2 px-4 flex justify-around items-center">
        <TabButton
          icon={<Home className="h-5 w-5" />}
          label="Home"
          isActive={activeSection === "welcome"}
          onClick={() => onNavigate("welcome")}
        />
        <TabButton
          icon={<Stethoscope className="h-5 w-5" />}
          label="Check-Up"
          isActive={activeSection === "checkup"}
          onClick={() => onNavigate("checkup")}
        />
        <TabButton
          icon={<CalendarDays className="h-5 w-5" />}
          label="Appointments"
          isActive={activeSection === "appointments"}
          onClick={() => onNavigate("appointments")}
        />
        <TabButton
          icon={<FileText className="h-5 w-5" />}
          label="Reports"
          isActive={activeSection === "reports"}
          onClick={() => onNavigate("reports")}
        />
      </div>
    </>
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
    <button
      className={`flex items-center gap-3 w-full p-2 rounded-lg text-left ${
        isActive ? "bg-teal-50 text-teal-600" : "hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      <span className={isActive ? "text-teal-500" : "text-gray-500"}>{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  )
}

interface TabButtonProps {
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick: () => void
}

function TabButton({ icon, label, isActive, onClick }: TabButtonProps) {
  return (
    <button
      className={`flex flex-col items-center gap-1 ${isActive ? "text-teal-600" : "text-gray-500"}`}
      onClick={onClick}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  )
}

