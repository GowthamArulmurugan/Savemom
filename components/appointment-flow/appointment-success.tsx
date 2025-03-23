"use client"

import { Button } from "../ui/button"
import SectionLayout from "../layout/section-layout"
import SectionHeader from "../layout/section-header"

interface AppointmentSuccessProps {
  onDone: () => void
}

export default function AppointmentSuccess({ onDone }: AppointmentSuccessProps) {
  return (
    <SectionLayout title="My Appointments" headerContent={<SectionHeader title="My Appointments" />}>
      <div className="text-center py-4">
        <div className="w-full mb-4">
          <img src="/images/pregnant-woman-clean.png" alt="Pregnant Woman" className="w-40 h-auto mx-auto" />
        </div>

        <h2 className="text-xl font-semibold mb-2 text-[#4DD0C9]">Appointment Confirmed!</h2>

        <Button onClick={onDone} className="bg-[#4DD0C9] hover:bg-teal-600 mt-4">
          Return to Home
        </Button>
      </div>
    </SectionLayout>
  )
}

