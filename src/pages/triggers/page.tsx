import { CreateTriggerDialog, TriggersTable } from "./components"

export default function TriggersPage() {
  return (
    <div className="space-y-6 px-8 py-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <CreateTriggerDialog />
      </div>
      <TriggersTable />
    </div>
  )
}
