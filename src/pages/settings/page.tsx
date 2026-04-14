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
import BillingSettingsPage from "./pages/billing/page"
import BrandChannelsSettingsPage from "./pages/brand-channels/page"
import IntegrationsSettingsPage from "./pages/integrations/page"
import SecuritySettingsPage from "./pages/security/page"
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
          <TabsTrigger value="brand-channels">Brand channels</TabsTrigger>
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

        <TabsContent value="brand-channels">
          <BrandChannelsSettingsPage />
        </TabsContent>

        <TabsContent value="billing">
          <BillingSettingsPage />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettingsPage />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettingsPage />
        </TabsContent>

        <TabsContent value="integrations">
          <IntegrationsSettingsPage />
        </TabsContent>

        <TabsContent value="attributes">
          <AttributesSettingsPage />
        </TabsContent>
      </Tabs>
    </div>
  )
}
