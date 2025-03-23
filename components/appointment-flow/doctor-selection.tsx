"use client"

import { useUser } from "../user-context"
import SectionLayout from "../layout/section-layout"
import SectionHeader from "../layout/section-header"

interface DoctorSelectionProps {
  doctors: any[]
  onSelect: (doctor: any) => void
  onBack: () => void
}

export default function DoctorSelection({ doctors, onSelect, onBack }: DoctorSelectionProps) {
  const { user } = useUser()

  return (
    <SectionLayout
      title="My Appointments"
      subtitle="Set an appointment with your preferred doctor, date, and time."
      onBack={onBack}
      backText="Back to home"
      headerContent={
        <>
          <div className="mb-6">
            <h1 className="text-xl font-medium text-[#4DD0C9]-500 mb-1">Hello {user.name}</h1>
          </div>
          <SectionHeader
            title="My Appointments"
            subtitle="Set an appointment with your preferred doctor, date, and time."
          />
        </>
      }
    >
      <p className="text-sm text-gray-500 mb-4">Please select one from available doctors:</p>

      <div className="space-y-3">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} onSelect={onSelect} />
        ))}
      </div>
    </SectionLayout>
  )
}

interface DoctorCardProps {
  doctor: any
  onSelect: (doctor: any) => void
}

function DoctorCard({ doctor, onSelect }: DoctorCardProps) {
  return (
    <div
      className="border border-gray-200 rounded-lg p-3 hover:border-teal-300 transition-colors cursor-pointer"
      onClick={() => onSelect(doctor)}
    >
      <div>
        <h3 className="font-medium text-gray-700">{doctor.name}</h3>
        <p className="text-xs text-gray-500">{doctor.department}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-500">{doctor.qualification}</span>
          <span className="text-xs text-gray-400">|</span>
          <span className="text-xs text-gray-500">{doctor.experience}</span>
        </div>
      </div>
    </div>
  )
}

