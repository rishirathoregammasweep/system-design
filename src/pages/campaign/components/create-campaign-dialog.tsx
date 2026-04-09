import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export function CreateCampaignDialog() {
  const [open, setOpen] = useState(false)
  const [subject, setSubject] = useState("")
  const [title, setTitle] = useState("")
  const [emailBody, setEmailBody] = useState("")
  const [smsBody, setSmsBody] = useState("")

  function reset() {
    setSubject("")
    setTitle("")
    setEmailBody("")
    setSmsBody("")
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setOpen(false)
    reset()
  }

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) reset()
  }

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Create campaign
      </Button>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Create campaign</DialogTitle>
              <DialogDescription>
                Choose a channel and compose your message. Push campaigns are
                not available yet.
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="email" type="button">
                  Email
                </TabsTrigger>
                <TabsTrigger value="sms" type="button">
                  SMS
                </TabsTrigger>
                <TabsTrigger value="push" type="button" disabled>
                  Push
                </TabsTrigger>
              </TabsList>
              <TabsContent value="email" className="mt-4 space-y-4">
                <div className="grid gap-2">
                  <label htmlFor="campaign-email-subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="campaign-email-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Email subject line"
                    autoComplete="off"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="campaign-email-title" className="text-sm font-medium">
                    Title
                  </label>
                  <Input
                    id="campaign-email-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Headline or preview title"
                    autoComplete="off"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="campaign-email-body" className="text-sm font-medium">
                    Email body
                  </label>
                  <Textarea
                    id="campaign-email-body"
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    placeholder="Write your email content…"
                    className="min-h-32 resize-y"
                  />
                </div>
              </TabsContent>
              <TabsContent value="sms" className="mt-4">
                <div className="grid gap-2">
                  <label htmlFor="campaign-sms-body" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="campaign-sms-body"
                    value={smsBody}
                    onChange={(e) => setSmsBody(e.target.value)}
                    placeholder="SMS message…"
                    className="min-h-32 resize-y"
                  />
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create campaign</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
