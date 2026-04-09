import { useId } from "react"
import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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
  { month: "January", email: 186, push: 80 },
  { month: "February", email: 305, push: 200 },
  { month: "March", email: 237, push: 120 },
  { month: "April", email: 73, push: 190 },
  { month: "May", email: 209, push: 130 },
  { month: "June", email: 214, push: 140 },
]

const chartConfig = {
  email: {
    label: "Email",
    color: "var(--chart-1)",
  },
  push: {
    label: "Push",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartAreaGradient({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "")
  const fillEmail = `fillEmail-${uid}`
  const fillPush = `fillPush-${uid}`

  return (
    <Card className={cn("p-4 ring-0 shadow-none border-none", className)}>
      <CardHeader>
        <CardTitle>Engagement over time</CardTitle>
        <CardDescription>
          Unique touches from email and push in the last six months. Stacks show
          combined reach when both channels contacted the same.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id={fillPush} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-push)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-push)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id={fillEmail} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-email)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-email)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="push"
              type="natural"
              fill={`url(#${fillPush})`}
              fillOpacity={0.4}
              stroke="var(--color-push)"
              stackId="a"
            />
            <Area
              dataKey="email"
              type="natural"
              fill={`url(#${fillEmail})`}
              fillOpacity={0.4}
              stroke="var(--color-email)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Combined touches up 5.2% vs. last month{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              January – June 2026 · indexed to workspace timezone
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
