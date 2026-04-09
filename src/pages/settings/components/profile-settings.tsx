import { useCallback, useState, type ReactNode } from "react"

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
import { Textarea } from "@/components/ui/textarea"
import { Tick02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

type SectionId =
  | "profileUrl"
  | "photo"
  | "fullName"
  | "emails"
  | "taxId"
  | "address"
  | "xero"

function ProfileSection({
  title,
  description,
  children,
  action,
}: {
  title: string
  description?: string
  children: ReactNode
  action: ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-border py-6 last:border-b-0 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
      <div className="min-w-0 shrink-0 sm:max-w-xs">
        <p className="text-sm font-medium">{title}</p>
        {description ? (
          <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
            {description}
          </p>
        ) : null}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-6">
        <div className="min-w-0 flex-1 text-sm sm:text-end">{children}</div>
        <div className="shrink-0 sm:w-20 sm:text-end">{action}</div>
      </div>
    </div>
  )
}

export default function ProfileSettings() {
  const [open, setOpen] = useState<SectionId | null>(null)

  const [profileUrl, setProfileUrl] = useState("untitledui.com/caitlyn")
  const [photoUrl, setPhotoUrl] = useState("https://github.com/shadcn.png")
  const [fullName, setFullName] = useState("Caitlyn Edwards")
  const [emails, setEmails] = useState([
    "caitlyn@untitledui.com",
    "c.edwards@gmail.com",
  ])
  const [taxId, setTaxId] = useState("65 655 466 729")
  const [address, setAddress] = useState(
    "100 Smith Street, Collingwood VIC 3066, AUSTRALIA"
  )
  const [xeroEmail, setXeroEmail] = useState("hello@untitledui.com")

  const [draftProfileUrl, setDraftProfileUrl] = useState(profileUrl)
  const [draftPhotoUrl, setDraftPhotoUrl] = useState(photoUrl)
  const [draftFullName, setDraftFullName] = useState(fullName)
  const [draftEmails, setDraftEmails] = useState(emails.join("\n"))
  const [draftTaxId, setDraftTaxId] = useState(taxId)
  const [draftAddress, setDraftAddress] = useState(address)
  const [draftXeroEmail, setDraftXeroEmail] = useState(xeroEmail)

  const beginEdit = useCallback(
    (id: SectionId) => {
      setDraftProfileUrl(profileUrl)
      setDraftPhotoUrl(photoUrl)
      setDraftFullName(fullName)
      setDraftEmails(emails.join("\n"))
      setDraftTaxId(taxId)
      setDraftAddress(address)
      setDraftXeroEmail(xeroEmail)
      setOpen(id)
    },
    [address, emails, fullName, photoUrl, profileUrl, taxId, xeroEmail]
  )

  function handleOpenChange(next: boolean) {
    if (!next) setOpen(null)
  }

  function saveProfileUrl(e: React.FormEvent) {
    e.preventDefault()
    setProfileUrl(draftProfileUrl.trim())
    setOpen(null)
  }

  function savePhoto(e: React.FormEvent) {
    e.preventDefault()
    const next = draftPhotoUrl.trim()
    if (next) setPhotoUrl(next)
    setOpen(null)
  }

  function clearPhoto() {
    setPhotoUrl("")
    setDraftPhotoUrl("")
  }

  function saveFullName(e: React.FormEvent) {
    e.preventDefault()
    setFullName(draftFullName.trim())
    setOpen(null)
  }

  function saveEmails(e: React.FormEvent) {
    e.preventDefault()
    const parsed = draftEmails
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter(Boolean)
    setEmails(parsed.length ? parsed : emails)
    setOpen(null)
  }

  function saveTaxId(e: React.FormEvent) {
    e.preventDefault()
    setTaxId(draftTaxId.trim())
    setOpen(null)
  }

  function saveAddress(e: React.FormEvent) {
    e.preventDefault()
    setAddress(draftAddress.trim())
    setOpen(null)
  }

  function saveXero(e: React.FormEvent) {
    e.preventDefault()
    setXeroEmail(draftXeroEmail.trim())
    setOpen(null)
  }

  return (
    <>
      <Card className="rounded-none shadow-none ring-0 mx-start !p-0 max-w-5xl">
        <CardContent className="px-0">
          <div className="">
            <ProfileSection
              title="Profile"
              action={
                <Button
                  type="button"
                  variant="link"
                  className="text-primary h-auto p-0"
                  onClick={() => beginEdit("profileUrl")}
                >
                  Edit
                </Button>
              }
            >
              <span className="text-foreground break-all">{profileUrl}</span>
            </ProfileSection>

            <ProfileSection
              title="Photo"
              description="This will be displayed on your profile."
              action={
                <div className="flex flex-wrap items-center justify-end gap-2 sm:justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={clearPhoto}
                  >
                    Delete
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => beginEdit("photo")}
                  >
                    Upload
                  </Button>
                </div>
              }
            >
              <Avatar size="lg" className="size-14">
                {photoUrl ? (
                  <AvatarImage src={photoUrl} alt="" />
                ) : null}
                <AvatarFallback className="text-lg">
                  {fullName
                    .split(/\s+/)
                    .map((p) => p[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </ProfileSection>

            <ProfileSection
              title="Full name"
              description="This will be displayed on your profile."
              action={
                <Button
                  type="button"
                  variant="link"
                  className="text-primary h-auto p-0"
                  onClick={() => beginEdit("fullName")}
                >
                  Edit
                </Button>
              }
            >
              {fullName}
            </ProfileSection>

            <ProfileSection
              title="Contact email"
              description="Add at least one contact email."
              action={
                <Button
                  type="button"
                  variant="link"
                  className="text-primary h-auto p-0"
                  onClick={() => beginEdit("emails")}
                >
                  Edit
                </Button>
              }
            >
              <ul className="space-y-1 text-end sm:text-end">
                {emails.map((m) => (
                  <li key={m} className="break-all">
                    {m}
                  </li>
                ))}
              </ul>
            </ProfileSection>

            <ProfileSection
              title="Business tax ID"
              action={
                <Button
                  type="button"
                  variant="link"
                  className="text-primary h-auto p-0"
                  onClick={() => beginEdit("taxId")}
                >
                  Edit
                </Button>
              }
            >
              <span className="inline-flex items-center gap-2">
                {taxId}
                <HugeiconsIcon
                  icon={Tick02Icon}
                  className="text-primary size-4 shrink-0"
                  strokeWidth={2}
                />
              </span>
            </ProfileSection>

            <ProfileSection
              title="Business address"
              action={
                <Button
                  type="button"
                  variant="link"
                  className="text-primary h-auto p-0"
                  onClick={() => beginEdit("address")}
                >
                  Edit
                </Button>
              }
            >
              <span className="whitespace-pre-wrap">{address}</span>
            </ProfileSection>

            <ProfileSection
              title="Full name"
              description="This will be displayed on your profile."
              action={
                <Button
                  type="button"
                  variant="link"
                  className="text-primary h-auto p-0"
                  onClick={() => beginEdit("fullName")}
                >
                  Edit
                </Button>
              }
            >
              {fullName}
            </ProfileSection>

            <ProfileSection
              title="Contact email"
              description="Add at least one contact email."
              action={
                <Button
                  type="button"
                  variant="link"
                  className="text-primary h-auto p-0"
                  onClick={() => beginEdit("emails")}
                >
                  Edit
                </Button>
              }
            >
              <ul className="space-y-1 text-end sm:text-end">
                {emails.map((m) => (
                  <li key={m} className="break-all">
                    {m}
                  </li>
                ))}
              </ul>
            </ProfileSection>

            <ProfileSection
              title="Business tax ID"
              action={
                <Button
                  type="button"
                  variant="link"
                  className="text-primary h-auto p-0"
                  onClick={() => beginEdit("taxId")}
                >
                  Edit
                </Button>
              }
            >
              <span className="inline-flex items-center gap-2">
                {taxId}
                <HugeiconsIcon
                  icon={Tick02Icon}
                  className="text-primary size-4 shrink-0"
                  strokeWidth={2}
                />
              </span>
            </ProfileSection>

            <ProfileSection
              title="Business address"
              action={
                <Button
                  type="button"
                  variant="link"
                  className="text-primary h-auto p-0"
                  onClick={() => beginEdit("address")}
                >
                  Edit
                </Button>
              }
            >
              <span className="whitespace-pre-wrap">{address}</span>
            </ProfileSection>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open !== null} onOpenChange={handleOpenChange}>
        <DialogContent
          key={open ?? "closed"}
          className="sm:max-w-md"
        >
          {open === "profileUrl" ? (
            <form onSubmit={saveProfileUrl}>
              <DialogHeader>
                <DialogTitle>Edit profile URL</DialogTitle>
                <DialogDescription>
                  Public path for your workspace profile.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-2 py-2">
                <label htmlFor="profile-url" className="text-sm font-medium">
                  Profile URL
                </label>
                <Input
                  id="profile-url"
                  value={draftProfileUrl}
                  onChange={(e) => setDraftProfileUrl(e.target.value)}
                  placeholder="example.com/your-slug"
                  autoComplete="off"
                />
              </div>
              <DialogFooter>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          ) : null}

          {open === "photo" ? (
            <form onSubmit={savePhoto}>
              <DialogHeader>
                <DialogTitle>Profile photo</DialogTitle>
                <DialogDescription>
                  Paste an image URL. You can replace this with file upload
                  when your backend is ready.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-2 py-2">
                <label htmlFor="photo-url" className="text-sm font-medium">
                  Image URL
                </label>
                <Input
                  id="photo-url"
                  value={draftPhotoUrl}
                  onChange={(e) => setDraftPhotoUrl(e.target.value)}
                  placeholder="https://"
                  type="url"
                  autoComplete="off"
                />
              </div>
              <DialogFooter>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          ) : null}

          {open === "fullName" ? (
            <form onSubmit={saveFullName}>
              <DialogHeader>
                <DialogTitle>Edit full name</DialogTitle>
                <DialogDescription>
                  Shown on your profile and in account emails.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-2 py-2">
                <label htmlFor="full-name" className="text-sm font-medium">
                  Full name
                </label>
                <Input
                  id="full-name"
                  value={draftFullName}
                  onChange={(e) => setDraftFullName(e.target.value)}
                  autoComplete="name"
                />
              </div>
              <DialogFooter>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          ) : null}

          {open === "emails" ? (
            <form onSubmit={saveEmails}>
              <DialogHeader>
                <DialogTitle>Contact emails</DialogTitle>
                <DialogDescription>
                  One address per line, or separate with commas.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-2 py-2">
                <label htmlFor="emails" className="text-sm font-medium">
                  Email addresses
                </label>
                <Textarea
                  id="emails"
                  value={draftEmails}
                  onChange={(e) => setDraftEmails(e.target.value)}
                  rows={4}
                  className="min-h-[100px] resize-y"
                  placeholder="you@company.com"
                />
              </div>
              <DialogFooter>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          ) : null}

          {open === "taxId" ? (
            <form onSubmit={saveTaxId}>
              <DialogHeader>
                <DialogTitle>Business tax ID</DialogTitle>
                <DialogDescription>
                  Used on invoices and tax documents.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-2 py-2">
                <label htmlFor="tax-id" className="text-sm font-medium">
                  Tax ID
                </label>
                <Input
                  id="tax-id"
                  value={draftTaxId}
                  onChange={(e) => setDraftTaxId(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <DialogFooter>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          ) : null}

          {open === "address" ? (
            <form onSubmit={saveAddress}>
              <DialogHeader>
                <DialogTitle>Business address</DialogTitle>
                <DialogDescription>
                  Legal or primary business address for billing and compliance.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-2 py-2">
                <label htmlFor="address" className="text-sm font-medium">
                  Address
                </label>
                <Textarea
                  id="address"
                  value={draftAddress}
                  onChange={(e) => setDraftAddress(e.target.value)}
                  rows={4}
                  className="min-h-[100px] resize-y"
                />
              </div>
              <DialogFooter>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          ) : null}

          {open === "xero" ? (
            <form onSubmit={saveXero}>
              <DialogHeader>
                <DialogTitle>Xero integration</DialogTitle>
                <DialogDescription>
                  Connected account email. Use your Xero dashboard for full
                  connection settings.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-2 py-2">
                <label htmlFor="xero-email" className="text-sm font-medium">
                  Connected email
                </label>
                <Input
                  id="xero-email"
                  type="email"
                  value={draftXeroEmail}
                  onChange={(e) => setDraftXeroEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              <DialogFooter>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}
