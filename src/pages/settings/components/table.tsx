import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const SETTINGS = [
  { setting: "Workspace name", value: "Acme Marketing" },
  { setting: "Default timezone", value: "America/New_York" },
  { setting: "SSO provider", value: "Okta" },
  { setting: "Data retention (events)", value: "400 days" },
  { setting: "Webhook signing secret", value: "••••••••" },
  { setting: "Session timeout", value: "12 hours" },
  { setting: "Allowed email domains", value: "acme.io, partner.co" },
  { setting: "Audit log export", value: "Enabled" },
  { setting: "Default currency", value: "USD" },
  { setting: "IP allowlist enforcement", value: "Strict" },
  { setting: "Support SLA tier", value: "Enterprise" },
  { setting: "Brand primary color", value: "#2563eb" },
  { setting: "Two-person approval (keys)", value: "On" },
  { setting: "Data residency region", value: "US-East" },
  { setting: "Public API version", value: "2025-04-01" },
  { setting: "Notification digest", value: "Daily 9:00" },
  { setting: "SCIM provisioning", value: "Active" },
  { setting: "Cookie consent mode", value: "Opt-in" },
  { setting: "Backup retention", value: "35 days" },
  { setting: "Incident contact", value: "ops@acme.io" },
] as const

const rows = SETTINGS.map((s, i) => ({
  id: `settings-${i + 1}`,
  setting: s.setting,
  value: s.value,
  updated: ["Jan 2025", "Mar 2024", "2w ago", "Nov 2024", "1d ago", "Feb 2025", "Apr 2024", "Jan 2025", "Dec 2024", "Mar 2025", "Jun 2024", "Aug 2024", "Sep 2024", "Oct 2024", "Apr 2025", "May 2024", "Jul 2024", "Feb 2025", "Jan 2024", "Nov 2024"][i],
  owner: (["Admin", "Admin", "IT", "Legal", "Platform", "Security", "Admin", "Compliance", "Finance", "Security", "Support", "Brand", "Security", "Legal", "Platform", "Admin", "IT", "Legal", "Platform", "Ops"] as const)[i % 10],
  category: (["General", "Regional", "Security", "Privacy", "Integrations", "Security", "Access", "Compliance", "Regional", "Security", "Support", "Brand", "Security", "Privacy", "API", "Notifications", "Access", "Privacy", "Infra", "Operations"] as const)[i % 10],
  source: (["UI", "UI", "SCIM", "Policy", "API", "UI", "UI", "UI", "UI", "UI", "Contract", "UI", "Policy", "Policy", "API", "UI", "SCIM", "Policy", "Infra", "UI"] as const)[i % 8],
  sensitive: (["No", "No", "Yes", "No", "Yes", "No", "No", "No", "No", "Yes", "No", "No", "Yes", "Yes", "No", "No", "Yes", "Yes", "No", "No"] as const)[i % 10],
  action: (["Edit", "Edit", "Manage", "View", "Rotate", "Edit", "Edit", "Export", "Edit", "Edit", "View", "Edit", "Manage", "View", "View", "Edit", "Manage", "View", "View", "Edit"] as const)[i % 10],
}))

export default function SettingsTable() {
  return (
    <div>
      <div className="bg-background overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-muted-foreground h-9 w-10 py-2 text-center text-xs font-medium">
                #
              </TableHead>
              <TableHead className="h-9 py-2">Setting</TableHead>
              <TableHead className="h-9 py-2">Value</TableHead>
              <TableHead className="h-9 py-2">Last updated</TableHead>
              <TableHead className="h-9 py-2">Owner</TableHead>
              <TableHead className="h-9 py-2">Category</TableHead>
              <TableHead className="h-9 py-2">Source</TableHead>
              <TableHead className="h-9 py-2">Sensitive</TableHead>
              <TableHead className="h-9 py-2">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell className="text-muted-foreground py-2 text-center tabular-nums">
                  {index + 1}
                </TableCell>
                <TableCell className="py-2 font-medium">{row.setting}</TableCell>
                <TableCell className="py-2">{row.value}</TableCell>
                <TableCell className="py-2">{row.updated}</TableCell>
                <TableCell className="py-2">{row.owner}</TableCell>
                <TableCell className="py-2">{row.category}</TableCell>
                <TableCell className="py-2">{row.source}</TableCell>
                <TableCell className="py-2">{row.sensitive}</TableCell>
                <TableCell className="text-muted-foreground py-2">
                  {row.action}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
