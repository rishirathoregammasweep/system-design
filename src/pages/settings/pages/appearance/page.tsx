import { useTheme } from "@/components/theme-provider"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Tick02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Link } from "react-router-dom"

function Breadcrumb() {
  return (
    <nav
      aria-label="Breadcrumb"
      className="text-muted-foreground mb-6 flex flex-wrap items-center gap-1.5 text-sm"
    >
      <Link
        to="/settings/profile"
        className="hover:text-foreground transition-colors"
      >
        User
      </Link>
      <span aria-hidden className="text-muted-foreground/80">
        /
      </span>
      <span className="text-foreground font-medium">Appearance</span>
    </nav>
  )
}

function ThemePreviewLight({ selected }: { selected: boolean }) {
  return (
    <div className="rounded-md bg-neutral-200/90 p-1.5 dark:bg-neutral-700/50">
      <div className="relative aspect-[4/3] rounded-md bg-white shadow-sm ring-1 ring-black/5">
        <span className="absolute left-2 top-2 text-lg font-semibold tracking-tight text-violet-600">
          Aa
        </span>
        {selected ? (
          <div
            className="absolute bottom-1.5 right-1.5 flex size-5 items-center justify-center rounded-full bg-violet-600 text-white shadow"
            aria-hidden
          >
            <HugeiconsIcon icon={Tick02Icon} strokeWidth={2.5} className="size-3" />
          </div>
        ) : null}
      </div>
    </div>
  )
}

function ThemePreviewDark({ selected }: { selected: boolean }) {
  return (
    <div className="rounded-md bg-neutral-800 p-1.5">
      <div className="relative aspect-[4/3] rounded-md bg-neutral-950 shadow-inner ring-1 ring-white/10">
        <span className="absolute left-2 top-2 text-lg font-semibold tracking-tight text-white">
          Aa
        </span>
        {selected ? (
          <div
            className="absolute bottom-1.5 right-1.5 flex size-5 items-center justify-center rounded-full bg-violet-500 text-white shadow"
            aria-hidden
          >
            <HugeiconsIcon icon={Tick02Icon} strokeWidth={2.5} className="size-3" />
          </div>
        ) : null}
      </div>
    </div>
  )
}

function ThemePreviewSystem({ selected }: { selected: boolean }) {
  return (
    <div className="relative flex overflow-hidden rounded-md bg-neutral-200/90 ring-1 ring-black/5 dark:bg-neutral-700/50">
      <div className="relative flex-1 p-1.5">
        <div className="relative aspect-[4/3] rounded-l-sm rounded-r-none bg-white shadow-sm">
          <span className="absolute left-1.5 top-1.5 text-sm font-semibold text-neutral-900">
            Aa
          </span>
        </div>
      </div>
      <div className="relative flex-1 p-1.5">
        <div className="relative aspect-[4/3] rounded-l-none rounded-r-sm bg-neutral-950 ring-1 ring-white/10">
          <span className="absolute left-1.5 top-1.5 text-sm font-semibold text-white">
            Aa
          </span>
        </div>
      </div>
      {selected ? (
        <div
          className="pointer-events-none absolute inset-0 flex items-end justify-end p-2"
          aria-hidden
        >
          <div className="flex size-5 items-center justify-center rounded-full bg-violet-600 text-white shadow">
            <HugeiconsIcon icon={Tick02Icon} strokeWidth={2.5} className="size-3" />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default function AppearanceSettingsPage() {

  return (
    <div className="mx-0 max-w-4xl space-y-10 pb-12">
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-sm font-medium">Language</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Select your preferred language
          </p>
        </div>
        <Select defaultValue="en">
          <SelectTrigger size="default" className="h-10 w-full max-w-xl rounded-lg">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent position="popper" className="min-w-[var(--radix-select-trigger-width)]">
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
          </SelectContent>
        </Select>
      </section>

      <Separator />

      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-sm font-medium">Formats</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Configure date, time, number, timezone, and calendar start day
          </p>
        </div>

        <div className="max-w-xl space-y-5">
          <div className="space-y-2">
            <label className="text-muted-foreground text-xs font-medium" htmlFor="tz">
              Time zone
            </label>
            <Select defaultValue="ist">
              <SelectTrigger id="tz" className="h-10 w-full rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" className="min-w-[var(--radix-select-trigger-width)]">
                <SelectItem value="ist">
                  System settings · (GMT+05:30) India Standard Time — Kolkata
                </SelectItem>
                <SelectItem value="utc">UTC</SelectItem>
                <SelectItem value="est">Eastern Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-muted-foreground text-xs font-medium" htmlFor="df">
              Date format
            </label>
            <Select defaultValue="sys-date">
              <SelectTrigger id="df" className="h-10 w-full rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" className="min-w-[var(--radix-select-trigger-width)]">
                <SelectItem value="sys-date">System settings · Apr 26, 2026</SelectItem>
                <SelectItem value="iso">2026-04-26</SelectItem>
                <SelectItem value="eu">26/04/2026</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-muted-foreground text-xs font-medium" htmlFor="tf">
              Time format
            </label>
            <Select defaultValue="sys-time">
              <SelectTrigger id="tf" className="h-10 w-full rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" className="min-w-[var(--radix-select-trigger-width)]">
                <SelectItem value="sys-time">System settings · 5:08 PM</SelectItem>
                <SelectItem value="24">17:08</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-muted-foreground text-xs font-medium" htmlFor="nf">
              Number format
            </label>
            <Select defaultValue="sys-num">
              <SelectTrigger id="nf" className="h-10 w-full rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" className="min-w-[var(--radix-select-trigger-width)]">
                <SelectItem value="sys-num">System settings · 1,234.56</SelectItem>
                <SelectItem value="eu-num">1.234,56</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-muted-foreground text-xs font-medium" htmlFor="csd">
              Calendar start day
            </label>
            <Select defaultValue="sun">
              <SelectTrigger id="csd" className="h-10 w-full rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" className="min-w-[var(--radix-select-trigger-width)]">
                <SelectItem value="sun">System settings · Sunday</SelectItem>
                <SelectItem value="mon">Monday</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>
    </div>
  )
}
