import type { ReactNode } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import LayoutSidebar from "@/components/layouts/sidebar-page-layout"
import { sidebarMenus } from "@/components/layouts/sidebar-menus"
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
import SettingsPage from "@/pages/settings/page"
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
  "/settings": <SettingsPage />,
  "/templates": <TemplatesPage />,
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutSidebar />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          {sidebarMenus.map((menu) => (
            <Route
              key={menu.path}
              path={menu.path.replace(/^\//, "")}
              element={
                routeElements[menu.path] ?? <PageTitle title={menu.title} />
              }
            />
          ))}
          <Route path="create-journey" element={<CreateJourneyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
