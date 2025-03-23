"use client"

import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { format } from "date-fns"
import { useUser } from "../user-context"

interface AppointmentConfirmationProps {
  doctor: any
  date: Date
  time: string
  onConfirm: () => void
  onBack: () => void
  isMobile: boolean
}

export default function AppointmentConfirmation({
  doctor,
  date,
  time,
  onConfirm,
  onBack,
  isMobile,
}: AppointmentConfirmationProps) {
  const { user } = useUser()

  return (
    <div className={isMobile ? "" : "max-w-4xl mx-auto"}>
      {isMobile ? (
        <Card className="bg-white shadow-sm border border-gray-100 overflow-hidden">
          <CardContent className="p-5">
            <button onClick={onBack} className="flex items-center text-gray-500 hover:text-gray-700 mb-4 text-sm">
              <ArrowLeft className="h-3 w-3 mr-1" />
              Back to date selection
            </button>

            <div className="bg-teal-100/50 rounded-lg p-3 mb-6">
              <h2 className="text-sm font-medium text-teal-600 text-center">My Appointments</h2>
            </div>

            <div className="flex items-center gap-3 mb-4">
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
                <h3 className="font-medium">{doctor.name}</h3>
                <p className="text-xs text-gray-500">
                  {doctor.department} | {doctor.qualification}
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Date</span>
                </div>
                <span className="text-sm font-medium">{format(date, "MMMM d, yyyy")}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Time</span>
                </div>
                <span className="text-sm font-medium">{time}</span>
              </div>
            </div>

            <Button onClick={onConfirm} className="w-full bg-teal-500 hover:bg-teal-600">
              Confirm Appointment
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-teal-600 mb-2">My Appointments</h1>
            <p className="text-gray-600">Confirm your appointment details</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <button onClick={onBack} className="flex items-center text-gray-500 hover:text-gray-700 mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to date selection
            </button>

            <h2 className="text-lg font-semibold mb-4">Confirm Appointment Details</h2>

            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="md:w-1/3">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    <h3 className="font-medium text-lg">{doctor.name}</h3>
                    <p className="text-sm text-gray-500">{doctor.department}</p>
                    <p className="text-sm text-gray-500">{doctor.qualification}</p>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-medium">Appointment Date</span>
                  </div>
                  <p className="font-medium">{format(date, "MMMM d, yyyy")}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">Appointment Time</span>
                  </div>
                  <p className="font-medium">{time}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6 mt-6 flex justify-end">
              <Button onClick={onConfirm} className="bg-teal-500 hover:bg-teal-600">
                Confirm Appointment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

