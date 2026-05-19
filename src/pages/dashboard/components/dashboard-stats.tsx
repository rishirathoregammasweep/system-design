import { Card, CardContent } from "@/components/ui/card"
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"

const stats = [
  { label: "Active campaigns", value: "12" },
  { label: "Active triggers", value: "8" },
  {
    label: "Total 30d events",
    value: "184.9k",
  },
  {
    label: "Campaign With Metrics",
    value: "123",
  }
] as const

export function DashboardStats() {
  return (
    <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {stats.map((item) => (
        <Item key={item.label} variant="muted">
          <ItemContent >
            <ItemTitle>{item.label}</ItemTitle>
            <ItemDescription className="leading-7 text-2xl font-medium">{item.value}</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  )
}
