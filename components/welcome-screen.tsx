"use client"

import type React from "react"
import { useUser } from "./user-context"
import { CalendarDays, Stethoscope, FileText } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

interface WelcomeScreenProps {
  onNavigate: (section: string) => void
}

export default function WelcomeScreen({ onNavigate }: WelcomeScreenProps) {
  const { user } = useUser()
  const isMobile = useIsMobile()

  return (
    <div className="w-full">
      <div className={`mb-${isMobile ? "4" : "8"}`}>
        <h1 className={`${isMobile ? "text-xl" : "text-3xl"} font-bold text-teal-600 mb-2`}>Hello {user.name},</h1>
        <p className={`${isMobile ? "text-sm" : "text-lg"} text-gray-600`}>Welcome to Savemom Hospital</p>
        <p className={`text-${isMobile ? "xs" : "sm"} text-gray-500 mt-1`}>How can we assist you today?</p>
  
      </div>

      <div className={`grid grid-cols-${isMobile ? "2" : "3"} gap-${isMobile ? "3" : "6"}`}>
        <ServiceCard
          title="Check-Up"
          description="Find available doctors and schedule a check-up"
          icon={<Stethoscope className={`h-${isMobile ? "5" : "8"} w-${isMobile ? "5" : "8"}`} />}
          onClick={() => onNavigate("checkup")}
          color="bg-teal-500"
        />

        <ServiceCard
          title="Appointments"
          description="Manage your upcoming and past appointments"
          icon={<CalendarDays className={`h-${isMobile ? "5" : "8"} w-${isMobile ? "5" : "8"}`} />}
          onClick={() => onNavigate("appointments")}
          color="bg-teal-500"
        />

        <ServiceCard
          title="Reports"
          description="Access and manage your medical reports"
          icon={<FileText className={`h-${isMobile ? "5" : "8"} w-${isMobile ? "5" : "8"}`} />}
          onClick={() => onNavigate("reports")}
          color="bg-teal-500"
          className={isMobile ? "col-span-2" : ""}
        />
      </div>

      
    </div>
  )
}

interface ServiceCardProps {
  title: string
  description?: string
  icon?: React.ReactNode
  onClick: () => void
  color: string
  className?: string
}

function ServiceCard({ title, description, icon, onClick, color, className = "" }: ServiceCardProps) {
  const isMobile = useIsMobile()

  return (
    <button
      className={`${color} text-white p-4 rounded-lg text-left transition-transform hover:scale-[1.02] ${className}`}
      onClick={onClick}
    >
      {icon && <div className="mb-2">{icon}</div>}
      <h3 className={`${isMobile ? "text-sm" : "text-base"} font-medium`}>{title}</h3>
      {description && <p className={`${isMobile ? "text-xs" : "text-sm"} mt-1 text-white/80`}>{description}</p>}
    </button>
  )
}

