import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartAreaGradient,
  ChartBarMixed,
  DashboardStats,
  DashboardTable,
} from "./components"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

export default function DashboardPage() {
  return (
    <div className="px-8 pb-4 pt-2">
      <DashboardStats />
      <div className="mb-4 grid grid-cols-1 h-full gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1">

        <div className="lg:col-span-1 h-full">
          <ChartAreaGradient />
        </div>
        <div className="lg:col-span-1 h-full">
          <ChartBarMixed />
        </div>
        <div className="lg:col-span-1 h-full">
          <ChartAreaGradient />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1">
        <Card className="p-0 rounded-none gap-4 shadow-none ring-0">
          <CardHeader className="p-0 gap-1 flex items-start justify-between">
            <div>
              <CardTitle>Recent Campaigns</CardTitle>
              <CardDescription>The most recent campaigns you've created.</CardDescription>
            </div>
            <Button size={'xs'}>
                View all
              <HugeiconsIcon icon={ArrowRight01Icon} />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <DashboardTable />
          </CardContent>
        </Card>
        <Card className="p-0 rounded-none gap-4 shadow-none ring-0">
          <CardHeader className="p-0 gap-1 flex items-start justify-between">
            <div>
            <CardTitle>Recent Events</CardTitle>
            <CardDescription>The most recent events you've created.</CardDescription>
            </div>
            <Button size={'xs'}>
              View all
              <HugeiconsIcon icon={ArrowRight01Icon} />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <DashboardTable />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
