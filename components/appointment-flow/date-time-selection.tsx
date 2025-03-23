"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
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
import SectionLayout from "../layout/section-layout"
import SectionHeader from "../layout/section-header"
import SelectionItem from "../common/selection-item"

interface DateTimeSelectionProps {
  doctor: any
  onSelectDate: (date: Date) => void
  onBack: () => void
}

export default function DateTimeSelection({ doctor, onSelectDate, onBack }: DateTimeSelectionProps) {
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
              ${isSelected ? "bg-[#4DD0C9] text-white" : isToday(day) ? "border border-[#4DD0C9]" : ""}
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
    <SectionLayout
      title="My Appointments"
      subtitle="Select a date for your appointment"
      onBack={onBack}
      backText="Back to doctor selection"
      headerContent={
        <>
          <SectionHeader title="My Appointments" />
          <SelectionItem
            label="Selected doctor"
            value={`${doctor.name} | ${doctor.department} | ${doctor.qualification}`}
            onChangeClick={onBack}
          />
        </>
      }
    >
      <p className="text-sm mb-2">Please select date:</p>

      {renderCalendar()}

      <div className="mt-6 flex justify-end">
        <Button onClick={handleContinue} disabled={!selectedDate} className="bg-[#4DD0C9] hover:bg-teal-600">
          Continue
        </Button>
      </div>
    </SectionLayout>
  )
}

