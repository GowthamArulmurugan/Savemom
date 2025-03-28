"use client"

import { useState } from "react"
import { useUser } from "../user-context"
import { useIsMobile } from "@/hooks/use-mobile"
import DoctorSelection from "./doctor-selection"
import DateTimeSelection from "./date-time-selection"
import TimeSelection from "./time-selection"
import AppointmentConfirmation from "./appointment-confirmation"
import AppointmentSuccess from "./appointment-success"

interface AppointmentFlowProps {
  onNavigate: (section: string) => void
}

// Mock doctors data
const doctors = [
  {
    id: "doc1",
    name: "Dr. Sameeta Gopal",
    department: "Gynecologist",
    qualification: "MBBS, MD",
    experience: "8 yr exp.",
    availableDays: ["Monday", "Wednesday", "Friday"],
  },
  {
    id: "doc2",
    name: "Dr. Renuka C.M",
    department: "Gynecologist",
    qualification: "MBBS, MD",
    experience: "5 yr exp.",
    availableDays: ["Tuesday", "Thursday", "Saturday"],
  },
]

export default function AppointmentFlow({ onNavigate }: AppointmentFlowProps) {
  const { addAppointment } = useUser()
  const [step, setStep] = useState(1)
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const isMobile = useIsMobile()

  const handleDoctorSelect = (doctor: any) => {
    setSelectedDoctor(doctor)
    setStep(2)
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setStep(3)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setStep(4)
  }

  const handleConfirm = () => {
    // Add the appointment to the user's appointments
    addAppointment({
      doctorName: selectedDoctor.name,
      date: selectedDate!,
      time: selectedTime || "10:00 AM",
      status: "upcoming",
      department: selectedDoctor.department,
    })
    setStep(5)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <DoctorSelection doctors={doctors} onSelect={handleDoctorSelect} onBack={() => onNavigate("welcome")} />
      case 2:
        return <DateTimeSelection doctor={selectedDoctor} onSelectDate={handleDateSelect} onBack={() => setStep(1)} />
      case 3:
        return (
          <TimeSelection
            doctor={selectedDoctor}
            date={selectedDate!}
            onSelectTime={handleTimeSelect}
            onBack={() => setStep(2)}
          />
        )
      case 4:
        return (
          <AppointmentConfirmation
            doctor={selectedDoctor}
            date={selectedDate!}
            time={selectedTime || "10:00 AM"}
            onConfirm={handleConfirm}
            onBack={() => setStep(3)}
          />
        )
      case 5:
        return <AppointmentSuccess onDone={() => onNavigate("welcome")} />
      default:
        return <DoctorSelection doctors={doctors} onSelect={handleDoctorSelect} onBack={() => onNavigate("welcome")} />
    }
  }

  return <div className="max-w-4xl mx-auto w-full">{renderStep()}</div>
}

