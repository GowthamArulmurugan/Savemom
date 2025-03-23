"use client"

import { Card, CardContent, CardFooter } from "../ui/card"
import { Button } from "../ui/button"
import { ArrowLeft, Clock, Calendar } from "lucide-react"

type Doctor = {
  id: string
  name: string
  department: string
  image: string
  availableSlot: string
  waitingTime: number
}

interface AppointmentConfirmationProps {
  doctor: Doctor
  onConfirm: () => void
  onBack: () => void
}

export default function AppointmentConfirmation({ doctor, onConfirm, onBack }: AppointmentConfirmationProps) {
  // Generate a random token number
  const tokenNumber = 20

  return (
    <div>
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-gray-700 mb-4">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to doctor selection
      </button>

      <h2 className="text-xl font-semibold mb-4">Confirm Your Appointment</h2>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold">{doctor.name}</h3>
              <p className="text-gray-500">{doctor.department}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Date</span>
                  </div>
                  <p className="font-medium">Today</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">Time</span>
                  </div>
                  <p className="font-medium">{doctor.availableSlot}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <span className="text-sm">#</span>
                    <span className="text-sm">Token Number</span>
                  </div>
                  <p className="font-medium">{tokenNumber}</p>
                </div>
              </div>

              <div className="mt-6 p-3 bg-amber-50 rounded-lg border border-amber-100">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-500" />
                  <p className="text-sm text-amber-700">
                    Estimated waiting time: <span className="font-medium">{doctor.waitingTime} minutes</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-3 p-4">
          <Button variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Confirm Appointment</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

