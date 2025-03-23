"use client"

import { useState } from "react"
import MyReports from "./my-reports"
import ReportDetails from "./report-details"
import UploadReport from "./upload-report"
import { useUser } from "../user-context"
import { useIsMobile } from "@/hooks/use-mobile"
import { ArrowLeft } from "lucide-react"

interface ReportsFlowProps {
  onNavigate: (section: string) => void
}

export default function ReportsFlow({ onNavigate }: ReportsFlowProps) {
  const [view, setView] = useState("list") // list, details, upload
  const [selectedReport, setSelectedReport] = useState<any>(null)
  const { reports } = useUser()
  const isMobile = useIsMobile()

  const handleViewReport = (report: any) => {
    setSelectedReport(report)
    setView("details")
  }

  const handleBack = () => {
    onNavigate("welcome")
  }

  const renderView = () => {
    switch (view) {
      case "list":
        return (
          <MyReports
            reports={reports}
            onViewReport={handleViewReport}
            onUpload={() => setView("upload")}
            onBack={handleBack}
          />
        )
      case "details":
        return <ReportDetails report={selectedReport} onBack={() => setView("list")} />
      case "upload":
        return <UploadReport onBack={() => setView("list")} onSuccess={() => setView("list")} />
      default:
        return (
          <MyReports
            reports={reports}
            onViewReport={handleViewReport}
            onUpload={() => setView("upload")}
            onBack={handleBack}
          />
        )
    }
  }

  return (
    <div className="w-full">
      {isMobile && view === "list" && (
        <button onClick={handleBack} className="flex items-center text-gray-500 hover:text-gray-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to home
        </button>
      )}

      <div className={`mb-${isMobile ? "4" : "6"}`}>
        <h1 className={`${isMobile ? "text-xl" : "text-2xl"} font-bold text-teal-600 mb-2`}>Medical Reports</h1>
        <p className={`${isMobile ? "text-sm" : "text-base"} text-gray-600`}>Access and manage your medical reports</p>
      </div>

      {renderView()}
    </div>
  )
}

