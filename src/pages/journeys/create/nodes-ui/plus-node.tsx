import { memo } from "react"
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HugeiconsIcon } from "@hugeicons/react"
import { PlusSignIcon } from "@hugeicons/core-free-icons"

export type PlusNodeData = {
  /** Called when the user picks a step type from the menu (wire from the canvas parent). */
  onAddStep?: (kind: PlusStepKind) => void
}

export type PlusStepKind =
  | "email"
  | "sms"
  | "push"
  | "delay"
  | "branch"
  | "split"
  | "tag"
  | "webhook"

type PlusFlowNode = Node<PlusNodeData, "plus">

function PlusNode({ data }: NodeProps<PlusFlowNode>) {
  const onAddStep = data.onAddStep

  function pick(kind: PlusStepKind) {
    onAddStep?.(kind)
  }

  return (
    <div className="relative flex flex-col items-center">
      <Handle
        type="target"
        position={Position.Top}
        className="opacity-0"
      />

      <div className="nodrag nopan">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger>
            <Button
              type="button"
              aria-label="Add journey step"
              size="icon-xs"
              variant="outline"
            >
              <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="min-w-52" sideOffset={8}>
            <DropdownMenuLabel>Add next step</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="nodrag nopan">
                Messages
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="nodrag nopan">
                <DropdownMenuItem onSelect={() => pick("email")}>Email</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => pick("sms")}>SMS</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => pick("push")}>Push notification</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="nodrag nopan">
                Flow control
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="nodrag nopan">
                <DropdownMenuItem onSelect={() => pick("delay")}>Delay</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => pick("branch")}>Branch (If / Else)</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => pick("split")}>Split / A-B test</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={() => pick("tag")}>Update tags</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => pick("webhook")}>Webhook</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="opacity-0"
      />
    </div>
  )
}

export default memo(PlusNode)
