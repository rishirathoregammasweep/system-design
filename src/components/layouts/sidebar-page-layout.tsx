import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AvatarGroup } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"
import { useMemo, type CSSProperties, type ReactNode } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { sidebarMenus } from "@/components/layouts/sidebar-menus"
import {
  AddIcon,
  BookOpen01Icon,
  CancelIcon,
  CustomerService01Icon,
  HelpCircleIcon,
  InformationCircleIcon,
  PanelLeft,
  SidebarLeftIcon,
  SparklesIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"
import { settingsSidebarMenu } from "./setting-sidebar-menus"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
function HeaderHelpMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground rounded-full"
          aria-label="Help and documentation"
        >
          <HugeiconsIcon icon={HelpCircleIcon} strokeWidth={2} className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-48">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <HugeiconsIcon
              icon={CustomerService01Icon}
              strokeWidth={2}
              className="size-4 opacity-80"
            />
            Support
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HugeiconsIcon
              icon={BookOpen01Icon}
              strokeWidth={2}
              className="size-4 opacity-80"
            />
            Documentation
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function HeaderAvatar() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className="!rounded-md"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="duration-0">Mode</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={theme}
                  onValueChange={(value) =>
                    setTheme(value as "light" | "dark" | "system")
                  }
                >
                  <DropdownMenuRadioItem value="light">
                    Light
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">
                    Dark
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">
                    System
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>GitHub</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuItem disabled>API</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}

function SidebarMenusOnSmallScreen() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button size={"icon-sm"} variant={"outline"}>
          <HugeiconsIcon icon={SidebarLeftIcon} strokeWidth={2} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-40" align="start">
        {sidebarMenus.map((menu) => (
          <DropdownMenuItem key={menu.path} className="cursor-pointer">
            <HugeiconsIcon icon={menu.icon} strokeWidth={2} />
            {menu.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function FooterAvatar() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className="!rounded-md"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Mode</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={theme}
                  onValueChange={(value) =>
                    setTheme(value as "light" | "dark" | "system")
                  }
                >
                  <DropdownMenuRadioItem value="light">
                    Light
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">
                    Dark
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">
                    System
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>GitHub</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuItem disabled>API</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function PlanBanner() {
  return (
    <Card className="mb-4">
      <CardHeader>
        <AvatarGroup className="mb-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </AvatarGroup>
        <div className="flex items-center gap-2">
          <CardTitle>Growth Plan</CardTitle>
          <Badge variant="outline">Free Plan</Badge>
        </div>
        <CardDescription>You are on the Growth plan. Renews automatically unless cancelled.</CardDescription>
      </CardHeader>
      <CardFooter className="gap-2">
        <Button variant="outline">Go to Plan</Button>
        <Button variant="outline">Dismiss</Button>
      </CardFooter>
    </Card>
  )
}

function OnboardingSectionHeader({
  title,
  infoLabel,
}: {
  title: string
  infoLabel: string
}) {
  return (
    <div className="flex items-center gap-1.5">
      <h3 className="text-sm font-semibold tracking-tight text-foreground">{title}</h3>
      <button
        type="button"
        className="text-muted-foreground hover:text-foreground rounded-full p-0.5 transition-colors"
        aria-label={infoLabel}
      >
        <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={2} className="size-4" />
      </button>
    </div>
  )
}

function OnboardingTaskTrigger({
  completed,
  title,
  badge,
}: {
  completed?: boolean
  title: string
  badge?: ReactNode
}) {
  return (
    <AccordionTrigger
      className={cn(
        "items-center gap-3 px-4 py-3.5 hover:no-underline",
        !completed && "text-muted-foreground"
      )}
    >
      <span className="flex size-8 shrink-0 items-center justify-center">
        {completed ? (
          <span className="flex size-7 items-center justify-center rounded-full bg-emerald-600 text-white dark:bg-emerald-500">
            <HugeiconsIcon icon={Tick02Icon} strokeWidth={2.5} className="size-3.5" />
          </span>
        ) : (
          <HugeiconsIcon
            icon={SparklesIcon}
            strokeWidth={1.5}
            className="size-5 text-muted-foreground"
          />
        )}
      </span>
      <span className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1">
        <span
          className={cn(
            "text-left text-sm font-semibold",
            completed
              ? "text-foreground"
              : "text-muted-foreground group-aria-expanded/accordion-trigger:text-foreground"
          )}
        >
          {title}
        </span>
        {badge}
      </span>
    </AccordionTrigger>
  )
}

const CreateOnboardingConfiguration = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm" className="gap-1.5">
          Store setup
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="!max-w-2xl gap-0 overflow-hidden p-0 sm:!max-w-2xl"
      >
        <div className="max-h-[min(85vh,720px)] overflow-y-auto p-4 sm:p-6">
          <DialogHeader className="sr-only">
            <DialogTitle>Store onboarding checklist</DialogTitle>
            <DialogDescription>
              Complete these steps to set up your online store.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-2">
              <OnboardingSectionHeader
                title="Set-up your online store"
                infoLabel="About setting up your online store"
              />
              <div className="overflow-hidden rounded-xl border border-border bg-background">
                <Accordion
                  type="single"
                  collapsible
                  defaultValue="add-products"
                  className="w-full"
                >
                  <AccordionItem value="add-products" className="border-b border-border last:border-b-0">
                    <OnboardingTaskTrigger
                      completed
                      title="Add products"
                      badge={
                        <Badge
                          variant="outline"
                          className="border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                        >
                          Ready
                        </Badge>
                      }
                    />
                    <AccordionContent className="px-4 pb-4 ps-[3.25rem]">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Add and manage products in your store effortlessly. Control product details,
                        pricing, and inventory levels all in one place. Create categories to keep your
                        products organized and easily accessible.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="pos" className="border-b border-border last:border-b-0">
                    <OnboardingTaskTrigger title="Get the point of sale application" />
                    <AccordionContent className="px-4 pb-4 ps-[3.25rem]">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Download and install the point of sale app to sell in person and keep orders in
                        sync with your online catalog.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="price-stock" className="border-b border-border last:border-b-0">
                    <OnboardingTaskTrigger title="Product price & stock" />
                    <AccordionContent className="px-4 pb-4 ps-[3.25rem]">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Configure pricing rules and stock levels so customers always see accurate
                        availability.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            <div className="space-y-2">
              <OnboardingSectionHeader
                title="Store settings"
                infoLabel="About store settings"
              />
              <div className="overflow-hidden rounded-xl border border-border bg-background">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="storefront" className="border-0">
                    <OnboardingTaskTrigger title="Customize your store-front" />
                    <AccordionContent className="px-4 pb-4 ps-[3.25rem]">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Adjust themes, navigation, and branding so your storefront matches your brand.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            <div className="space-y-2">
              <OnboardingSectionHeader
                title="Prepare for launch"
                infoLabel="About launch preparation"
              />
              <div className="overflow-hidden rounded-xl border border-border bg-background">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="shipping" className="border-b border-border last:border-b-0">
                    <OnboardingTaskTrigger title="Set up shipping options" />
                    <AccordionContent className="px-4 pb-4 ps-[3.25rem]">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Define shipping zones, rates, and carriers before you start taking orders.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="tax" className="border-b border-border last:border-b-0">
                    <OnboardingTaskTrigger title="Configure tax settings" />
                    <AccordionContent className="px-4 pb-4 ps-[3.25rem]">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Set tax rates and rules to stay compliant in the regions you sell into.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-muted/40 p-4 dark:bg-muted/20">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-foreground">Boost your online presence</span>
                <Badge className="border-0 bg-violet-600 px-2 text-[0.65rem] font-semibold uppercase tracking-wide text-white hover:bg-violet-600">
                  PRO
                </Badge>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Take your e-commerce business to the next level with advanced features designed to
                increase sales and improve customer experience.
              </p>
              <div className="mt-4">
                <Button type="button" size="sm" className="bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white">
                  Upgrade
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function LayoutSidebar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const pageMeta = useMemo(() => {
    if (pathname === "/templates/new") {
      return {
        heading: "Create email template",
        description:
          "Define a name, subject line, and HTML body for your email template.",
      }
    }
    const settingsItem = settingsSidebarMenu.find((m) => m.path === pathname)
    if (settingsItem) {
      return {
        heading: settingsItem.heading,
        description: settingsItem.description,
      }
    }
    const item = sidebarMenus.find((m) => m.path === pathname)
    if (item) {
      return { heading: item.heading, description: item.description }
    }
    return { heading: "Page", description: "" }
  }, [pathname])

  const isSettings = pathname.startsWith("/settings")
  const layoutColumns = isSettings
    ? "minmax(0, 2fr) minmax(0, 4fr)"
    : "minmax(0, 1fr) minmax(0, 5fr)"

  return (
    <div
      className={cn(
        "grid h-screen w-full grid-cols-1 items-stretch bg-neutral-50/40 p-0 dark:bg-neutral-900/40 md:items-center md:p-2 md:[grid-template-columns:var(--layout-cols)] md:transition-[grid-template-columns] md:duration-300 md:ease-out"
      )}
      style={{ "--layout-cols": layoutColumns } as CSSProperties}
    >
      <div className="hidden w-full md:col-span-1 md:flex md:h-full">
        <div className="relative h-full w-full">
          <div
            className={cn(
              "absolute inset-0 flex h-full w-full flex-col justify-between p-4 transition-all duration-300 ease-out",
              isSettings
                ? "pointer-events-none translate-x-4 opacity-0"
                : "pointer-events-auto translate-x-0 opacity-100"
            )}
          >
            <div className="w-full space-y-8">
              <div className="flex w-full items-center justify-between gap-2">
                <div className="max-w-10 overflow-hidden opacity-100">
                  <svg
                    className="shrink-0"
                    fill="none"
                    height="48"
                    viewBox="0 0 35 48"
                    width="35"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipRule="evenodd" fill="#2563eb" fillRule="evenodd">
                      <path d="m34.6416 14v8.0492h-9.9697v-2.2927z" />
                      <path
                        d="m34.6394 14.0001-9.9697 5.7565-7.3513-4.2436v-11.513z"
                        opacity=".9"
                      />
                      <path
                        d="m17.3207 4v11.513l-7.34902 4.2436-9.96972688-5.7565z"
                        opacity=".8"
                      />
                      <path
                        d="m9.96973 19.7565v8.4868l-9.96973 5.756v-19.9993z"
                        opacity=".7"
                      />
                      <path
                        d="m17.3187 32.4871v11.5129l-17.3187-10.0006 9.96973-5.756z"
                        opacity=".6"
                      />
                      <path
                        d="m34.6394 33.9994-17.321 10.0006v-11.5129l7.3513-4.2437z"
                        opacity=".5"
                      />
                      <path
                        d="m34.6416 25.9507v8.0487l-9.9697-5.756v-2.2927z"
                        opacity=".4"
                      />
                    </g>
                  </svg>
                </div>
                <div className="flex items-center gap-2">
                  <div className=" overflow-hidden opacity-100 flex items-center gap-2">
                    <Button variant={"secondary"} size={"icon-lg"} className="rounded-full">
                      <HugeiconsIcon icon={PanelLeft} strokeWidth={2} />
                    </Button>
                    <Button variant={"secondary"} size={"icon-lg"} className="rounded-full">
                      <HugeiconsIcon icon={AddIcon} strokeWidth={2} />
                    </Button>
                  </div>
                </div>
              </div>
              <nav className="space-y-4">
                {sidebarMenus.map((menu) => (
                  <NavLink
                    key={menu.path}
                    to={menu.path}
                    className={({ isActive }) =>
                      cn(
                        "flex cursor-pointer items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-0 duration-0",
                        isActive ||
                          (menu.path === "/settings" &&
                            pathname.startsWith("/settings"))
                          ? "opacity-100"
                          : "opacity-50 hover:opacity-100"
                      )
                    }
                  >
                    <HugeiconsIcon strokeWidth={1.5} icon={menu.icon} />
                    <div className="max-w-36 overflow-hidden opacity-100">
                      <CardTitle className="scroll-m-20 text-md font-semibold tracking-tight">
                        {menu.title}
                      </CardTitle>
                    </div>
                  </NavLink>
                ))}
              </nav>
            </div>
            <div className="flex gap-2 flex-col">
              <PlanBanner />
              <div className="flex items-center gap-2">
                <FooterAvatar />
              </div>
            </div>
          </div>

          <div
            className={cn(
              "bg-muted/30 absolute inset-0 flex h-full w-full flex-col items-end justify-between px-4 py-6 transition-all duration-300 ease-out dark:bg-muted/10",
              isSettings
                ? "pointer-events-auto translate-x-0 opacity-100"
                : "pointer-events-none -translate-x-4 opacity-0"
            )}
          >
            <div className="ms-auto flex h-full w-max min-w-0 max-w-full flex-col justify-between">
              <div className="space-y-8">
                <Button
                  variant="secondary"
                  size="sm"
                  className="gap-2"
                  onClick={() => navigate('/')}
                >
                  <HugeiconsIcon icon={CancelIcon} strokeWidth={2} />
                  Exit settings
                </Button>
                <nav className="space-y-3" aria-label="Settings sections">
                  {settingsSidebarMenu.map((menu) => (
                    <NavLink
                      key={menu.path}
                      to={menu.path}
                      className={({ isActive }) =>
                        cn(
                          "flex cursor-pointer items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-0 duration-0",
                          isActive ? "opacity-100" : "opacity-50 hover:opacity-100"
                        )
                      }
                    >
                      <HugeiconsIcon strokeWidth={1.5} size={20} icon={menu.icon} />
                      <CardTitle className="scroll-m-20 text-sm font-semibold tracking-tight">
                        {menu.title}
                      </CardTitle>
                    </NavLink>
                  ))}
                </nav>
              </div>
              <div className="flex items-center gap-2 self-end">
                <FooterAvatar />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "col-span-1 flex h-full min-h-0 w-full flex-col overflow-hidden rounded-none bg-white dark:bg-neutral-900 md:col-span-1 md:rounded-lg md:shadow"
        )}
      >
        <div className="flex min-h-0 flex-1 flex-col overflow-auto">
          {pathname !== "/create-journey" ? (
            <header className="flex items-start justify-between gap-6 px-8 py-6">
              <div className="flex items-start gap-2">
                <span className="md:hidden">
                  <SidebarMenusOnSmallScreen />
                </span>
                <div className="min-w-0 space-y-1">
                  <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    {pageMeta.heading}
                  </h1>
                  {pageMeta.description ? (
                    <p className="text-muted-foreground text-md dark:text-muted-foreground leading-7 ">
                      {pageMeta.description}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1 pt-0.5">
                <CreateOnboardingConfiguration />
                <HeaderHelpMenu />
                <HeaderAvatar />
              </div>
            </header>
          ) : null}
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default LayoutSidebar
