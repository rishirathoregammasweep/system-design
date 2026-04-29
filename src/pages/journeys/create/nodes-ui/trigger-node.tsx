import { memo } from "react"
import { Handle, Position, type NodeProps } from "@xyflow/react"
import { Card, CardContent } from "@/components/ui/card"

function TriggerNode(_props: NodeProps) {
  return (
    <>
      <div className="">
        <Card className="min-w-max max-w-min px-4 p-2">
          <CardContent className="flex flex-col gap-1 py-0">
            <div className="gap-2">
              <p className="text-muted-foreground text-xs font-medium">Trigger</p>
              <p className="text-xs w-max font-semibold tracking-tight tabular-nums">
                Launch Manually.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="opacity-0"
      />
    </>
  )
}

export default memo(TriggerNode)
