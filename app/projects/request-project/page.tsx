"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Globe,
  Smartphone,
  ShoppingCart,
  LayoutDashboard,
  Lightbulb,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Send,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

type ProjectType =
  | "web_app"
  | "mobile_app"
  | "ecommerce"
  | "dashboard"
  | "other";
type Budget = "under_5k" | "5k_15k" | "15k_30k" | "over_30k";
type Timeline = "under_1m" | "1_3m" | "3_6m" | "flexible";

interface FormData {
  projectType: ProjectType | null;
  description: string;
  budget: Budget | null;
  timeline: Timeline | null;
  name: string;
  email: string;
  extra: string;
}

// ── Static data ───────────────────────────────────────────────────────────────

const PROJECT_TYPES: {
  id: ProjectType;
  icon: React.ElementType;
  label: string;
  desc: string;
}[] = [
  {
    id: "web_app",
    icon: Globe,
    label: "Web Application",
    desc: "SaaS, platforms, dashboards",
  },
  {
    id: "mobile_app",
    icon: Smartphone,
    label: "Mobile App",
    desc: "iOS, Android, Flutter",
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    label: "E-commerce",
    desc: "Online stores, marketplaces",
  },
  {
    id: "dashboard",
    icon: LayoutDashboard,
    label: "Admin Dashboard",
    desc: "Analytics, CMS, back-offices",
  },
  {
    id: "other",
    icon: Lightbulb,
    label: "Something else",
    desc: "Tell me more below",
  },
];

const BUDGETS: { id: Budget; label: string }[] = [
  { id: "under_5k", label: "< $5,000" },
  { id: "5k_15k", label: "$5,000 – $15,000" },
  { id: "15k_30k", label: "$15,000 – $30,000" },
  { id: "over_30k", label: "> $30,000" },
];

const TIMELINES: { id: Timeline; label: string }[] = [
  { id: "under_1m", label: "Under 1 month" },
  { id: "1_3m", label: "1 – 3 months" },
  { id: "3_6m", label: "3 – 6 months" },
  { id: "flexible", label: "Flexible" },
];

const TOTAL_STEPS = 4;

// ── Shared input class ─────────────────────────────────────────────────────────

const inputCls =
  "w-full rounded border border-input bg-background px-3 text-sm text-foreground " +
  "placeholder:text-muted-foreground transition-shadow duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

// ── Step components ───────────────────────────────────────────────────────────

function Step1({
  form,
  setForm,
}: {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
}) {
  return (
    <>
      <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-3">
        What are you building?
      </h1>
      <p className="text-base text-muted-foreground mb-8">
        Choose the type that best describes your project.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PROJECT_TYPES.map(({ id, icon: Icon, label, desc }) => {
          const selected = form.projectType === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setForm((f) => ({ ...f, projectType: id }))}
              className={[
                "text-start p-5 rounded-lg border transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selected
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-primary/50 hover:bg-muted/50",
              ].join(" ")}
            >
              <div className="flex items-start gap-3">
                <div
                  className={[
                    "p-2 rounded shrink-0",
                    selected
                      ? "bg-primary/15 text-primary"
                      : "bg-muted text-muted-foreground",
                  ].join(" ")}
                >
                  <Icon size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    {label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                </div>
                {selected && (
                  <CheckCircle2
                    size={16}
                    className="shrink-0 text-primary mt-0.5"
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}

function Step2({
  form,
  setForm,
}: {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
}) {
  const MIN = 20;
  const remaining = Math.max(0, MIN - form.description.trim().length);

  return (
    <>
      <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-3">
        Tell me about your vision
      </h1>
      <p className="text-base text-muted-foreground mb-8">
        What problem does it solve? Who is it for? The more detail you share,
        the better I can help.
      </p>

      <textarea
        value={form.description}
        onChange={(e) =>
          setForm((f) => ({ ...f, description: e.target.value }))
        }
        placeholder="My project is a platform that..."
        rows={7}
        className={`${inputCls} py-2.5 resize-none`}
      />

      {remaining > 0 && (
        <p className="text-xs text-muted-foreground mt-2">
          {remaining} more characters to continue
        </p>
      )}
    </>
  );
}

function Step3({
  form,
  setForm,
}: {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
}) {
  const pillCls = (selected: boolean) =>
    [
      "h-9 px-4 rounded text-sm font-medium transition-colors duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      selected
        ? "bg-primary text-primary-foreground"
        : "border border-border text-muted-foreground hover:text-foreground hover:bg-muted",
    ].join(" ");

  return (
    <>
      <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-3">
        Budget &amp; timeline
      </h1>
      <p className="text-base text-muted-foreground mb-8">
        Help me scope the right solution for your needs.
      </p>

      <div className="flex flex-col gap-8">
        <div>
          <p className="text-sm font-semibold text-foreground mb-3">
            Estimated budget
          </p>
          <div className="flex flex-wrap gap-2">
            {BUDGETS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setForm((f) => ({ ...f, budget: id }))}
                className={pillCls(form.budget === id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground mb-3">
            Delivery timeline
          </p>
          <div className="flex flex-wrap gap-2">
            {TIMELINES.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setForm((f) => ({ ...f, timeline: id }))}
                className={pillCls(form.timeline === id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function Step4({
  form,
  setForm,
}: {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
}) {
  return (
    <>
      <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-3">
        How can I reach you?
      </h1>
      <p className="text-base text-muted-foreground mb-8">
        I&apos;ll review your brief and get back to you within 24 hours.
      </p>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Your name"
            className={`${inputCls} h-10`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="you@example.com"
            className={`${inputCls} h-10`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Anything else?{" "}
            <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <textarea
            value={form.extra}
            onChange={(e) => setForm((f) => ({ ...f, extra: e.target.value }))}
            placeholder="References, specific requirements, questions..."
            rows={3}
            className={`${inputCls} py-2.5 resize-none`}
          />
        </div>
      </div>
    </>
  );
}

function SuccessScreen({ name }: { name: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 pt-20">
      <div className="text-center max-w-md animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
          <CheckCircle2 size={30} className="text-primary" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
          Request sent!
        </h1>
        <p className="text-base text-muted-foreground mb-8">
          Thanks{name ? `, ${name}` : ""}! I&apos;ll review your project brief and
          get back to you within 24 hours.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 h-9 rounded bg-primary px-5 text-sm font-medium
                     text-primary-foreground hover:bg-primary/85 active:scale-[0.97]
                     transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft size={15} />
          Back to home
        </Link>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function RequestProjectPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    projectType: null,
    description: "",
    budget: null,
    timeline: null,
    name: "",
    email: "",
    extra: "",
  });

  function canProceed() {
    if (step === 1) return !!form.projectType;
    if (step === 2) return form.description.trim().length >= 20;
    if (step === 3) return !!form.budget && !!form.timeline;
    if (step === 4)
      return (
        form.name.trim().length > 0 && /\S+@\S+\.\S+/.test(form.email)
      );
    return false;
  }

  function handleNext() {
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
    } else {
      // TODO: wire up server action to persist/send the request
      setSubmitted(true);
    }
  }

  if (submitted) return <SuccessScreen name={form.name} />;

  const progress = (step / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ── Top progress bar ── */}
      <div className="fixed inset-x-0 top-20 z-40 h-px bg-border">
        <div
          className="h-full bg-primary transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ── Content ── */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-8 pt-28 pb-24">
        <div className="w-full max-w-2xl">
          {/* Step label */}
          <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-5">
            Step {step} of {TOTAL_STEPS}
          </p>

          {/* Step content — key triggers re-mount for animation */}
          <div
            key={step}
            className="animate-in fade-in-0 slide-in-from-bottom-3 duration-300"
          >
            {step === 1 && <Step1 form={form} setForm={setForm} />}
            {step === 2 && <Step2 form={form} setForm={setForm} />}
            {step === 3 && <Step3 form={form} setForm={setForm} />}
            {step === 4 && <Step4 form={form} setForm={setForm} />}
          </div>

          {/* ── Navigation ── */}
          <div className="flex items-center justify-between mt-10">
            {/* Back / Home */}
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground
                           hover:text-foreground transition-colors duration-200
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              >
                <ArrowLeft size={15} />
                Back
              </button>
            ) : (
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground
                           hover:text-foreground transition-colors duration-200
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              >
                <ArrowLeft size={15} />
                Home
              </Link>
            )}

            {/* Next / Submit */}
            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed()}
              className="inline-flex items-center gap-2 h-9 rounded bg-primary px-5 text-sm font-medium
                         text-primary-foreground hover:bg-primary/85 active:scale-[0.97]
                         transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                         disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
            >
              {step < TOTAL_STEPS ? (
                <>
                  Next
                  <ArrowRight size={15} />
                </>
              ) : (
                <>
                  Send Request
                  <Send size={14} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Step dot indicators ── */}
      <div className="fixed bottom-0 inset-x-0 flex items-center justify-center gap-2 pb-6">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={[
              "rounded-full transition-all duration-300",
              i + 1 === step
                ? "w-6 h-1.5 bg-primary"
                : i + 1 < step
                  ? "w-1.5 h-1.5 bg-primary/40"
                  : "w-1.5 h-1.5 bg-border",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}
