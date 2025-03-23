"use client"

import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { FileText, Download, Eye, Plus, Camera, Folder } from "lucide-react"
import { format } from "date-fns"
import { useIsMobile } from "@/hooks/use-mobile"

interface MyReportsProps {
  reports: any[]
  onViewReport: (report: any) => void
  onUpload: () => void
  onBack?: () => void
}

export default function MyReports({ reports, onViewReport, onUpload, onBack }: MyReportsProps) {
  const isMobile = useIsMobile()

  // Group reports by type
  const reportsByType = reports.reduce(
    (acc, report) => {
      if (!acc[report.type]) {
        acc[report.type] = []
      }
      acc[report.type].push(report)
      return acc
    },
    {} as Record<string, any[]>,
  )

  return (
    <div>
      <div className="bg-[#4DD0C9]/20 rounded-lg p-3 mb-6">
        <h2 className="text-sm font-medium text-[#4DD0C9] text-center">My Reports</h2>
        <p className="text-xs text-center text-[#4DD0C9] mt-1">Manage reports from appointments and lab tests.</p>
      </div>

      {Object.keys(reportsByType).length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">No Reports Found</h3>
            <p className="text-gray-500 mb-4">
              You don't have any medical reports yet. Upload your first report to get started.
            </p>
            <Button onClick={onUpload}>Upload Report</Button>
          </CardContent>
        </Card>
      ) : (
        <div className={`space-y-${isMobile ? "4" : "8"} mb-${isMobile ? "20" : "0"}`}>
          {Object.entries(reportsByType).map(([type, typeReports]) => (
            <div key={type}>
              {!isMobile && <h3 className="text-lg font-medium mb-3">{type} Reports</h3>}
              <div className={`${isMobile ? "space-y-3" : "grid grid-cols-1 md:grid-cols-2 gap-4"}`}>
                {typeReports.map((report) =>
                  isMobile ? (
                    <MobileReportCard key={report.id} report={report} onView={() => onViewReport(report)} />
                  ) : (
                    <ReportCard key={report.id} report={report} onView={() => onViewReport(report)} />
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Action buttons - visible on both mobile and desktop */}
      <div className="fixed bottom-16 right-4 flex flex-col gap-3 z-20">
        <button
          className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-md"
          onClick={() => {}}
        >
          <Folder className="h-5 w-5 text-gray-500" />
        </button>
        <button
          className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-md"
          onClick={() => {}}
        >
          <Camera className="h-5 w-5 text-gray-500" />
        </button>
        <button
          className="w-10 h-10 rounded-full bg-[#4DD0C9] flex items-center justify-center shadow-md"
          onClick={onUpload}
        >
          <Plus className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  )
}

function MobileReportCard({ report, onView }: { report: any; onView: () => void }) {
  return (
    <div className="bg-white rounded-lg p-4 mb-3 border border-gray-100" onClick={onView}>
      <h3 className="font-medium text-gray-800">{report.name}</h3>
      <p className="text-xs text-gray-500 mt-1">
        {report.type === "CBC"
          ? "Assesses overall health and detects anemia or infections."
          : "Confirms pregnancy by detecting hcg hormone."}
      </p>
      <div className="flex justify-between items-center mt-2">
        <div className="text-xs text-gray-500">Test Date: {format(new Date(report.date), "dd/MM/yyyy")}</div>
        <div className="text-xs text-gray-500">
          Overview: {report.status === "normal" ? "Normal Results" : "Positive (Pregnant)"}
        </div>
      </div>
    </div>
  )
}

interface ReportCardProps {
  report: any
  onView: () => void
}

function ReportCard({ report, onView }: ReportCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-100 text-green-700"
      case "abnormal":
        return "bg-amber-100 text-amber-700"
      case "critical":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
            <FileText className="h-5 w-5 text-blue-500" />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h4 className="font-medium">{report.name}</h4>
              <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(report.status)}`}>
                {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-1">{format(new Date(report.date), "MMMM d, yyyy")}</p>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={onView}>
                <Eye className="h-3 w-3" />
                View
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="h-3 w-3" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

