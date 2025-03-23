import { cn } from "@/lib/utils"
import type { ReactNode, ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link"
  size?: "sm" | "md" | "lg" | "icon"
  className?: string
}

export function Button({ children, variant = "primary", size = "md", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        {
          "bg-teal-500 text-white hover:bg-teal-600 focus-visible:ring-teal-500": variant === "primary",
          "bg-teal-100 text-teal-700 hover:bg-teal-200 focus-visible:ring-teal-500": variant === "secondary",
          "border border-gray-300 bg-white hover:bg-gray-50 focus-visible:ring-gray-500": variant === "outline",
          "hover:bg-gray-100 focus-visible:ring-gray-500": variant === "ghost",
          "underline-offset-4 hover:underline focus-visible:ring-gray-500": variant === "link",
          "h-9 px-3 text-sm": size === "sm",
          "h-10 px-4": size === "md",
          "h-11 px-6": size === "lg",
          "h-10 w-10 p-0": size === "icon",
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

