import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import ChartAreaGradient from "./components/chart-area-gradient"
import { DashboardTable } from "./components"
import { DashboardStats } from "./components/dashboard-stats"

export default function DashboardPage() {
  return (
    <div className="px-8 pb-4 pt-2 flex flex-col gap-4">

      <DashboardStats />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1">
      <ChartAreaGradient />
      <ChartAreaGradient />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1">
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
