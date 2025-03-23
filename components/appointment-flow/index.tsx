"use client"

import { useState } from "react"
import DoctorSelection from "./doctor-selection"
import DateTimeSelection from "./date-time-selection"
import AppointmentConfirmation from "./appointment-confirmation"
import AppointmentSuccess from "./appointment-success"
import { useUser } from "../user-context"
import { useIsMobile } from "@/hooks/use-mobile"

interface AppointmentFlowProps {
  onNavigate: (section: string) => void
}

export default function AppointmentFlow({ onNavigate }: AppointmentFlowProps) {
  const { addAppointment } = useUser()
  const [step, setStep] = useState(1)
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const isMobile = useIsMobile()

  // Mock doctors data
  const doctors = [
    {
      id: "doc1",
      name: "Dr. Sameeta Gopal",
      department: "Gynecologist",
      qualification: "MBBS, MD",
      experience: "8 yr exp.",
      image: "/placeholder.svg?height=80&width=80",
      availableDays: ["Monday", "Wednesday", "Friday"],
    },
    {
      id: "doc2",
      name: "Dr. Renuka C M",
      department: "Gynecologist",
      qualification: "MBBS, MD",
      experience: "5 yr exp.",
      image: "/placeholder.svg?height=80&width=80",
      availableDays: ["Tuesday", "Thursday", "Saturday"],
    },
  ]

  const handleDoctorSelect = (doctor: any) => {
    setSelectedDoctor(doctor)
    setStep(2)
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setStep(3)
  }

  const handleConfirm = () => {
    // Add the appointment to the user's appointments
    addAppointment({
      doctorName: selectedDoctor.name,
      doctorImage: selectedDoctor.image,
      date: selectedDate!,
      time: selectedTime || "10:00 AM",
      status: "upcoming",
      department: selectedDoctor.department,
    })
    setStep(4)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <DoctorSelection
            doctors={doctors}
            onSelect={handleDoctorSelect}
            isMobile={isMobile}
            onNavigate={onNavigate}
          />
        )
      case 2:
        return (
          <DateTimeSelection
            doctor={selectedDoctor}
            onSelectDate={handleDateSelect}
            onBack={() => setStep(1)}
            isMobile={isMobile}
          />
        )
      case 3:
        return (
          <AppointmentConfirmation
            doctor={selectedDoctor}
            date={selectedDate!}
            time={selectedTime || "10:00 AM"}
            onConfirm={handleConfirm}
            onBack={() => setStep(2)}
            isMobile={isMobile}
          />
        )
      case 4:
        return <AppointmentSuccess onDone={() => onNavigate("welcome")} isMobile={isMobile} />
      default:
        return (
          <DoctorSelection
            doctors={doctors}
            onSelect={handleDoctorSelect}
            isMobile={isMobile}
            onNavigate={onNavigate}
          />
        )
    }
  }

  return <div className="max-w-4xl mx-auto w-full">{renderStep()}</div>
}

