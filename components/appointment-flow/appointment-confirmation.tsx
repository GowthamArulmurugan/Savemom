"use client"

import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { useUser } from "../user-context"

interface AppointmentSuccessProps {
  onDone: () => void
  isMobile: boolean
}

export default function AppointmentSuccess({ onDone, isMobile }: AppointmentSuccessProps) {
  const { user } = useUser()

  return (
    <div className={isMobile ? "" : "max-w-4xl mx-auto"}>
      <Card className="bg-[#f0f9f8] shadow-sm border border-gray-100 overflow-hidden">
        <CardContent className="p-5">
          <div className="bg-[#8de0d3] rounded-lg p-3 mb-6">
            <h2 className="text-sm font-medium text-white text-center">My Appointments</h2>
          </div>

          <div className="text-center py-4">
            <div className="w-full mb-4">
              <img src="/images/pregnant-woman-clean.png" alt="Pregnant Woman" className="w-40 h-auto mx-auto" />
            </div>

            <h2 className="text-xl font-semibold mb-2 text-[#4DD0C9]">Appointment Confirmed!</h2>

            <Button onClick={onDone} className="bg-[#4DD0C9] hover:bg-teal-600 mt-4">
              Return to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

