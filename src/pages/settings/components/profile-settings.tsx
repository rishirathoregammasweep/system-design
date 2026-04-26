import { useCallback, useRef, useState } from "react"
import { Link } from "react-router-dom"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Separator } from "@/components/ui/separator"
import {
  ArrowRight01Icon,
  PencilEdit02Icon,
  SecurityIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

function FieldHeading({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <div className="space-y-1">
      <h2 className="text-sm font-medium">{title}</h2>
      {description ? (
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  )
}

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
      <span className="text-foreground font-medium">Profile</span>
    </nav>
  )
}

export default function ProfileSettings() {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [firstName, setFirstName] = useState("Rishi")
  const [lastName, setLastName] = useState("Rathore")
  const [email, setEmail] = useState("rishi.idealtechno@gmail.com")
  const [photoUrl, setPhotoUrl] = useState("https://github.com/shadcn.png")
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  const [photoDialogOpen, setPhotoDialogOpen] = useState(false)
  const [emailDialogOpen, setEmailDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [draftPhotoUrl, setDraftPhotoUrl] = useState(photoUrl)
  const [draftEmail, setDraftEmail] = useState(email)

  const initials = [firstName, lastName]
    .map((p) => p.trim()[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const openPhotoDialog = useCallback(() => {
    setDraftPhotoUrl(photoUrl)
    setPhotoDialogOpen(true)
  }, [photoUrl])

  const savePhotoUrl = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const next = draftPhotoUrl.trim()
      if (next) setPhotoUrl(next)
      setPhotoDialogOpen(false)
    },
    [draftPhotoUrl]
  )

  const removePhoto = useCallback(() => {
    setPhotoUrl("")
  }, [])

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      const url = URL.createObjectURL(file)
      setPhotoUrl(url)
      e.target.value = ""
    },
    []
  )

  const openEmailDialog = useCallback(() => {
    setDraftEmail(email)
    setEmailDialogOpen(true)
  }, [email])

  const saveEmail = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      setEmail(draftEmail.trim())
      setEmailDialogOpen(false)
    },
    [draftEmail]
  )

  return (
    <div className="mx-0 max-w-4xl space-y-0 pb-12">
      <Breadcrumb />

      <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>

      <div className="mt-8 space-y-10">
        <section className="space-y-4">
          <FieldHeading title="Picture" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <Avatar className="size-20 shrink-0 rounded-md after:rounded-md">
              {photoUrl ? (
                <AvatarImage
                  src={photoUrl}
                  alt=""
                  className="rounded-md object-cover"
                />
              ) : null}
              <AvatarFallback className="rounded-md text-lg font-medium">
                {initials || "?"}
              </AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/gif"
                  className="sr-only"
                  onChange={onFileChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={removePhoto}
                  disabled={!photoUrl}
                >
                  Remove
                </Button>
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  className="text-muted-foreground h-auto px-2"
                  onClick={openPhotoDialog}
                >
                  Paste URL
                </Button>
              </div>
              <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
                We support your square PNGs, JPGs and GIFs under 10MB.
              </p>
            </div>
          </div>
        </section>

        <Separator />

        <section className="space-y-4">
          <FieldHeading
            title="Name"
            description="Your name as it will be displayed"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="profile-first-name" className="text-sm font-medium">
                First name
              </label>
              <Input
                id="profile-first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="profile-last-name" className="text-sm font-medium">
                Last name
              </label>
              <Input
                id="profile-last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
              />
            </div>
          </div>
        </section>

        <Separator />

        <section className="space-y-4">
          <FieldHeading
            title="Email"
            description="The email associated to your account"
          />
            <Input
              readOnly
              value={email}
              className="cursor-default px-3 py-2"
              aria-readonly
            />
        </section>

        <Separator />

        <section className="space-y-4">
          <FieldHeading
            title="Two Factor Authentication"
            description="Enhances security by requiring a code along with your password"
          />
          <Card className="shadow-none">
            <CardContent className="p-0">
              <button
                type="button"
                className="hover:bg-muted/50 flex w-full items-center gap-4 rounded-lg border border-border px-4 py-3.5 text-left transition-colors"
                onClick={() => setTwoFactorEnabled((v) => !v)}
              >
                <div className="bg-muted flex size-10 shrink-0 items-center justify-center rounded-md">
                  <HugeiconsIcon
                    icon={SecurityIcon}
                    strokeWidth={1.5}
                    className="text-foreground size-5"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">Authenticator App</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {twoFactorEnabled ? (
                    <span className="text-emerald-600 flex items-center gap-2 text-sm">
                      <span className="size-1.5 shrink-0 rounded-full bg-emerald-600" />
                      Active
                    </span>
                  ) : (
                    <span className="text-muted-foreground flex items-center gap-2 text-sm">
                      <span className="bg-muted-foreground/50 size-1.5 shrink-0 rounded-full" />
                      Deactivated
                    </span>
                  )}
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    strokeWidth={2}
                    className="text-muted-foreground size-4"
                  />
                </div>
              </button>
            </CardContent>
          </Card>
        </section>

        <Separator />

        <section className="space-y-4">
          <FieldHeading
            title="Set Password"
            description="Receive an email containing password set link"
          />
          <Button type="button" variant="outline" size="sm">
            Set password
          </Button>
        </section>

        <Separator />

        <section className="space-y-4">
          <FieldHeading
            title="Danger zone"
            description="Delete account and all the associated data"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-destructive/50 text-destructive hover:bg-destructive/5 hover:text-destructive"
            onClick={() => setDeleteDialogOpen(true)}
          >
            Delete account
          </Button>
        </section>
      </div>

      <Dialog open={photoDialogOpen} onOpenChange={setPhotoDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={savePhotoUrl}>
            <DialogHeader>
              <DialogTitle>Profile picture URL</DialogTitle>
              <DialogDescription>
                Paste a direct link to an image. For file uploads, use Upload
                on the main form.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-2 py-2">
              <label htmlFor="profile-photo-url" className="text-sm font-medium">
                Image URL
              </label>
              <Input
                id="profile-photo-url"
                value={draftPhotoUrl}
                onChange={(e) => setDraftPhotoUrl(e.target.value)}
                placeholder="https://"
                type="url"
                autoComplete="off"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setPhotoDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={saveEmail}>
            <DialogHeader>
              <DialogTitle>Edit email</DialogTitle>
              <DialogDescription>
                This address is used for sign-in and important notifications.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-2 py-2">
              <label htmlFor="profile-email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="profile-email"
                type="email"
                value={draftEmail}
                onChange={(e) => setDraftEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setEmailDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete account</DialogTitle>
            <DialogDescription>
              This will permanently remove your account and associated data.
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Delete account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
