import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const chartData = [
  { channel: "email", reach: 275, fill: "var(--color-email)" },
  { channel: "push", reach: 200, fill: "var(--color-push)" },
  { channel: "in_app", reach: 187, fill: "var(--color-in_app)" },
  { channel: "sms", reach: 173, fill: "var(--color-sms)" },
  { channel: "web", reach: 90, fill: "var(--color-web)" },
]

const chartConfig = {
  reach: {
    label: "Reach",
  },
  email: {
    label: "Email",
    color: "var(--chart-1)",
  },
  push: {
    label: "Push",
    color: "var(--chart-2)",
  },
  in_app: {
    label: "In-app",
    color: "var(--chart-3)",
  },
  sms: {
    label: "SMS",
    color: "var(--chart-4)",
  },
  web: {
    label: "Web",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function ChartBarMixed({ className }: { className?: string }) {
  return (
    <Card className={cn("p-4 ring-0 shadow-none border-none", className)}>
      <CardHeader className="px-0">
        <CardTitle>Reach by channel</CardTitle>
        <CardDescription>
          Estimated unique recipients in the last 30 days, grouped by the
          channel that delivered your campaigns and journeys.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="channel"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                String(
                  chartConfig[value as keyof typeof chartConfig]?.label ?? value
                )
              }
            />
            <XAxis dataKey="reach" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="reach" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
