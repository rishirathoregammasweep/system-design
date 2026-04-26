import { useCallback, useState } from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Link02Icon, Search } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

const INVITE_URL =
  "https://app.example.com/join/ws_7k2m9n/invite?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"

function SectionHeading({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="space-y-1">
      <h2 className="text-sm font-medium">{title}</h2>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  )
}

export default function MembersSettingsPage() {
  const [copied, setCopied] = useState(false)
  const [inviteEmails, setInviteEmails] = useState("")
  const [role, setRole] = useState("member")
  const [search, setSearch] = useState("")

  const copyInvite = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(INVITE_URL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }, [])

  return (
    <div className="mx-0 max-w-4xl space-y-10 pb-12">
      <nav
        aria-label="Breadcrumb"
        className="text-muted-foreground mb-6 flex flex-wrap items-center gap-1.5 text-sm"
      >
        <span>Workspace</span>
        <span aria-hidden className="text-muted-foreground/80">
          /
        </span>
        <span className="text-foreground font-medium">Members</span>
      </nav>

      <h1 className="text-2xl font-semibold tracking-tight">Members</h1>

      <section className="space-y-4">
        <SectionHeading
          title="Invite by link"
          description="Share this link to invite users to join your workspace"
        />
        <div className="flex max-w-3xl flex-col gap-2 sm:flex-row sm:items-stretch">
          <Input
            readOnly
            value={INVITE_URL}
            className="h-10 min-w-0 flex-1 rounded-lg font-mono text-xs sm:text-sm"
            aria-label="Invite link"
          />
          <Button
            type="button"
            className="h-10 shrink-0 rounded-lg px-4 sm:w-auto"
            onClick={copyInvite}
          >
            {copied ? "Copied" : "Copy link"}
          </Button>
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <SectionHeading
          title="Invite by email"
          description="Send an invite email to your team"
        />
        <div className="flex max-w-3xl flex-col gap-3 lg:flex-row lg:items-end">
          <div className="min-w-0 flex-1 space-y-2">
            <label htmlFor="invite-emails" className="sr-only">
              Email addresses
            </label>
            <Input
              id="invite-emails"
              placeholder="tim@apple.com, jony.ive@apple.dev"
              value={inviteEmails}
              onChange={(e) => setInviteEmails(e.target.value)}
              className="h-10 rounded-lg"
            />
          </div>
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-end lg:w-auto">
            <div className="min-w-[10rem] flex-1 sm:flex-initial">
              <label htmlFor="default-role" className="sr-only">
                Default role
              </label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="default-role" className="h-10 w-full rounded-lg">
                  <SelectValue placeholder="Default role" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="button" className="h-10 shrink-0 rounded-lg">
              Invite
            </Button>
          </div>
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <SectionHeading
          title="Manage members"
          description="Manage the members of your workspace here"
        />
        <Card className="shadow-sm ring-1 ring-border">
          <CardContent className="space-y-4 p-4 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <InputGroup className="h-10 max-w-xl flex-1 rounded-lg border border-input bg-background shadow-xs">
                <InputGroupAddon align="inline-start" className="pl-3">
                  <HugeiconsIcon
                    icon={Search}
                    strokeWidth={2}
                    className="text-muted-foreground size-4"
                  />
                </InputGroupAddon>
                <InputGroupInput
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search a team member..."
                  className="h-10 py-2"
                  aria-label="Search members"
                />
              </InputGroup>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9 shrink-0 gap-2 rounded-lg"
              >
                Open
                <HugeiconsIcon icon={Link02Icon} strokeWidth={2} className="size-4" />
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8 rounded-md">
                        <AvatarFallback className="rounded-md bg-violet-600 text-xs font-medium text-white">
                          R
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">Rishi Rathore</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    rishi.idealtechno@gmail.com
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
