"use client"

import { Card, CardContent, CardFooter } from "../ui/card"
import { Button } from "../ui/button"
import { ArrowLeft, Download, Printer, Share2 } from "lucide-react"
import { format } from "date-fns"
import { useIsMobile } from "@/hooks/use-mobile"

interface ReportDetailsProps {
  report: any
  onBack: () => void
}

export default function ReportDetails({ report, onBack }: ReportDetailsProps) {
  const isMobile = useIsMobile()

  // Mock report data based on type
  const getReportData = () => {
    if (report.type === "CBC") {
      return [
        { name: "Hemoglobin (Hb)", value: "14.2 g/dL", range: "13.5-17.5 g/dL", status: "normal" },
        { name: "Red Blood Cells (RBC)", value: "5.2 million/µL", range: "4.5-5.9 million/µL", status: "normal" },
        { name: "White Blood Cells (WBC)", value: "7,500 /µL", range: "4,500-11,000 /µL", status: "normal" },
        { name: "Platelets", value: "250,000 /µL", range: "150,000-450,000 /µL", status: "normal" },
        { name: "Hematocrit (Hct)", value: "42%", range: "38.8-50%", status: "normal" },
      ]
    } else if (report.type === "Blood Test") {
      return [
        { name: "Glucose", value: "95 mg/dL", range: "70-99 mg/dL", status: "normal" },
        { name: "Total Cholesterol", value: "210 mg/dL", range: "<200 mg/dL", status: "abnormal" },
        { name: "HDL Cholesterol", value: "55 mg/dL", range: ">40 mg/dL", status: "normal" },
        { name: "LDL Cholesterol", value: "130 mg/dL", range: "<100 mg/dL", status: "abnormal" },
        { name: "Triglycerides", value: "120 mg/dL", range: "<150 mg/dL", status: "normal" },
      ]
    } else {
      return [
        { name: "Test 1", value: "Normal", range: "Normal", status: "normal" },
        { name: "Test 2", value: "Normal", range: "Normal", status: "normal" },
        { name: "Test 3", value: "Normal", range: "Normal", status: "normal" },
      ]
    }
  }

  const reportData = getReportData()

  return (
    <div>
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-gray-700 mb-4">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to reports
      </button>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className={`${isMobile ? "text-lg" : "text-xl"} font-semibold`}>{report.name}</h2>
              <p className="text-gray-500">{format(new Date(report.date), "MMMM d, yyyy")}</p>
            </div>

            <div
              className={`px-3 py-1 rounded-full text-sm font-medium 
              ${
                report.status === "normal"
                  ? "bg-green-100 text-green-700"
                  : report.status === "abnormal"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden mb-6">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Test</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Result</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Reference Range</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {reportData.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm">{item.name}</td>
                    <td className="px-4 py-3 text-sm font-medium">{item.value}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{item.range}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium 
                        ${
                          item.status === "normal"
                            ? "bg-green-100 text-green-700"
                            : item.status === "abnormal"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-blue-700 mb-2">Doctor's Notes</h4>
            <p className="text-sm text-blue-700">
              {report.status === "normal"
                ? "All test results are within normal ranges. Continue with regular check-ups as scheduled."
                : "Some test results are outside normal ranges. Please schedule a follow-up appointment to discuss these results."}
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between p-4 border-t">
          <div className="text-sm text-gray-500">Report ID: {report.id}</div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

