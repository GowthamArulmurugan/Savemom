import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn("bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden", className)}>
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn("p-4 border-b border-gray-100", className)}>{children}</div>
}

interface CardContentProps {
  children: ReactNode
  className?: string
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn("p-4", className)}>{children}</div>
}

interface CardFooterProps {
  children: ReactNode
  className?: string
}

export function CardFooter({ children, className }: CardFooterProps) {
  return <div className={cn("p-4 border-t border-gray-100", className)}>{children}</div>
}

