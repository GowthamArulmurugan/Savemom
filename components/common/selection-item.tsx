"use client"

interface SelectionItemProps {
  label: string
  value: string
  onChangeClick?: () => void
}

export default function SelectionItem({ label, value, onChangeClick }: SelectionItemProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-gray-500">{label}:</p>
        {onChangeClick && (
          <button className="text-xs text-[#4DD0C9] hover:underline" onClick={onChangeClick}>
            Change
          </button>
        )}
      </div>
      <div className="bg-[#4DD0C9] text-white rounded-lg p-3">
        <p className="text-sm">{value}</p>
      </div>
    </div>
  )
}

