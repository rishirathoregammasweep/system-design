import { HugeiconsIcon } from "@hugeicons/react"
import {
  Add01Icon,
  CursorPointer01Icon,
  FlowSquareIcon,
  ZapIcon,
} from "@hugeicons/core-free-icons"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { WorkflowDiagramConnector } from "@/workflow/diagram-connector"

export default function WorkflowPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
      <header className="flex shrink-0 items-center justify-between border-b border-dashed border-border/60 px-6 py-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Workflow</h1>
          <p className="text-muted-foreground text-sm">
            Trigger, connector, and add control layout for journeys.
          </p>
        </div>
      </header>

      <div className="relative flex min-h-[min(560px,calc(100dvh-10rem))] flex-1 items-start justify-center overflow-auto bg-[oklch(0.97_0_0)] px-6 py-10 dark:bg-neutral-950/80">
        <div
          className="pointer-events-none absolute inset-0 opacity-60 dark:opacity-40"
          style={{
            backgroundImage: `radial-gradient(oklch(0.88 0 0) 1px, transparent 1px)`,
            backgroundSize: "16px 16px",
          }}
        />

        <div className="relative flex flex-col items-center gap-0">
          <div className="flex w-full min-w-[260px] max-w-[300px] items-start gap-3 rounded-lg border border-border/80 bg-card p-3 shadow-sm">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/12 text-primary dark:bg-primary/20">
              <HugeiconsIcon
                icon={CursorPointer01Icon}
                className="size-5"
                strokeWidth={1.75}
              />
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <p className="text-[11px] font-medium text-muted-foreground">
                Trigger
              </p>
              <p className="mt-0.5 text-sm font-semibold leading-snug text-foreground">
                Launch manually
              </p>
            </div>
          </div>

          <WorkflowDiagramConnector />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border/80 bg-background text-muted-foreground shadow-sm outline-none transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Add step"
              >
                <HugeiconsIcon icon={Add01Icon} strokeWidth={2} className="size-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="min-w-44">
              <DropdownMenuLabel>Add</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>
                <HugeiconsIcon icon={ZapIcon} className="size-4" strokeWidth={2} />
                Trigger
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <HugeiconsIcon icon={FlowSquareIcon} className="size-4" strokeWidth={2} />
                Step
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
