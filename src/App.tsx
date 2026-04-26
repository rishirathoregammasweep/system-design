import type { ReactNode } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import LayoutSidebar from "@/components/layouts/sidebar-page-layout"
import { sidebarMenus } from "@/components/layouts/sidebar-menus"
import {
  settingsSidebarMenu,
  type SettingsSidebarPath,
} from "@/components/layouts/setting-sidebar-menus"
import AnalyticsPage from "@/pages/analytics/page"
import ApiPage from "@/pages/api/page"
import CampaignPage from "@/pages/campaign/page"
import DashboardPage from "@/pages/dashboard/page"
import EventsPage from "@/pages/events/page"
import CreateJourneyPage from "@/pages/journeys/create/page"
import JourneysPage from "@/pages/journeys/page"
import PlayerPage from "@/pages/player/page"
import SearchPage from "@/pages/search/page"
import SegmentationPage from "@/pages/segmentation/page"
import NotFoundPage from "@/pages/not-found/page"
import SettingsLayout from "@/pages/settings/settings-layout"
import SettingsProfilePage from "@/pages/settings/pages/profile/page"
import AppearanceSettingsPage from "@/pages/settings/pages/appearance/page"
import WebhookSettingsPage from "@/pages/settings/pages/webhook/page"
import ApiKeySettingsPage from "@/pages/settings/pages/api-key/page"
import BrandChannelsSettingsPage from "@/pages/settings/pages/brand-channels/page"
import BillingSettingsPage from "@/pages/settings/pages/billing/page"
import SecuritySettingsPage from "@/pages/settings/pages/security/page"
import NotificationSettingsPage from "@/pages/settings/pages/notification/page"
import IntegrationsSettingsPage from "@/pages/settings/pages/integrations/page"
import AttributesSettingsPage from "@/pages/settings/pages/attributes/page"
import MembersSettingsPage from "@/pages/settings/pages/members/page"
import TriggersPage from "@/pages/triggers/page"
import TemplatesPage from "@/pages/templates/page"
import UsersPage from "@/pages/users/page"

function PageTitle({ title }: { title: string }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
    </div>
  )
}

const routeElements: Partial<
  Record<(typeof sidebarMenus)[number]["path"], ReactNode>
> = {
  "/dashboard": <DashboardPage />,
  "/analytics": <AnalyticsPage />,
  "/users": <UsersPage />,
  "/players": <PlayerPage />,
  "/segments": <SegmentationPage />,
  "/events": <EventsPage />,
  "/campaigns": <CampaignPage />,
  "/journeys": <JourneysPage />,
  "/triggers": <TriggersPage />,
  "/search": <SearchPage />,
  "/api": <ApiPage />,
  "/templates": <TemplatesPage />,
}

const settingsRouteElements = {
  "/settings/profile": <SettingsProfilePage />,
  "/settings/appearance": <AppearanceSettingsPage />,
  "/settings/webhooks": <WebhookSettingsPage />,
  "/settings/api-key": <ApiKeySettingsPage />,
  "/settings/communication": <BrandChannelsSettingsPage />,
  "/settings/billing": <BillingSettingsPage />,
  "/settings/security": <SecuritySettingsPage />,
  "/settings/notifications": <NotificationSettingsPage />,
  "/settings/integrations": <IntegrationsSettingsPage />,
  "/settings/attributes": <AttributesSettingsPage />,
  "/settings/members": <MembersSettingsPage />,
} satisfies Record<SettingsSidebarPath, ReactNode>

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutSidebar />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          {sidebarMenus
            .filter((menu) => menu.path !== "/settings")
            .map((menu) => (
              <Route
                key={menu.path}
                path={menu.path.replace(/^\//, "")}
                element={
                  routeElements[menu.path] ?? <PageTitle title={menu.title} />
                }
              />
            ))}
          <Route path="settings" element={<SettingsLayout />}>
            <Route index element={<Navigate to="profile" replace />} />
            {settingsSidebarMenu.map((menu) => (
              <Route
                key={menu.path}
                path={menu.path.replace("/settings/", "")}
                element={settingsRouteElements[menu.path]}
              />
            ))}
          </Route>
          <Route path="create-journey" element={<CreateJourneyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
