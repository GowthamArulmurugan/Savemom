"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Button } from "../ui/button"
import { Clock, CheckCircle } from "lucide-react"

type Doctor = {
  id: string
  name: string
  department: string
  image: string
  availableSlot: string
  waitingTime: number
}

interface AppointmentCountdownProps {
  doctor: Doctor
  onDone: () => void
}

export default function AppointmentCountdown({ doctor, onDone }: AppointmentCountdownProps) {
  const [remainingTime, setRemainingTime] = useState(doctor.waitingTime * 60) // Convert to seconds
  const [isComplete, setIsComplete] = useState(false)

  // Generate a random token number
  const tokenNumber = 20

  useEffect(() => {
    if (remainingTime <= 0) {
      setIsComplete(true)
      return
    }

    const timer = setInterval(() => {
      setRemainingTime((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [remainingTime])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{isComplete ? "Appointment Ready" : "Appointment Confirmed"}</h2>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center mb-6">
            {isComplete ? (
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Clock className="h-10 w-10 text-blue-500" />
              </div>
            )}

            <h3 className="text-lg font-semibold">
              {isComplete ? "Your doctor is ready to see you now" : "Your appointment is confirmed"}
            </h3>
            <p className="text-gray-500 mt-1">
              {isComplete ? "Please proceed to the doctor's office" : "Please wait until your token number is called"}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full overflow-hidden">
                
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="font-semibold">{doctor.name}</h3>
              <p className="text-gray-500">{doctor.department}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">{doctor.availableSlot}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Token Number</p>
                  <p className="font-medium">#{tokenNumber}</p>
                </div>
              </div>
            </div>
          </div>

          {!isComplete && (
            <div className="mt-8">
              <p className="text-center text-sm text-gray-500 mb-2">Estimated waiting time</p>
              <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden">
                <div
                  className="bg-teal-500 h-full transition-all duration-1000 ease-linear"
                  style={{
                    width: `${(remainingTime / (doctor.waitingTime * 60)) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="text-center mt-2 font-mono font-medium">{formatTime(remainingTime)}</p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-center p-4">
          <Button onClick={onDone}>{isComplete ? "Return to Home" : "Cancel Appointment"}</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

