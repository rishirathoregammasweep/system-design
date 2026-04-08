import { Card, CardContent } from "@/components/ui/card"

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
        <Card key={item.label} size="default" className="gap-0 items-start justify-end py-3 rounded-none shadow-sm">
          <CardContent className="flex flex-col gap-1 px-4 py-0">
            <p className="text-muted-foreground text-xs font-medium">
              {item.label}
            </p>
            <p className="text-3xl font-semibold tracking-tight tabular-nums">
              {item.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
