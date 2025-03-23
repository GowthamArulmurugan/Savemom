"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { format } from "date-fns"
import SectionLayout from "../layout/section-layout"
import SectionHeader from "../layout/section-header"
import SelectionItem from "../common/selection-item"

interface TimeSelectionProps {
  doctor: any
  date: Date
  onSelectTime: (time: string) => void
  onBack: () => void
}

export default function TimeSelection({ doctor, date, onSelectTime, onBack }: TimeSelectionProps) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const morningSlots = ["10:00 AM", "10:30 AM", "11:00 AM", "12:00 PM"]
  const eveningSlots = ["05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM"]

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleContinue = () => {
    if (selectedTime) {
      onSelectTime(selectedTime)
    }
  }

  return (
    <SectionLayout
      title="My Appointments"
      subtitle="Select a time for your appointment"
      onBack={onBack}
      backText="Back to date selection"
      headerContent={
        <>
          <SectionHeader title="My Appointments" />
          <SelectionItem
            label="Selected doctor"
            value={`${doctor.name} | ${doctor.department} | ${doctor.qualification}`}
          />
          <SelectionItem label="Selected Date" value={format(date, "do MMMM yyyy, EEEE")} onChangeClick={onBack} />
        </>
      }
    >
      <p className="text-sm text-gray-500 mb-2">Please select a time slot:</p>

      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-2">Morning Slot:</p>
        <div className="grid grid-cols-4 gap-2">
          {morningSlots.map((time) => (
            <button
              key={time}
              className={`py-2 px-3 text-xs rounded-full border 
                ${
                  selectedTime === time
                    ? "bg-[#4DD0C9] text-white border-[#4DD0C9]"
                    : "bg-white text-gray-700 border-gray-200 hover:border-[#4DD0C9]"
                }`}
              onClick={() => handleTimeSelect(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-500 mb-2">Evening Slot:</p>
        <div className="grid grid-cols-4 gap-2">
          {eveningSlots.map((time) => (
            <button
              key={time}
              className={`py-2 px-3 text-xs rounded-full border 
                ${
                  selectedTime === time
                    ? "bg-[#4DD0C9] text-white border-[#4DD0C9]"
                    : "bg-white text-gray-700 border-gray-200 hover:border-[#4DD0C9]"
                }`}
              onClick={() => handleTimeSelect(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <Button onClick={handleContinue} disabled={!selectedTime} className="w-full bg-[#4DD0C9] hover:bg-teal-600">
          Continue
        </Button>
      </div>
    </SectionLayout>
  )
}

