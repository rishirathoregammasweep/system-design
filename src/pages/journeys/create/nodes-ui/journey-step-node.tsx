import { memo } from "react"
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { PlusStepKind } from "./plus-node"

export type JourneyStepNodeData = {
  kind: PlusStepKind
  label: string
}

type JourneyStepFlowNode = Node<JourneyStepNodeData, "journeyStep">

function JourneyStepNode({ data, selected }: NodeProps<JourneyStepFlowNode>) {
  return (
    <div className="nodrag nopan">
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <Card
        className={cn(
          "min-w-[180px] border p-0 ring-0 shadow-none",
          selected && "border-red-500",
        )}
      >
        <CardContent className="flex flex-col gap-0.5 py-3">
          <p className="text-muted-foreground text-xs font-medium">Step</p>
          <p className="text-[10px] font-semibold leading-tight">{data.label}</p>
        </CardContent>
      </Card>
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  )
}

export default memo(JourneyStepNode)
