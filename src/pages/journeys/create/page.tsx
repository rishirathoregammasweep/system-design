import { Button } from "@/components/ui/button"
import "@xyflow/react/dist/style.css"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  Link02FreeIcons,
  PlayCircle02FreeIcons,
} from "@hugeicons/core-free-icons"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useCallback, useState } from "react"
import {
  Background,
  ReactFlow,
  addEdge,
  ConnectionLineType,
  Position,
  useNodesState,
  useEdgesState,
  type Connection,
  type Edge,
  type EdgeTypes,
  type Node,
  type NodeMouseHandler,
  type NodeTypes,
} from "@xyflow/react"
import dagre from "@dagrejs/dagre"
import { EdgeWithButton } from "./edges-types/edge-button"
import { useTheme } from "@/components/theme-provider"
import TriggerNode from "./nodes-ui/trigger-node"
import JourneyStepNode from "./nodes-ui/journey-step-node"
import PlusNode from "./nodes-ui/plus-node"
import { NodeDetailPanel } from "./panels/node-detail-panel"

const position = { x: 0, y: 0 }

const edgeTypes = {
  edgeButton: EdgeWithButton,
} satisfies EdgeTypes

export const initialNodes = [
  {
    id: "1",
    type: "trigger",
    data: {},
    position,
  },
  {
    id: "2",
    type: "journeyStep",
    data: { kind: "email" as const, label: "Welcome email" },
    position,
  },
  {
    id: "3",
    type: "journeyStep",
    data: { kind: "delay" as const, label: "Wait 2 days" },
    position,
  },
]

const nodeTypes = {
  trigger: TriggerNode,
  journeyStep: JourneyStepNode,
  plus: PlusNode,
} satisfies NodeTypes

export const initialEdges = [
  { id: "e12", source: "1", target: "2", type: "edgeButton", animated: false },
  { id: "e13", source: "1", target: "3", type: "edgeButton", animated: false },
  { id: "e2fork", source: "2", target: "fork-plus", type: "edgeButton", animated: false },
]

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}))

const nodeWidth = 172
const nodeHeight = 36

const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction: "TB" | "LR" = "TB",
) => {
  const isHorizontal = direction === "LR"
  dagreGraph.setGraph({ rankdir: direction })

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
  })

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id)
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? Position.Left : Position.Top,
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    }

    return newNode
  })

  return { nodes: newNodes, edges }
}

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges,
)

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)

  const clearNodeSelection = useCallback(() => {
    setSelectedNode(null)
    setNodes((nds) => nds.map((n) => ({ ...n, selected: false })))
  }, [setNodes])

  const onNodeClick: NodeMouseHandler = useCallback((_event, node) => {
    setSelectedNode(node)
  }, [])

  const onPaneClick = useCallback(() => {
    clearNodeSelection()
  }, [clearNodeSelection])

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "edgeButton",
            animated: true,
          },
          eds,
        ),
      )
    },
    [setEdges],
  )

  const {theme} = useTheme()

  return (
    <ReactFlow
      className="h-full w-full"
      maxZoom={1.2}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={onNodeClick}
      onPaneClick={onPaneClick}
      edgeTypes={edgeTypes}
      connectionLineType={ConnectionLineType.SimpleBezier}
      fitView
      nodeTypes={nodeTypes}
      colorMode={theme}
    >
      <Background />
      <NodeDetailPanel
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />
    </ReactFlow>
  )
}

const Page = () => {
  return (
    <div className="bg-background flex h-full min-h-0 flex-col">
      <div className="flex shrink-0 items-center justify-between border-b border-dashed border-border/60 p-4">
        <Button variant="outline" size="lg" type="button">
          <HugeiconsIcon icon={ArrowLeft01Icon} />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="lg">
            <HugeiconsIcon icon={Link02FreeIcons} />
          </Button>
          <Separator orientation="vertical" />
          <Button variant="outline" size="lg">
            <HugeiconsIcon icon={PlayCircle02FreeIcons} />
            Run now
          </Button>
          <Button variant="outline" size="lg">
            <Switch />
            Disabled
          </Button>
          <Button variant="default" size="lg">
            Publish
          </Button>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <Flow />
      </div>
    </div>
  )
}

export default Page
