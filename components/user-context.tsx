"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type User = {
  name: string
  id: string
  profileImage?: string
}

type Appointment = {
  id: string
  doctorName: string
  doctorImage?: string
  date: Date
  time: string
  status: "upcoming" | "completed" | "cancelled"
  department: string
  tokenNumber?: number
  waitingTime?: number
}

type Report = {
  id: string
  name: string
  date: Date
  type: string
  downloadUrl: string
  status: "normal" | "abnormal" | "critical" | "positive"
}

type UserContextType = {
  user: User
  appointments: Appointment[]
  reports: Report[]
  addAppointment: (appointment: Omit<Appointment, "id">) => void
  cancelAppointment: (id: string) => void
  uploadReport: (report: Omit<Report, "id">) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  // Mock user data
  const [user] = useState<User>({
    name: "Priyanka",
    id: "user123",
    profileImage: "/placeholder.svg?height=100&width=100",
  })

  // Mock appointments data
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "apt1",
      doctorName: "Dr. Sarah Johnson",
      doctorImage: "/placeholder.svg?height=80&width=80",
      date: new Date(2025, 3, 25),
      time: "10:30 AM",
      status: "upcoming",
      department: "Cardiology",
      tokenNumber: 12,
      waitingTime: 25,
    },
    {
      id: "apt2",
      doctorName: "Dr. Michael Chen",
      doctorImage: "/placeholder.svg?height=80&width=80",
      date: new Date(2025, 3, 18),
      time: "2:15 PM",
      status: "completed",
      department: "General Medicine",
      tokenNumber: 8,
    },
  ])

  // Mock reports data
  const [reports, setReports] = useState<Report[]>([
    {
      id: "rep1",
      name: "Complete Blood Count (CBC)",
      date: new Date(2024, 0, 1),
      type: "CBC",
      downloadUrl: "#",
      status: "normal",
    },
    {
      id: "rep2",
      name: "Pregnancy Test (hCG)",
      date: new Date(2024, 1, 15),
      type: "Pregnancy Test",
      downloadUrl: "#",
      status: "positive",
    },
  ])

  const addAppointment = (appointment: Omit<Appointment, "id">) => {
    const newAppointment = {
      ...appointment,
      id: `apt${appointments.length + 1}`,
    }
    setAppointments([...appointments, newAppointment])
  }

  const cancelAppointment = (id: string) => {
    setAppointments(appointments.map((apt) => (apt.id === id ? { ...apt, status: "cancelled" as const } : apt)))
  }

  const uploadReport = (report: Omit<Report, "id">) => {
    const newReport = {
      ...report,
      id: `rep${reports.length + 1}`,
    }
    setReports([...reports, newReport])
  }

  return (
    <UserContext.Provider
      value={{
        user,
        appointments,
        reports,
        addAppointment,
        cancelAppointment,
        uploadReport,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

