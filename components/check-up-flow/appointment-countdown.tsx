"use client"

import { useState, useEffect } from "react"
import { Button } from "../ui/button"

interface AppointmentCountdownProps {
  doctor: any
  onDone: () => void
}

export default function AppointmentCountdown({ doctor, onDone }: AppointmentCountdownProps) {
  const [remainingTime, setRemainingTime] = useState(5 * 60) // 5 minutes in seconds
  const [isComplete, setIsComplete] = useState(false)

  // Generate a random token number
  const tokenNumber = 8

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
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-medium text-blue-500">Hello Priyanka</h1>
      </div>

      <div className="bg-[#4DD0C9]/20 p-4 rounded-xl mb-6">
        <h2 className="text-base font-medium text-[#4DD0C9]">Check-Up</h2>
        <p className="text-xs text-[#4DD0C9] mt-1">Get a check-up with doctors available right now.</p>
      </div>

      <p className="text-sm text-gray-600 mb-4">Appointment Details:</p>

      <div className="bg-[#4DD0C9] rounded-xl p-4 mb-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-white/80">Doctor:</p>
            <p className="text-white font-medium">Dr. Raj Swami</p>
          </div>
          <div>
            <p className="text-xs text-white/80">Time:</p>
            <p className="text-white font-medium">1:30pm</p>
          </div>
          <div>
            <p className="text-xs text-white/80">Token No:</p>
            <p className="text-white font-medium">{tokenNumber}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">Waiting time:</p>
        <p className="text-4xl font-medium text-[#4DD0C9] text-center">{formatTime(remainingTime)} Mins</p>
      </div>

      <p className="text-center text-gray-500 mb-6">
        {isComplete
          ? "It's your turn now! Please proceed to the doctor's room."
          : "It's almost your turn! Please be ready."}
      </p>

      <div className="flex gap-4">
        <Button className="flex-1 bg-[#4DD0C9]/20 text-[#4DD0C9] hover:bg-[#4DD0C9]/30" onClick={onDone}>
          Back to main options
        </Button>

        <Button className="flex-1 bg-[#4DD0C9] hover:bg-teal-600" onClick={onDone}>
          {isComplete ? "Complete" : "Confirm Doctor"}
        </Button>
      </div>
    </div>
  )
}

