import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

type OnboardingTab = 'workspace' | 'channel' | 'api-keys';

const TAB_ORDER: OnboardingTab[] = ['workspace', 'channel', 'api-keys'];

/** Same options as `NewCasinoWizardModal` step 1 */
const WORKSPACE_TIMEZONES = [
  'UTC',
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Asia/Tokyo',
  'Australia/Sydney',
];

const WORKSPACE_CURRENCIES = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
  { value: 'CAD', label: 'CAD' },
  { value: 'AUD', label: 'AUD' },
];

const inputFieldsGroupClass = 'gap-5 w-1/2 max-w-full min-w-0 self-start';

const channelFieldLabelClass = cn(
  'flex items-center gap-2 text-sm leading-none font-medium select-none',
  'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
);

function OnboardingChannelTabContent() {
  const [resendActive, setResendActive] = useState(false);
  const [twilioActive, setTwilioActive] = useState(false);
  const [resend, setResend] = useState({ api_key: '', from_address: '' });
  const [twilio, setTwilio] = useState({
    account_sid: '',
    auth_token: '',
    from_number: '',
  });

  return (
    <FieldGroup>
      <FieldSet className="gap-6">
        <FieldLegend variant="legend">Channel</FieldLegend>
        <FieldDescription>
          Configure email via Resend or SendGrid and SMS via Twilio. You can refine credentials later
          in Settings — saved keys are applied when onboarding completes.
        </FieldDescription>

        <div className="flex max-w-lg flex-col gap-6">
          <FieldGroup>
            <FieldSet>
              <FieldLegend className="flex w-full items-center justify-between gap-4">
                <span className="min-w-0">Resend</span>
                <Switch
                  id="onboarding-settings-resend-active"
                  checked={resendActive}
                  onCheckedChange={setResendActive}
                  aria-label="Use Resend for outbound email"
                  className="shrink-0"
                />
              </FieldLegend>
              <FieldDescription>
                Email channel when provider is Resend. Stored API keys are not shown after save; leave
                the key blank and save to keep the existing one. You can store SendGrid as well and
                switch the active provider below.
              </FieldDescription>
              <FieldGroup>
                <Field>
                  <label htmlFor="onboarding-channel-resend-api-key" className={channelFieldLabelClass}>
                    API key
                  </label>
                  <Input
                    id="onboarding-channel-resend-api-key"
                    type="text"
                    autoComplete="new-password"
                    spellCheck={false}
                    placeholder="re_…"
                    value={resend.api_key}
                    onChange={(e) => setResend((s) => ({ ...s, api_key: e.target.value }))}
                  />
                </Field>
                <Field>
                  <label htmlFor="onboarding-channel-resend-from" className={channelFieldLabelClass}>
                    From address
                  </label>
                  <Input
                    id="onboarding-channel-resend-from"
                    type="text"
                    inputMode="email"
                    autoComplete="off"
                    placeholder="notifications@yourdomain.com"
                    value={resend.from_address}
                    onChange={(e) => setResend((s) => ({ ...s, from_address: e.target.value }))}
                  />
                  <FieldDescription>Verified sender in Resend.</FieldDescription>
                </Field>
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
          
          <FieldGroup>
            <FieldSet>
              <FieldLegend className="flex w-full items-center justify-between gap-4">
                <span className="min-w-0">Twilio</span>
                <Switch
                  id="onboarding-settings-twilio-active"
                  checked={twilioActive}
                  onCheckedChange={setTwilioActive}
                  aria-label="Use Twilio for SMS delivery"
                  className="shrink-0"
                />
              </FieldLegend>
              <FieldDescription>
                SMS (Twilio). Stored auth tokens are not shown after save; leave blank and save to keep
                the existing token.
              </FieldDescription>
              <FieldGroup>
                <Field>
                  <label htmlFor="onboarding-channel-twilio-account-sid" className={channelFieldLabelClass}>
                    Account SID
                  </label>
                  <Input
                    id="onboarding-channel-twilio-account-sid"
                    type="text"
                    autoComplete="off"
                    spellCheck={false}
                    placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    value={twilio.account_sid}
                    onChange={(e) => setTwilio((s) => ({ ...s, account_sid: e.target.value }))}
                  />
                </Field>
                <Field>
                  <label htmlFor="onboarding-channel-twilio-auth-token" className={channelFieldLabelClass}>
                    Auth token
                  </label>
                  <Input
                    id="onboarding-channel-twilio-auth-token"
                    type="text"
                    autoComplete="new-password"
                    spellCheck={false}
                    placeholder="32-character hex token"
                    value={twilio.auth_token}
                    onChange={(e) => setTwilio((s) => ({ ...s, auth_token: e.target.value }))}
                  />
                </Field>
                <Field>
                  <label htmlFor="onboarding-channel-twilio-from" className={channelFieldLabelClass}>
                    From number
                  </label>
                  <Input
                    id="onboarding-channel-twilio-from"
                    type="text"
                    inputMode="tel"
                    autoComplete="off"
                    placeholder="+15551234567"
                    value={twilio.from_number}
                    onChange={(e) => setTwilio((s) => ({ ...s, from_number: e.target.value }))}
                  />
                  <FieldDescription>E.164 phone number.</FieldDescription>
                </Field>
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </div>
      </FieldSet>
    </FieldGroup>
  );
}

function tabTriggerCompleteClass(complete: boolean | undefined) {
  return complete
    ? 'text-emerald-600 dark:text-emerald-400 data-active:text-emerald-700 dark:data-active:text-emerald-300'
    : undefined;
}

function OnboardingTabTrigger({
  value,
  complete,
  children,
}: {
  value: OnboardingTab;
  complete?: boolean;
  children: ReactNode;
}) {
  return (
    <TabsTrigger value={value} className={cn(tabTriggerCompleteClass(complete))}>
      <span className="inline-flex items-center gap-1.5">
        {complete ? (
          <Check className="size-4 shrink-0 stroke-[2.5]" aria-hidden />
        ) : null}
        {children}
      </span>
    </TabsTrigger>
  );
}

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<OnboardingTab>('workspace');
  const [completedSteps, setCompletedSteps] = useState<Partial<Record<OnboardingTab, boolean>>>({});
  const [workspace, setWorkspace] = useState({
    name: '',
    slug: '',
    timezone: 'UTC',
    currency: 'USD',
    plan: 'starter',
  });

  const tabIndex = TAB_ORDER.indexOf(tab);
  const showSkip = tab === 'channel' || tab === 'api-keys';

  function markStepComplete(step: OnboardingTab) {
    setCompletedSteps((prev) => ({ ...prev, [step]: true }));
  }

  function goNext() {
    if (tab === 'api-keys') {
      markStepComplete('api-keys');
      navigate('/');
      return;
    }
    markStepComplete(tab);
    setTab(TAB_ORDER[tabIndex + 1]!);
  }

  function goSkip() {
    if (tab === 'channel') {
      setTab('api-keys');
      return;
    }
    if (tab === 'api-keys') {
      navigate('/');
    }
  }

  return (
    <div className="grid min-h-screen h-screen w-full grid-cols-2 bg-background">
      <div className="flex min-h-0 min-w-0 flex-col overflow-hidden p-8 lg:p-12">
        <Tabs
          value={tab}
          onValueChange={(value: string) => setTab(value as OnboardingTab)}
          className="flex min-h-0 flex-1 flex-col gap-6"
        >
          <TabsList className="h-auto shrink-0 flex-wrap justify-start gap-1 p-[3px]">
            <OnboardingTabTrigger value="workspace" complete={completedSteps.workspace}>
              Workspace
            </OnboardingTabTrigger>
            <OnboardingTabTrigger value="channel" complete={completedSteps.channel}>
              Channel
            </OnboardingTabTrigger>
            <OnboardingTabTrigger value="api-keys" complete={completedSteps['api-keys']}>
              API Keys
            </OnboardingTabTrigger>
          </TabsList>

          <div className="min-h-0 flex-1 overflow-y-auto">
            <TabsContent value="workspace" className="mt-0 outline-none">
            <FieldGroup>
              <FieldSet className="gap-6">
                <FieldLegend variant="legend">Workspace</FieldLegend>
                <FieldDescription>
                  Give your workspace a name and optional identifiers so your team can recognise this
                  environment in GammaEngage.
                </FieldDescription>
                <FieldGroup className={inputFieldsGroupClass}>
                  <Field>
                    <FieldLabel htmlFor="onboarding-workspace-name">Workspace name</FieldLabel>
                    <FieldContent>
                      <Input
                        id="onboarding-workspace-name"
                        autoComplete="organization"
                        placeholder="e.g. Acme Live Ops"
                        value={workspace.name}
                        onChange={(e) => setWorkspace((w) => ({ ...w, name: e.target.value }))}
                      />
                    </FieldContent>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="onboarding-workspace-slug">URL slug</FieldLabel>
                    <FieldContent>
                      <Input
                        id="onboarding-workspace-slug"
                        autoComplete="off"
                        spellCheck={false}
                        placeholder="acme-live-ops"
                        value={workspace.slug}
                        onChange={(e) => setWorkspace((w) => ({ ...w, slug: e.target.value }))}
                      />
                      <FieldDescription>
                        Short identifier used in URLs and integrations; lowercase letters, numbers,
                        and hyphens.
                      </FieldDescription>
                    </FieldContent>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="onboarding-workspace-timezone">Default timezone</FieldLabel>
                    <FieldContent>
                      <Select
                        value={workspace.timezone}
                        onValueChange={(value: string) =>
                          setWorkspace((w) => ({ ...w, timezone: value }))
                        }
                      >
                        <SelectTrigger id="onboarding-workspace-timezone" className="w-full">
                          <SelectValue placeholder="Timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          {WORKSPACE_TIMEZONES.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FieldDescription>
                        Used for scheduling and reporting; matches tenant defaults in the casino
                        wizard.
                      </FieldDescription>
                    </FieldContent>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="onboarding-workspace-currency">Currency</FieldLabel>
                    <FieldContent>
                      <Select
                        value={workspace.currency}
                        onValueChange={(value: string) =>
                          setWorkspace((w) => ({ ...w, currency: value }))
                        }
                      >
                        <SelectTrigger id="onboarding-workspace-currency" className="w-full">
                          <SelectValue placeholder="Currency" />
                        </SelectTrigger>
                        <SelectContent>
                          {WORKSPACE_CURRENCIES.map((c) => (
                            <SelectItem key={c.value} value={c.value}>
                              {c.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FieldContent>
                  </Field>
                </FieldGroup>
              </FieldSet>
            </FieldGroup>
          </TabsContent>

          <TabsContent value="channel" className="mt-0 outline-none">
            <OnboardingChannelTabContent />
          </TabsContent>

          <TabsContent value="api-keys" className="mt-0 outline-none">
            <FieldGroup>
              <FieldSet className="gap-6">
                <FieldLegend variant="legend">API Keys</FieldLegend>
                <FieldDescription>
                  Create a labelled key for server-side calls. Store secrets securely; they are only
                  shown once after creation.
                </FieldDescription>
                <FieldGroup className={inputFieldsGroupClass}>
                  <Field>
                    <FieldLabel htmlFor="onboarding-api-key-name">Key name</FieldLabel>
                    <FieldContent>
                      <Input
                        id="onboarding-api-key-name"
                        autoComplete="off"
                        placeholder="e.g. Production backend"
                      />
                      <FieldDescription>A friendly label to identify this key later.</FieldDescription>
                    </FieldContent>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="onboarding-api-key-env">Environment</FieldLabel>
                    <FieldContent>
                      <Input id="onboarding-api-key-env" placeholder="staging / production" />
                      <FieldDescription>
                        Optional tag for separating keys by environment.
                      </FieldDescription>
                    </FieldContent>
                  </Field>
                </FieldGroup>
              </FieldSet>
            </FieldGroup>
          </TabsContent>
          </div>

          <div
            className={cn(
              'flex shrink-0 flex-wrap items-center gap-3 border-t border-border pt-6',
              showSkip ? 'justify-between' : 'justify-end',
            )}
          >
            {showSkip ? (
              <Button type="button" variant="outline" size="lg" onClick={goSkip}>
                Skip
              </Button>
            ) : null}
            <Button type="button" size="lg" onClick={goNext}>
              {tab === 'api-keys' ? 'Finish' : 'Next'}
            </Button>
          </div>
        </Tabs>
      </div>
      <div className="min-h-0 bg-muted/20" aria-hidden />
    </div>
  );
}
