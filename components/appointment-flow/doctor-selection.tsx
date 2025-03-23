"use client"

import { Card, CardContent } from "../ui/card"
import { useUser } from "../user-context"
import { ArrowLeft } from "lucide-react"

interface DoctorSelectionProps {
  doctors: any[]
  onSelect: (doctor: any) => void
  isMobile: boolean
  onNavigate?: (section: string) => void
}

export default function DoctorSelection({ doctors, onSelect, isMobile, onNavigate }: DoctorSelectionProps) {
  const { user } = useUser()

  const handleBack = () => {
    if (onNavigate) {
      onNavigate("welcome")
    }
  }

  return (
    <div className={isMobile ? "" : "max-w-4xl mx-auto"}>
      {isMobile ? (
        <Card className="bg-white shadow-sm border border-gray-100 overflow-hidden">
          <CardContent className="p-5">
            {/* Back button for mobile */}
            <button onClick={handleBack} className="flex items-center text-gray-500 hover:text-gray-700 mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to home
            </button>

            <div className="mb-6">
              <h1 className="text-xl font-medium text-blue-500 mb-1">Hello {user.name}</h1>
            </div>

            <div className="bg-teal-100/50 rounded-lg p-3 mb-6">
              <h2 className="text-sm font-medium text-teal-600 text-center">My Appointments</h2>
              <p className="text-xs text-center text-teal-500 mt-1">
                Set an appointment with your preferred doctor, date, and time.
              </p>
            </div>

            <p className="text-sm text-gray-500 mb-4">Please select one from available doctors:</p>

            <div className="space-y-3">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} onSelect={onSelect} />
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-teal-600 mb-2">My Appointments</h1>
            <p className="text-gray-600">Set an appointment with your preferred doctor, date, and time.</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Select a Doctor</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} onSelect={onSelect} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
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
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
              stroke="#9CA3AF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
              stroke="#9CA3AF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

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
    </div>
  )
}

