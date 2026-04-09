import {
  ChartAreaGradient,
  ChartBarMixed,
  DashboardStats,
  DashboardTable,
} from "./components"

export default function DashboardPage() {
  return (
    <div className="px-8 pb-4 pt-2">
      <DashboardStats />
      <div className="mb-4 grid grid-cols-1 h-full gap-4 lg:grid-cols-3">

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
      <DashboardTable />
    </div>
  )
}
