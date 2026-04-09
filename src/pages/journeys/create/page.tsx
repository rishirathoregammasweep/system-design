import { useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "@xyflow/react"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import "@xyflow/react/dist/style.css"

function JourneyFlowBoard() {
  const [nodes, , onNodesChange] = useNodesState([])
  const [edges, , onEdgesChange] = useEdgesState([])

  const defaultEdgeOptions = useMemo(
    () => ({
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 14,
        height: 14,
        color: "var(--color-muted-foreground)",
      },
    }),
    []
  )

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodesConnectable={false}
      nodesDraggable={false}
      elementsSelectable={false}
      defaultEdgeOptions={defaultEdgeOptions}
      fitView
      fitViewOptions={{ padding: 0.35 }}
      minZoom={0.35}
      maxZoom={1.25}
      proOptions={{ hideAttribution: true }}
      className="bg-[oklch(0.97_0_0)] dark:bg-neutral-950/80 h-full min-h-[min(520px,calc(100dvh-14rem))]"
    >
      <Background
        id="journey-dots"
        gap={16}
        size={1}
        color="oklch(0.88 0 0)"
        className="dark:opacity-40"
        variant={BackgroundVariant.Dots}
      />
      <Controls
        showInteractive={false}
        className="!m-4 overflow-hidden rounded-lg border border-border/80 bg-card shadow-sm [&_button]:rounded-none [&_button]:border-0 [&_button]:border-b [&_button]:border-border/60 [&_button]:bg-card [&_button]:last:border-b-0"
      />
      <MiniMap
        className="!m-4 overflow-hidden rounded-lg border border-border/80 bg-card shadow-sm"
        maskColor="rgb(0 0 0 / 12%)"
        nodeColor={() => "var(--color-primary)"}
      />
    </ReactFlow>
  )
}

export default function CreateJourneyPage() {
  const navigate = useNavigate()
  const [journeyMeta, setJourneyMeta] = useState<{
    title: string
    description: string
  } | null>(null)
  const [draftTitle, setDraftTitle] = useState("")
  const [draftDescription, setDraftDescription] = useState("")

  const setupOpen = journeyMeta === null

  function handleSetupSave(e: React.FormEvent) {
    e.preventDefault()
    const title = draftTitle.trim()
    if (!title) return
    setJourneyMeta({
      title,
      description: draftDescription.trim(),
    })
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <Dialog open={setupOpen}>
        <DialogContent
          showCloseButton={false}
          className="sm:max-w-md"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <form onSubmit={handleSetupSave}>
            <DialogHeader>
              <DialogTitle>New journey</DialogTitle>
              <DialogDescription>
                Name your journey and add a short description. You can continue
                when you are ready.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="space-y-2">
                <label htmlFor="journey-title" className="text-sm font-medium">
                  Title
                </label>
                <Input
                  id="journey-title"
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                  placeholder="e.g. Welcome series"
                  required
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="journey-description"
                  className="text-sm font-medium"
                >
                  Description
                </label>
                <Textarea
                  id="journey-description"
                  value={draftDescription}
                  onChange={(e) => setDraftDescription(e.target.value)}
                  placeholder="What this journey is for"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/journeys")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={!draftTitle.trim()}>
                Continue
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="border-b border-border/80 px-8 py-4">
        <nav
          aria-label="Breadcrumb"
          className="text-muted-foreground mb-3 flex flex-wrap items-center gap-1 text-sm"
        >
          <Link
            to="/dashboard"
            className="hover:text-foreground transition-colors"
          >
            Acme Org
          </Link>
          <ChevronRight className="size-3.5 shrink-0 opacity-60" />
          <Link
            to="/dashboard"
            className="hover:text-foreground transition-colors"
          >
            Acme App
          </Link>
          <ChevronRight className="size-3.5 shrink-0 opacity-60" />
          <Link
            to="/journeys"
            className="hover:text-foreground transition-colors"
          >
            Journeys
          </Link>
        </nav>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 space-y-1">
            <div className="flex min-w-0 flex-wrap items-center gap-3">
              <h1 className="text-xl font-semibold tracking-tight">
                {journeyMeta?.title ?? "New journey"}
              </h1>
              <span className="bg-secondary text-secondary-foreground inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium">
                Draft
              </span>
            </div>
            {journeyMeta?.description ? (
              <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
                {journeyMeta.description}
              </p>
            ) : null}
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" aria-label="More options">
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Duplicate journey</DropdownMenuItem>
                <DropdownMenuItem>Export</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" onClick={() => navigate("/journeys")}>
              Save &amp; close
            </Button>
            <Button size="sm" disabled variant="secondary">
              Set live
            </Button>
          </div>
        </div>
      </div>

      <div className="relative min-h-[min(520px,calc(100dvh-14rem))] flex-1">
        {journeyMeta ? (
          <ReactFlowProvider>
            <JourneyFlowBoard />
          </ReactFlowProvider>
        ) : (
          <div className="bg-muted/20 flex h-full min-h-[320px] items-center justify-center">
            <p className="text-muted-foreground text-sm">
              Continue from the dialog to edit your journey.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
