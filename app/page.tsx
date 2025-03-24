"use client"

import { useState } from "react"
import WelcomeScreen from "@/components/welcome-screen"
import CheckUpFlow from "@/components/check-up-flow"
import AppointmentFlow from "@/components/appointment-flow"
import ReportsFlow from "@/components/reports-flow"
import { UserProvider } from "@/components/user-context"
import Header from "@/components/header"
import SearchBar from "@/components/search-bar"
import { useIsMobile } from "@/hooks/use-mobile"

export default function HospitalAssistant() {
  const [activeSection, setActiveSection] = useState("welcome")
  const isMobile = useIsMobile()

  const renderContent = () => {
    switch (activeSection) {
      case "welcome":
        return <WelcomeScreen onNavigate={setActiveSection} />
      case "checkup":
        return <CheckUpFlow onNavigate={setActiveSection} />
      case "appointments":
        return <AppointmentFlow onNavigate={setActiveSection} />
      case "reports":
        return <ReportsFlow onNavigate={setActiveSection} />
      default:
        return <WelcomeScreen onNavigate={setActiveSection} />
    }
  }

  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header isMobile={isMobile} onNavigate={setActiveSection} />

        <div className="flex flex-1">
          <div className="flex-1 flex flex-col">
            <main className="flex-1 p-4 md:p-6 lg:p-8 pb-24">
              <div className="max-w-4xl mx-auto w-full">{renderContent()}</div>
            </main>
          </div>
        </div>

        <SearchBar />
      </div>
    </UserProvider>
  )
}

