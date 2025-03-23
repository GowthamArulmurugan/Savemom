interface SectionHeaderProps {
  title: string
  subtitle?: string
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="bg-[#4DD0C9]/20 rounded-lg p-3 mb-6">
      <h2 className="text-sm font-medium text-[#4DD0C9] text-center">{title}</h2>
      {subtitle && <p className="text-xs text-center text-[#4DD0C9] mt-1">{subtitle}</p>}
    </div>
  )
}

