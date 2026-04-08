import { useCallback, useState } from "react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const FIELD_OPTIONS = [
  { value: "churn_score", label: "Churn score" },
  { value: "vip_tier", label: "VIP tier" },
  { value: "email", label: "Email" },
  { value: "country", label: "Country" },
  { value: "last_deposit", label: "Last deposit" },
  { value: "lifetime_value", label: "Lifetime value" },
  { value: "event_count_30d", label: "Events (30d)" },
] as const

const OPERATOR_OPTIONS = [
  { value: "equals", label: "Equals" },
  { value: "not_equals", label: "Not equals" },
  { value: "greater_than", label: "Greater than" },
  { value: "less_than", label: "Less than" },
  { value: "contains", label: "Contains" },
  { value: "is_empty", label: "Is empty" },
] as const

type FieldValue = (typeof FIELD_OPTIONS)[number]["value"]
type OperatorValue = (typeof OPERATOR_OPTIONS)[number]["value"]

type SegmentRuleDraft = {
  id: string
  field: FieldValue
  operator: OperatorValue
  value: string
}

function newRule(): SegmentRuleDraft {
  return {
    id: crypto.randomUUID(),
    field: "churn_score",
    operator: "equals",
    value: "",
  }
}

export function AddSegmentDialog() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [rules, setRules] = useState<SegmentRuleDraft[]>(() => [newRule()])

  const reset = useCallback(() => {
    setTitle("")
    setDescription("")
    setRules([newRule()])
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setOpen(false)
    reset()
  }

  function addRule() {
    setRules((r) => [...r, newRule()])
  }

  function removeRule(id: string) {
    setRules((r) => (r.length <= 1 ? r : r.filter((x) => x.id !== id)))
  }

  function updateRule(id: string, patch: Partial<SegmentRuleDraft>) {
    setRules((r) => r.map((x) => (x.id === id ? { ...x, ...patch } : x)))
  }

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Add segment
      </Button>
      <Dialog
        open={open}
        onOpenChange={(o) => {
          setOpen(o)
          if (!o) reset()
        }}
      >
        <DialogContent className="flex max-h-[min(90dvh,720px)] max-w-lg flex-col gap-0 p-0 sm:max-w-xl">
          <form
            onSubmit={handleSubmit}
            className="flex max-h-[inherit] flex-col overflow-hidden"
          >
            <DialogHeader className="border-border shrink-0 space-y-1 border-b px-6 py-4 text-left">
              <DialogTitle>New segment</DialogTitle>
              <DialogDescription>
                Define a title, description, and one or more rules. All rules
                must match (AND) for a player to enter the segment.
              </DialogDescription>
            </DialogHeader>

            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-6 py-4">
              <div className="space-y-2">
                <label htmlFor="segment-title" className="text-sm font-medium">
                  Title
                </label>
                <Input
                  id="segment-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. High-value purchasers"
                  required
                  autoComplete="off"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="segment-description"
                  className="text-sm font-medium"
                >
                  Description
                </label>
                <textarea
                  id="segment-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Who belongs in this segment and why?"
                  rows={3}
                  className={cn(
                    "border-input/50 bg-input/50 placeholder:text-muted-foreground w-full resize-y rounded-3xl border px-3 py-2 text-sm outline-none",
                    "focus-visible:border-ring focus-visible:ring-ring/30 focus-visible:ring-3"
                  )}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium">Rules</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addRule}
                  >
                    Add rule
                  </Button>
                </div>

                <div className="space-y-3">
                  {rules.map((rule, index) => (
                    <div
                      key={rule.id}
                      className="bg-muted/30 space-y-3 rounded-xl border p-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-muted-foreground text-xs font-medium uppercase">
                          Rule {index + 1}
                        </span>
                        {rules.length > 1 ? (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            className="text-muted-foreground size-7"
                            onClick={() => removeRule(rule.id)}
                            aria-label={`Remove rule ${index + 1}`}
                          >
                            <HugeiconsIcon
                              icon={Cancel01Icon}
                              className="size-4"
                              strokeWidth={2}
                            />
                          </Button>
                        ) : null}
                      </div>

                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="space-y-1.5">
                          <label
                            className="text-muted-foreground text-xs font-medium"
                            htmlFor={`rule-field-${rule.id}`}
                          >
                            Field
                          </label>
                          <Select
                            value={rule.field}
                            onValueChange={(v) =>
                              updateRule(rule.id, {
                                field: v as FieldValue,
                              })
                            }
                          >
                            <SelectTrigger
                              id={`rule-field-${rule.id}`}
                              size="sm"
                              className="w-full"
                            >
                              <SelectValue placeholder="Field" />
                            </SelectTrigger>
                            <SelectContent>
                              {FIELD_OPTIONS.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                  {opt.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-1.5">
                          <label
                            className="text-muted-foreground text-xs font-medium"
                            htmlFor={`rule-op-${rule.id}`}
                          >
                            Operator
                          </label>
                          <Select
                            value={rule.operator}
                            onValueChange={(v) =>
                              updateRule(rule.id, {
                                operator: v as OperatorValue,
                              })
                            }
                          >
                            <SelectTrigger
                              id={`rule-op-${rule.id}`}
                              size="sm"
                              className="w-full"
                            >
                              <SelectValue placeholder="Operator" />
                            </SelectTrigger>
                            <SelectContent>
                              {OPERATOR_OPTIONS.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                  {opt.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-1.5 sm:col-span-1">
                          <label
                            className="text-muted-foreground text-xs font-medium"
                            htmlFor={`rule-value-${rule.id}`}
                          >
                            Value
                          </label>
                          <Input
                            id={`rule-value-${rule.id}`}
                            value={rule.value}
                            onChange={(e) =>
                              updateRule(rule.id, { value: e.target.value })
                            }
                            placeholder="e.g. 72"
                            disabled={rule.operator === "is_empty"}
                            autoComplete="off"
                            className="h-8"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter className="border-border shrink-0 border-t px-6 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create segment</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
