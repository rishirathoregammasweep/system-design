import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const QUERIES = [
  "segment:high ltv",
  "user email domain @partner.com",
  "event purchase_completed",
  "campaign status:running",
  "journey onboarding",
  "profile country:DE",
  "api key last_used:<7d",
  "trigger type:event",
  "segment churn risk",
  "user role:admin",
  "event schema:v2",
  "campaign channel:push",
  "journey status:paused",
  "invoice status:open",
  "webhook failures>0",
  "export type:csv",
  "mfa off workspace:acme",
  "trial ends:<14d",
  "nps score:promoter",
  "audit actor:api",
] as const

const rows = QUERIES.map((query, i) => ({
  id: `search-${i + 1}`,
  query,
  type: (["Saved", "Recent", "Recent", "Saved", "Recent", "Saved", "Recent", "Recent", "Saved", "Recent", "Recent", "Recent", "Recent", "Saved", "Recent", "Saved", "Recent", "Saved", "Saved", "Recent"] as const)[i],
  lastUsed: ["Today", "Yesterday", "2d ago", "1w ago", "3h ago", "Today", "4d ago", "6h ago", "2w ago", "1d ago", "5h ago", "12h ago", "1d ago", "3d ago", "20m ago", "1w ago", "2d ago", "Today", "5d ago", "45m ago"][i],
  results: ["12", "48", "1", "6", "3", "890", "24", "156", "8", "14", "22", "9", "4", "2", "31", "5", "67", "120", "18", "200"][i],
  owner: (["You", "You", "You", "Team", "You", "You", "You", "You", "Team", "You", "You", "You", "You", "Finance", "You", "You", "You", "You", "CS", "Security"] as const)[i % 10],
  scope: ["Workspace", "Users", "Events", "Campaigns", "Journeys", "Profiles", "API", "Triggers", "Segments", "Users", "Events", "Campaigns", "Journeys", "Billing", "Platform", "Exports", "Users", "Trials", "Surveys", "Audit"][i],
  starred: (["Yes", "No", "No", "Yes", "No", "No", "No", "Yes", "Yes", "No", "No", "No", "No", "No", "No", "Yes", "No", "Yes", "Yes", "No"] as const)[i],
  latency: ["42ms", "55ms", "38ms", "61ms", "49ms", "44ms", "52ms", "39ms", "58ms", "47ms", "41ms", "53ms", "46ms", "50ms", "36ms", "48ms", "43ms", "40ms", "56ms", "51ms"][i],
}))

export default function SearchTable() {
  return (
    <div>
      <div className="bg-background overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-muted-foreground h-9 w-10 py-2 text-center text-xs font-medium">
                #
              </TableHead>
              <TableHead className="h-9 py-2">Query</TableHead>
              <TableHead className="h-9 py-2">Type</TableHead>
              <TableHead className="h-9 py-2">Last used</TableHead>
              <TableHead className="h-9 py-2">Results</TableHead>
              <TableHead className="h-9 py-2">Owner</TableHead>
              <TableHead className="h-9 py-2">Scope</TableHead>
              <TableHead className="h-9 py-2">Starred</TableHead>
              <TableHead className="h-9 py-2">Latency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell className="text-muted-foreground py-2 text-center tabular-nums">
                  {index + 1}
                </TableCell>
                <TableCell className="py-2 font-medium">{row.query}</TableCell>
                <TableCell className="py-2">{row.type}</TableCell>
                <TableCell className="py-2">{row.lastUsed}</TableCell>
                <TableCell className="py-2">{row.results}</TableCell>
                <TableCell className="py-2">{row.owner}</TableCell>
                <TableCell className="py-2">{row.scope}</TableCell>
                <TableCell className="py-2">{row.starred}</TableCell>
                <TableCell className="py-2">{row.latency}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
