import type { Node } from "@xyflow/react"

import type { JourneyStepNodeData } from "../nodes-ui/journey-step-node"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type JourneyStepFlowNode = Node<JourneyStepNodeData, "journeyStep">

type JourneyStepNodePanelProps = {
  node: JourneyStepFlowNode
}

const kindLabels: Record<JourneyStepNodeData["kind"], string> = {
  email: "Email",
  sms: "SMS",
  push: "Push",
  delay: "Delay",
  branch: "Branch",
  split: "Split / A-B",
  tag: "Tags",
  webhook: "Webhook",
}

export function JourneyStepNodePanel({ node }: JourneyStepNodePanelProps) {
  const { kind, label } = node.data

  return (
    <div className="flex flex-col gap-6 px-1">
      <div className="flex flex-col gap-2">
        <Label>Step type</Label>
        <p className="text-sm font-medium">{kindLabels[kind]}</p>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={`step-label-${node.id}`}>Label</Label>
        <Input id={`step-label-${node.id}`} defaultValue={label} readOnly />
      </div>
      <p className="text-muted-foreground text-xs leading-relaxed">
        Edit step content and behavior in the full step editor when wired to your
        backend.
      </p>
    </div>
  )
}
