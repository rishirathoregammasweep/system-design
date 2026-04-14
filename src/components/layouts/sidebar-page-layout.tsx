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
import { useMemo } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { NavLink, Outlet, useLocation } from "react-router-dom"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { sidebarMenus } from "@/components/layouts/sidebar-menus"
import {
  BookOpen01Icon,
  CustomerService01Icon,
  HelpCircleIcon,
  SidebarLeftIcon,
} from "@hugeicons/core-free-icons"

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

export function LayoutSidebar() {
  const { pathname } = useLocation()

  const pageMeta = useMemo(() => {
    if (pathname === "/templates/new") {
      return {
        heading: "Create email template",
        description:
          "Define a name, subject line, and HTML body for your email template.",
      }
    }
    const item = sidebarMenus.find((m) => m.path === pathname)
    if (item) {
      return { heading: item.heading, description: item.description }
    }
    return { heading: "Page", description: "" }
  }, [pathname])

  return (
    <div className="grid h-screen grid-cols-6 items-center bg-neutral-50/40 p-0 md:p-2 dark:bg-neutral-900/40">
      <div className="hidden md:col-span-1 md:flex md:h-full md:flex-col md:justify-between md:p-4">
        <div className="space-y-8">
          <div>
            <svg
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
          <nav className="space-y-4">
            {sidebarMenus.map((menu) => (
              <NavLink
                key={menu.path}
                to={menu.path}
                className={({ isActive }) =>
                  [
                    "flex cursor-pointer items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-0 duration-0  ",
                    isActive
                      ? "opacity-100"
                      : "opacity-50 hover:opacity-100",
                  ].join(" ")
                }
              >
                <HugeiconsIcon strokeWidth={1.5} icon={menu.icon} />
                <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                  {menu.title}
                </h4>
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <FooterAvatar />
        </div>
      </div>
      <div className="col-span-6 flex h-full w-full min-h-0 flex-col overflow-hidden rounded-none bg-white dark:bg-neutral-900 md:col-span-5 md:rounded-lg md:shadow">
        <div className="min-h-0 flex-1 overflow-auto">
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
