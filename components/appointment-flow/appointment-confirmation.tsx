"use client"

import { Button } from "../ui/button"
import { format } from "date-fns"
import SectionLayout from "../layout/section-layout"
import SectionHeader from "../layout/section-header"
import SelectionItem from "../common/selection-item"

interface AppointmentConfirmationProps {
  doctor: any
  date: Date
  time: string
  onConfirm: () => void
  onBack: () => void
}

export default function AppointmentConfirmation({
  doctor,
  date,
  time,
  onConfirm,
  onBack,
}: AppointmentConfirmationProps) {
  return (
    <SectionLayout
      title="My Appointments"
      subtitle="Confirm your appointment details"
      onBack={onBack}
      backText="Back to time selection"
      headerContent={
        <>
          <SectionHeader title="My Appointments" />
          <SelectionItem
            label="Selected doctor"
            value={`${doctor.name} | ${doctor.department} | ${doctor.qualification}`}
          />
          <SelectionItem label="Selected Date" value={format(date, "do MMMM yyyy, EEEE")} />
          <SelectionItem label="Selected Time-slot" value={`Morning slot: ${time} IST`} onChangeClick={onBack} />
        </>
      }
    >
      <div className="mb-20 md:mb-0">
        <Button onClick={onConfirm} className="w-full bg-[#4DD0C9] hover:bg-teal-600">
          Confirm Appointment
        </Button>
      </div>
    </SectionLayout>
  )
}

