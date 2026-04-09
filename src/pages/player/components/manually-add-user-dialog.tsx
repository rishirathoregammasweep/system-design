import { useId, useState } from "react"

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
import { Separator } from "@/components/ui/separator"
import { Add01Icon, Cancel01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

const COUNTRIES = [
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "AU", label: "Australia" },
  { value: "CA", label: "Canada" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "ES", label: "Spain" },
  { value: "IT", label: "Italy" },
  { value: "NL", label: "Netherlands" },
  { value: "BR", label: "Brazil" },
  { value: "IN", label: "India" },
  { value: "JP", label: "Japan" },
  { value: "SG", label: "Singapore" },
  { value: "AE", label: "United Arab Emirates" },
  { value: "NZ", label: "New Zealand" },
] as const

const TIMEZONES = [
  "UTC",
  "Pacific/Honolulu",
  "America/Los_Angeles",
  "America/Denver",
  "America/Chicago",
  "America/New_York",
  "America/Sao_Paulo",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Dubai",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Australia/Sydney",
] as const

type TagRow = { id: string; key: string; value: string }

function newTagRow(): TagRow {
  return { id: crypto.randomUUID(), key: "", value: "" }
}

export type ManuallyAddUserDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ManuallyAddUserDialog({
  open,
  onOpenChange,
}: ManuallyAddUserDialogProps) {
  const formId = useId()

  const [email, setEmail] = useState("")
  const [country, setCountry] = useState<string>(COUNTRIES[0].value)
  const [timezone, setTimezone] = useState<string>(TIMEZONES[0])
  const [phone, setPhone] = useState("")
  const [externalPlayerId, setExternalPlayerId] = useState("")
  const [tags, setTags] = useState<TagRow[]>(() => [newTagRow()])

  const tagListDescriptionId = `${formId}-tags-help`

  function reset() {
    setEmail("")
    setCountry(COUNTRIES[0].value)
    setTimezone(TIMEZONES[0])
    setPhone("")
    setExternalPlayerId("")
    setTags([newTagRow()])
  }

  function handleOpenChange(next: boolean) {
    onOpenChange(next)
    if (!next) reset()
  }

  function updateTag(id: string, field: "key" | "value", value: string) {
    setTags((rows) =>
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    )
  }

  function addTagRow() {
    setTags((rows) => [...rows, newTagRow()])
  }

  function removeTagRow(id: string) {
    setTags((rows) => {
      const next = rows.filter((r) => r.id !== id)
      return next.length ? next : [newTagRow()]
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    handleOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex max-h-[min(90vh,840px)] flex-col gap-0 overflow-hidden p-0 sm:max-w-xl">
        <form
          id={formId}
          onSubmit={handleSubmit}
          className="flex max-h-full min-h-0 flex-col"
        >
          <div className="shrink-0 space-y-1.5 px-6 pt-6 pr-14">
            <DialogHeader className="gap-0 text-left">
              <DialogTitle>Manually add user</DialogTitle>
              <DialogDescription>
                Create a single player record. Required fields are marked with
                an asterisk.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label
                  htmlFor={`${formId}-email`}
                  className="text-sm font-medium"
                >
                  Email <span className="text-destructive">*</span>
                </label>
                <Input
                  id={`${formId}-email`}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="grid gap-2">
                <span className="text-sm font-medium">Country</span>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {COUNTRIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <span className="text-sm font-medium">Timezone</span>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {TIMEZONES.map((tz) => (
                      <SelectItem key={tz} value={tz}>
                        {tz}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor={`${formId}-phone`}
                  className="text-sm font-medium"
                >
                  Phone number
                </label>
                <Input
                  id={`${formId}-phone`}
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 555 000 0000"
                  autoComplete="tel"
                />
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor={`${formId}-external-id`}
                  className="text-sm font-medium"
                >
                  External player ID
                </label>
                <Input
                  id={`${formId}-external-id`}
                  value={externalPlayerId}
                  onChange={(e) => setExternalPlayerId(e.target.value)}
                  placeholder="e.g. CRM or legacy system id"
                  autoComplete="off"
                />
              </div>

              <Separator className="my-1" />

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Tags</p>
                  <p
                    id={tagListDescriptionId}
                    className="text-muted-foreground text-xs leading-relaxed"
                  >
                    Optional key-value pairs merged onto the player profile
                    (e.g. source, campaign, tier).
                  </p>
                </div>

                <div
                  className="space-y-2"
                  role="group"
                  aria-describedby={tagListDescriptionId}
                >
                  {tags.map((row, index) => (
                    <div
                      key={row.id}
                      className="flex flex-col gap-2 sm:flex-row sm:items-center"
                    >
                      <Input
                        aria-label={`Tag key ${index + 1}`}
                        value={row.key}
                        onChange={(e) =>
                          updateTag(row.id, "key", e.target.value)
                        }
                        placeholder="Key"
                        className="sm:flex-1"
                        autoComplete="off"
                      />
                      <Input
                        aria-label={`Tag value ${index + 1}`}
                        value={row.value}
                        onChange={(e) =>
                          updateTag(row.id, "value", e.target.value)
                        }
                        placeholder="Value"
                        className="sm:flex-1"
                        autoComplete="off"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="shrink-0 text-muted-foreground hover:text-destructive"
                        onClick={() => removeTagRow(row.id)}
                        aria-label={`Remove tag row ${index + 1}`}
                      >
                        <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
                      </Button>
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  onClick={addTagRow}
                >
                  <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
                  Add tag
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter className="shrink-0 border-t border-border/60 bg-muted/20 px-6 py-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add user</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
