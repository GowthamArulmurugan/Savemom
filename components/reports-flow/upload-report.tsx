"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { ArrowLeft, Upload, type File, X, CheckCircle } from "lucide-react"
import { useUser } from "../user-context"
import { useIsMobile } from "@/hooks/use-mobile"

interface UploadReportProps {
  onBack: () => void
  onSuccess: () => void
}

export default function UploadReport({ onBack, onSuccess }: UploadReportProps) {
  const { uploadReport } = useUser()
  const [step, setStep] = useState(1) // 1: upload, 2: details, 3: success
  const [file, setFile] = useState<File | null>(null)
  const [reportType, setReportType] = useState("")
  const [reportName, setReportName] = useState("")
  const isMobile = useIsMobile()

  const reportTypes = [
    "Precon Test",
    "Prenatal",
    "Screening",
    "Abnormality",
    "CBC (Complete Blood Count)",
    "Blood Test",
    "Urinalysis",
    "X-Ray",
    "MRI",
    "CT Scan",
    "Ultrasound",
    "ECG/EKG",
    "Pregnancy Test",
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setStep(2)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
      setStep(2)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Add the report to the user's reports
    uploadReport({
      name: reportName || "Thyroid Function Test",
      date: new Date(),
      type: reportType || "Blood Test",
      downloadUrl: "#",
      status: "normal",
    })

    setStep(3)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Upload Medical Report</h2>

            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Upload className="h-8 w-8 text-gray-400" />
              </div>

              <h3 className="text-lg font-medium mb-2">Drag & Drop Your File Here</h3>
              <p className="text-gray-500 mb-4">Supported formats: PDF, JPG, PNG (Max size: 10MB)</p>

              <div className="relative">
                <Button as="div" variant="outline" className="relative">
                  Browse Files
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </Button>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div>
            <div className="bg-[#4DD0C9]/20 rounded-lg p-3 mb-6">
              <h2 className="text-sm font-medium text-[#4DD0C9] text-center">My Reports</h2>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-white rounded-lg p-4 mb-3 border border-gray-100">
                <h3 className="font-medium text-gray-800">Complete Blood Count (CBC)</h3>
                <p className="text-xs text-gray-500 mt-1">Assesses overall health and detects anemia or infections.</p>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-xs text-gray-500">Test Date: 01/01/2024</div>
                  <div className="text-xs text-gray-500">Overview: Normal Results</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 mb-3 border border-gray-100">
                <h3 className="font-medium text-gray-800">Pregnancy Test (hCG)</h3>
                <p className="text-xs text-gray-500 mt-1">Confirms pregnancy by detecting hcg hormone.</p>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-xs text-gray-500">Test Date: 15/02/2024</div>
                  <div className="text-xs text-gray-500">Overview: Positive (Pregnant)</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-100 mb-6">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-sm font-medium">Selected File:</p>
                  <p className="text-xs text-gray-500">Priya_Thyroid Function Test_pdf</p>
                </div>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => {
                    setFile(null)
                    setStep(1)
                  }}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Type</label>
                <div className="relative">
                  <select
                    className="w-full p-2 border rounded-lg appearance-none pr-8"
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    required
                  >
                    <option value="">Select Report Type</option>
                    {reportTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <Button onClick={handleSubmit} className="w-full bg-[#4DD0C9] hover:bg-teal-600">
              Upload Report
            </Button>
          </div>
        )

      case 3:
        return (
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>

            <h2 className="text-xl font-semibold mb-2">Upload Successful!</h2>
            <p className="text-gray-500 mb-6">
              Your medical report has been successfully uploaded and added to your records.
            </p>

            <Button onClick={onSuccess}>View My Reports</Button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div>
      {step < 3 && !isMobile && (
        <button onClick={onBack} className="flex items-center text-gray-500 hover:text-gray-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to reports
        </button>
      )}

      <Card>
        <CardContent className="p-6">{renderStep()}</CardContent>
      </Card>
    </div>
  )
}

