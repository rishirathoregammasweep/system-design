import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { ProfileSettings } from "./components"
import NotificationSettingsPage from "./pages/notification/page"
import ApiKeySettingsPage from "./pages/api-key/page"
import AttributesSettingsPage from "./pages/attributes/page"
import WebhookSettingsPage from "./pages/webhook/page"

function TabPlaceholder({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
        {description}
      </p>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <div className="px-8 py-4">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList aria-label="Settings sections">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="api-key">API key</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="attributes">Attributes</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <TabPlaceholder
            title="My profile"
            description="Manage how you appear in the product, contact details, and billing identity. Use Edit on each section to update values."
          />
          <ProfileSettings />
        </TabsContent>

        <TabsContent value="webhooks">
          <WebhookSettingsPage />
        </TabsContent>

        <TabsContent value="api-key">
          <ApiKeySettingsPage />
        </TabsContent>

        <TabsContent value="billing">
          <TabPlaceholder
            title="Billing"
            description="Plans, invoices, payment methods, and usage that affects your bill. Export statements and set billing contacts from here."
          />
        </TabsContent>

        <TabsContent value="security">
          <TabPlaceholder
            title="Security"
            description="SSO, MFA requirements, session policies, audit log retention, and break-glass access. Review compliance-related controls in one place."
          />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettingsPage />
        </TabsContent>

        <TabsContent value="integrations">
          <TabPlaceholder
            title="Integrations"
            description="Connect data warehouses, ad platforms, support tools, and CDPs. Manage OAuth apps and sync schedules for each integration."
          />
        </TabsContent>

        <TabsContent value="attributes">
          <AttributesSettingsPage />
        </TabsContent>
      </Tabs>
    </div>
  )
}
