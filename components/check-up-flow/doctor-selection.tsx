"use client"

import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { Clock } from "lucide-react"

type Doctor = {
  id: string
  name: string
  department: string
  image: string
  availableSlot: string
  waitingTime: number
}

interface DoctorSelectionProps {
  doctors: Doctor[]
  onSelect: (doctor: Doctor) => void
}

export default function DoctorSelection({ doctors, onSelect }: DoctorSelectionProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Available Doctors</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} onSelect={onSelect} />
        ))}
      </div>
    </div>
  )
}

interface DoctorCardProps {
  doctor: Doctor
  onSelect: (doctor: Doctor) => void
}

function DoctorCard({ doctor, onSelect }: DoctorCardProps) {
  return (
    <Card className="hover:border-teal-200 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          

          <div className="flex-1">
            <h3 className="font-semibold">{doctor.name}</h3>
            <p className="text-sm text-gray-500">{doctor.department}</p>

            <div className="flex items-center gap-4 mt-2">
              <div>
                <p className="text-xs text-gray-500">Available Slot</p>
                <p className="text-sm font-medium">{doctor.availableSlot}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Waiting Time</p>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-orange-500" />
                  <p className="text-sm font-medium">{doctor.waitingTime} mins</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button onClick={() => onSelect(doctor)}>Select Doctor</Button>
        </div>
      </CardContent>
    </Card>
  )
}

