"use client"

import { useState } from "react"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react"
import {
  format,
  addDays,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  isSameMonth,
  isToday,
} from "date-fns"
import { useUser } from "../user-context"

interface DateTimeSelectionProps {
  doctor: any
  onSelectDate: (date: Date) => void
  onBack: () => void
  isMobile: boolean
}

export default function DateTimeSelection({ doctor, onSelectDate, onBack, isMobile }: DateTimeSelectionProps) {
  const { user } = useUser()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const handleDateClick = (day: Date) => {
    setSelectedDate(day)
  }

  const handleContinue = () => {
    if (selectedDate) {
      onSelectDate(selectedDate)
    }
  }

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const dateFormat = "d"
    const rows = []

    let days = []
    let day = startDate
    let formattedDate = ""

    // Days of week header
    const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
    const daysHeader = daysOfWeek.map((dayName) => (
      <div key={dayName} className="w-8 h-8 flex items-center justify-center text-xs font-medium text-gray-500">
        {dayName}
      </div>
    ))

    rows.push(
      <div key="header" className="grid grid-cols-7 mb-2">
        {daysHeader}
      </div>,
    )

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat)
        const cloneDay = day
        const isCurrentMonth = isSameMonth(day, monthStart)
        const isSelected = selectedDate ? isSameDay(day, selectedDate) : false
        const isPast = day < new Date() && !isToday(day)

        days.push(
          <div
            key={day.toString()}
            className={`w-8 h-8 flex items-center justify-center text-xs rounded-full 
              ${!isCurrentMonth ? "text-gray-300" : isPast ? "text-gray-300" : "cursor-pointer hover:bg-teal-50"}
              ${isSelected ? "bg-teal-500 text-white" : isToday(day) ? "border border-teal-500" : ""}
            `}
            onClick={() => isCurrentMonth && !isPast && handleDateClick(cloneDay)}
          >
            {formattedDate}
          </div>,
        )
        day = addDays(day, 1)
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 mb-2">
          {days}
        </div>,
      )
      days = []
    }

    return (
      <div className="mt-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={handlePrevMonth} className="p-1 rounded-full hover:bg-gray-100">
            <ChevronLeft className="h-4 w-4 text-gray-500" />
          </button>
          <h3 className="text-sm font-medium">{format(currentMonth, "MMMM yyyy")}</h3>
          <button onClick={handleNextMonth} className="p-1 rounded-full hover:bg-gray-100">
            <ChevronRight className="h-4 w-4 text-gray-500" />
          </button>
        </div>
        <div className="calendar">{rows}</div>
      </div>
    )
  }

  return (
    <div className={isMobile ? "" : "max-w-4xl mx-auto"}>
      {isMobile ? (
        <Card className="bg-white shadow-sm border border-gray-100 overflow-hidden">
          <CardContent className="p-5">
            <button onClick={onBack} className="flex items-center text-gray-500 hover:text-gray-700 mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to doctor selection
            </button>

            <div className="bg-teal-100/50 rounded-lg p-3 mb-6">
              <h2 className="text-sm font-medium text-teal-600 text-center">My Appointments</h2>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm font-medium">Selected doctor:</p>
                <p className="text-sm text-gray-700">
                  {doctor.name} | {doctor.department} | {doctor.qualification}
                </p>
              </div>
              <button className="text-xs text-teal-500 hover:underline" onClick={onBack}>
                Change
              </button>
            </div>

            <p className="text-sm mb-2">Please select date:</p>

            {renderCalendar()}

            <div className="mt-6 flex justify-end">
              <Button onClick={handleContinue} disabled={!selectedDate} className="bg-teal-500 hover:bg-teal-600">
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-teal-600 mb-2">My Appointments</h1>
            <p className="text-gray-600">Select a date for your appointment</p>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
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
                <p className="font-medium text-lg">{doctor.name}</p>
                <p className="text-sm text-gray-500">
                  {doctor.department} | {doctor.qualification}
                </p>
              </div>
            </div>
            <button className="text-sm text-teal-500 hover:underline" onClick={onBack}>
              Change Doctor
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Select Appointment Date</h2>
            {renderCalendar()}

            <div className="mt-6 flex justify-end">
              <Button onClick={handleContinue} disabled={!selectedDate} className="bg-teal-500 hover:bg-teal-600">
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

