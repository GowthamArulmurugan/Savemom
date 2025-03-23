"use client"

import type React from "react"

import { ArrowLeft } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { useIsMobile } from "@/hooks/use-mobile"

interface SectionLayoutProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  onBack?: () => void
  backText?: string
  headerContent?: React.ReactNode
  noPadding?: boolean
}

export default function SectionLayout({
  title,
  subtitle,
  children,
  onBack,
  backText = "Back",
  headerContent,
  noPadding = false,
}: SectionLayoutProps) {
  const isMobile = useIsMobile()

  return (
    <div className={isMobile ? "w-full" : "max-w-4xl mx-auto w-full"}>
      {isMobile ? (
        <Card className="bg-white shadow-sm border border-gray-100 overflow-hidden">
          <CardContent className={noPadding ? "p-0" : "p-5"}>
            {onBack && (
              <div className={noPadding ? "p-5 pb-0" : ""}>
                <button onClick={onBack} className="flex items-center text-gray-500 hover:text-gray-700 mb-4">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  {backText}
                </button>
              </div>
            )}

            {headerContent && <div className={noPadding ? "p-5 pb-0" : ""}>{headerContent}</div>}

            {children}
          </CardContent>
        </Card>
      ) : (
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-teal-600 mb-2">{title}</h1>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
          </div>

          {onBack && (
            <button onClick={onBack} className="flex items-center text-gray-500 hover:text-gray-700 mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              {backText}
            </button>
          )}

          {headerContent}

          {children}
        </div>
      )}
    </div>
  )
}

