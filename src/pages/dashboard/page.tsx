import { DashboardStats, DashboardTable } from "./components"

export default function DashboardPage() {
  return (
    <div className="px-8 pb-4 pt-2">
      <DashboardStats />
      <DashboardTable />
    </div>
  )
}
