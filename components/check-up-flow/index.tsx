"use client"

import { useState } from "react"
import DoctorSelection from "./doctor-selection"
import AppointmentConfirmation from "./appointment-confirmation"
import AppointmentCountdown from "./appointment-countdown"

interface CheckUpFlowProps {
  onNavigate: (section: string) => void
}

type Doctor = {
  id: string
  name: string
  department: string
  image: string
  availableSlot: string
  waitingTime: number
}

export default function CheckUpFlow({ onNavigate }: CheckUpFlowProps) {
  const [step, setStep] = useState(1)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)

  // Mock doctors data
  const doctors: Doctor[] = [
    {
      id: "doc1",
      name: "Dr. Sarah Johnson",
      department: "Cardiology",
      image: "/placeholder.svg?height=80&width=80",
      availableSlot: "10:30 AM",
      waitingTime: 25,
    },
    {
      id: "doc2",
      name: "Dr. Michael Chen",
      department: "General Medicine",
      image: "/placeholder.svg?height=80&width=80",
      availableSlot: "11:15 AM",
      waitingTime: 15,
    },
    {
      id: "doc3",
      name: "Dr. Emily Rodriguez",
      department: "Pediatrics",
      image: "/placeholder.svg?height=80&width=80",
      availableSlot: "12:00 PM",
      waitingTime: 30,
    },
  ]

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setStep(2)
  }

  const handleConfirm = () => {
    setStep(3)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <DoctorSelection doctors={doctors} onSelect={handleDoctorSelect} />
      case 2:
        return <AppointmentConfirmation doctor={selectedDoctor!} onConfirm={handleConfirm} onBack={() => setStep(1)} />
      case 3:
        return <AppointmentCountdown doctor={selectedDoctor!} onDone={() => onNavigate("welcome")} />
      default:
        return <DoctorSelection doctors={doctors} onSelect={handleDoctorSelect} />
    }
  }

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-teal-600 mb-2">Check-Up</h1>
        <p className="text-gray-600">Find available doctors and schedule a check-up</p>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between max-w-md">
          <StepIndicator step={1} currentStep={step} label="Select Doctor" />
          <div className="h-1 w-16 bg-gray-200">
            <div className={`h-1 bg-teal-500 ${step >= 2 ? "w-full" : "w-0"} transition-all duration-300`}></div>
          </div>
          <StepIndicator step={2} currentStep={step} label="Confirm" />
          <div className="h-1 w-16 bg-gray-200">
            <div className={`h-1 bg-teal-500 ${step >= 3 ? "w-full" : "w-0"} transition-all duration-300`}></div>
          </div>
          <StepIndicator step={3} currentStep={step} label="Appointment" />
        </div>
      </div>

      {renderStep()}
    </div>
  )
}

interface StepIndicatorProps {
  step: number
  currentStep: number
  label: string
}

function StepIndicator({ step, currentStep, label }: StepIndicatorProps) {
  const isActive = currentStep >= step

  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 
          ${isActive ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-500"}`}
      >
        {step}
      </div>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  )
}

