"use client";

import { useState } from "react";
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
  LogOut,
  Zap,
  Layers,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useArabicText } from "@/lib/utils/arabic-helper";
import { Button } from "@/components/ui/button";
import {
  useAddNewReqProject,
  type ReqProjectFormData,
} from "@/lib/helpers/use-add-new-req-project";
import { useRouter } from "next/navigation";

type SetField = <K extends keyof ReqProjectFormData>(
  key: K,
  value: ReqProjectFormData[K],
) => void;

const PROJECT_TYPES: {
  id: ReqProjectFormData["projectType"];
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

const BUDGETS: { id: string; labelKey: string }[] = [
  { id: "under_5k", labelKey: "Budgetunder5k" },
  { id: "5k_15k", labelKey: "Budget5kto15k" },
  { id: "15k_30k", labelKey: "Budget15kto30k" },
  { id: "over_30k", labelKey: "Budgetover30k" },
  { id: "later", labelKey: "Budgetlater" },
];

const TIMELINES: { id: string; labelKey: string }[] = [
  { id: "under_1m", labelKey: "Timelineunder1m" },
  { id: "1_3m", labelKey: "Timeline1to3m" },
  { id: "3_6m", labelKey: "Timeline3to6m" },
  { id: "flexible", labelKey: "Timelineflexible" },
];

const TOTAL_STEPS = 4;

const inputCls =
  "w-full rounded border border-input bg-background px-3 text-sm text-foreground " +
  "placeholder:text-muted-foreground transition-shadow duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

// ── Step components ───────────────────────────────────────────────────────────

function Step1({
  form,
  setField,
  t,
}: {
  form: ReqProjectFormData;
  setField: SetField;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
        {t("Whatareyoubuilding")}
      </h1>
      <p className="text-base text-muted-foreground mb-8">
        {t("Choosethetypethatbestdescribesyourproject")}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PROJECT_TYPES.map(({ id, icon: Icon, label, desc }) => {
          const selected = form.projectType === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setField("projectType", id)}
              className={[
                "text-start p-5 rounded-sm border transition-all duration-200",
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
  setField,
  t,
}: {
  form: ReqProjectFormData;
  setField: SetField;
  t: ReturnType<typeof useTranslations>;
}) {
  const MIN = 20;
  const remaining = Math.max(0, MIN - form.vision.trim().length);

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
        {t("Tellmeaboutyourvision")}
      </h1>
      <p className="text-base text-muted-foreground mb-8">
        {t(
          "WhatproblemdoesitsolveWhoisitforThemoredetailyousharethebetterIcanhelp",
        )}
      </p>

      <textarea
        value={form.vision}
        onChange={(e) => setField("vision", e.target.value)}
        placeholder={t("Myprojectisaplatformthat")}
        rows={7}
        className={`${inputCls} py-2.5 resize-none`}
      />

      {remaining > 0 && (
        <p className="text-xs text-muted-foreground mt-2">
          {remaining} {t("morecharacterstocontinue")}
        </p>
      )}
    </>
  );
}

function Step3({
  form,
  setField,
  t,
}: {
  form: ReqProjectFormData;
  setField: SetField;
  t: ReturnType<typeof useTranslations>;
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
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
        {t("Budgettimeline")}
      </h1>
      <p className="text-base text-muted-foreground mb-8">
        {t("Helpmescopetherightsolutionforyourneeds")}
      </p>

      <div className="flex flex-col gap-8">
        {/* MVP toggle */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-3">
            {t("Scopeapproach")}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                { value: true, icon: Zap, label: "MVP", desc: t("MVPdesc") },
                {
                  value: false,
                  icon: Layers,
                  label: t("FullProduct"),
                  desc: t("FullProductdesc"),
                },
              ] as const
            ).map(({ value, icon: Icon, label, desc }) => {
              const selected = form.isMvp === value;
              return (
                <button
                  key={String(value)}
                  type="button"
                  onClick={() => setField("isMvp", value)}
                  className={[
                    "text-start p-4 rounded-sm border transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    selected
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/50 hover:bg-muted/50",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div
                      className={[
                        "p-1.5 rounded shrink-0",
                        selected
                          ? "bg-primary/15 text-primary"
                          : "bg-muted text-muted-foreground",
                      ].join(" ")}
                    >
                      <Icon size={15} />
                    </div>
                    {selected && (
                      <CheckCircle2
                        size={15}
                        className="text-primary shrink-0 mt-0.5"
                      />
                    )}
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    {label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Budget */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-3">
            {t("Estimatedbudget")}
          </p>
          <div className="flex flex-wrap gap-2">
            {BUDGETS.map(({ id, labelKey }) => (
              <button
                key={id}
                type="button"
                onClick={() => setField("budget", id)}
                className={pillCls(form.budget === id)}
              >
                {t(labelKey)}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-3">
            {t("Deliverytimeline")}
          </p>
          <div className="flex flex-wrap gap-2">
            {TIMELINES.map(({ id, labelKey }) => (
              <button
                key={id}
                type="button"
                onClick={() => setField("timeLine", id)}
                className={pillCls(form.timeLine === id)}
              >
                {t(labelKey)}
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
  setField,
  t,
}: {
  form: ReqProjectFormData;
  setField: SetField;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
        {t("HowcanIreachyou")}
      </h1>
      <p className="text-base text-muted-foreground mb-8">
        {t("Illreviewyourbriefandgetbacktoyouwithin24hours")}
      </p>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            {t("name")}
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            placeholder={t("Yourname")}
            className={`${inputCls} h-10`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            {t("Email")}
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            placeholder="you@example.com"
            className={`${inputCls} h-10`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            {t("Anythingelse")}{" "}
            <span className="text-muted-foreground font-normal">
              ({t("optional")})
            </span>
          </label>
          <textarea
            value={form.note}
            onChange={(e) => setField("note", e.target.value)}
            placeholder={t("Referencesspecificrequirementsquestions")}
            rows={3}
            className={`${inputCls} py-2.5 resize-none`}
          />
        </div>
      </div>
    </>
  );
}

function SuccessScreen({
  name,
  t,
  router,
}: {
  name: string;
  t: ReturnType<typeof useTranslations>;
  router: ReturnType<typeof useRouter>;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 pt-20">
      <div className="text-center max-w-md animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
          <CheckCircle2 size={30} className="text-primary" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
          {t("Requestsent")}
        </h1>
        <p className="text-base text-muted-foreground mb-8">
          {t("ThanksIllreviewyourprojectbriefandgetbacktoyouwithinhours", {
            name: name ? `, ${name}` : "",
          })}
        </p>

        <div
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 h-9 rounded bg-primary px-5 text-sm font-medium
                     text-primary-foreground hover:bg-primary/85 active:scale-[0.97]
                     transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {t("Backtohome")}
        </div>
      </div>
    </div>
  );
}

export default function RequestProjectPage() {
  const t = useTranslations("Home");
  const router = useRouter();
  const { isArabic } = useArabicText();
  const [step, setStep] = useState(1);

  const { isAdding, isSubmitted, formData, setField, addNewReqProject } =
    useAddNewReqProject();

  function canProceed() {
    if (step === 1) return !!formData.projectType;
    if (step === 2) return formData.vision.trim().length >= 20;
    if (step === 3) return !!formData.budget && !!formData.timeLine;
    if (step === 4)
      return (
        formData.name.trim().length > 0 && /\S+@\S+\.\S+/.test(formData.email)
      );
    return false;
  }

  function handleNext() {
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
    } else {
      addNewReqProject();
    }
  }

  if (isSubmitted)
    return <SuccessScreen name={formData.name} t={t} router={router} />;

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
          {/* Top row: step label + Home link */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              {t("STEP")} {step} {t("OF")} {TOTAL_STEPS}
            </p>

            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground
                         hover:text-foreground transition-colors duration-200
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              {t("Backtohome")}
              <LogOut size={15} className={isArabic ? "rotate-180" : ""} />
            </Button>
          </div>

          {/* Step content */}
          <div
            key={step}
            className="animate-in fade-in-0 slide-in-from-bottom-3 duration-300"
          >
            {step === 1 && <Step1 form={formData} setField={setField} t={t} />}
            {step === 2 && <Step2 form={formData} setField={setField} t={t} />}
            {step === 3 && <Step3 form={formData} setField={setField} t={t} />}
            {step === 4 && <Step4 form={formData} setField={setField} t={t} />}
          </div>

          {/* ── Navigation ── */}
          <div className="flex items-center justify-between mt-10">
            {step > 1 ? (
              <Button
                variant="outline"
                type="button"
                onClick={() => setStep((s) => s - 1)}
              >
                {isArabic ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}
                {t("Back")}
              </Button>
            ) : (
              <span />
            )}

            <Button
              type="button"
              onClick={handleNext}
              disabled={!canProceed() || isAdding}
            >
              {step < TOTAL_STEPS ? (
                <>
                  {t("Next")}
                  {isArabic ? (
                    <ArrowLeft size={15} />
                  ) : (
                    <ArrowRight size={15} />
                  )}
                </>
              ) : (
                <>
                  {t("SendRequest")}
                  <Send size={14} />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
