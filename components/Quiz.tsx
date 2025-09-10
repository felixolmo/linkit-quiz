"use client";

import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import Image from "next/image";
import logo from "@/public/linkit-logo.png";

type Q = {
  id: string;
  label: string;
  type: "choice" | "text";
  options?: string[];
};

const QUESTIONS: Q[] = [
  { id: "goal", label: "What is your primary goal?", type: "choice", options: ["Generate leads", "Sell online", "Increase organic traffic", "Improve brand presence", "Automate processes/CRM"] },
  { id: "website", label: "Do you currently have a website?", type: "choice", options: ["Yes, WordPress", "Yes, Shopify", "Yes, custom", "Yes, not sure", "No"] },
  { id: "traffic", label: "Approximate monthly traffic?", type: "choice", options: ["Under 1k", "1k–5k", "5k–20k", "20k+"] },
  { id: "adSpend", label: "Monthly ad spend?", type: "choice", options: ["None", "Under $1,000", "$1,000–$3,000", "$3,000–$10,000", "Over $10,000"] },
  { id: "crm", label: "Do you use a CRM or automation?", type: "choice", options: ["HubSpot", "Zoho", "Salesforce", "Mailchimp", "None", "Other"] },
  { id: "tracking", label: "Do you have measurement set up?", type: "choice", options: ["GA4 with conversions", "Basic GA4 only", "No/Not sure"] },
  { id: "timeline", label: "When do you want to implement?", type: "choice", options: ["Under 30 days", "1–3 months", "3+ months"] },
  { id: "budgetBand", label: "Monthly budget range?", type: "choice", options: ["Free evaluation first", "$500–$1,500", "$1,500–$3,000", "$3,000–$10,000", "$10,000+"] },
  { id: "name", label: "Name", type: "text" },
  { id: "email", label: "Email", type: "text" },
  { id: "phone", label: "Phone", type: "text" }
];

const LeadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  consent: z.boolean().refine((v) => v === true)
});

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ path: string; summary: string[] } | null>(null);
  const [lead, setLead] = useState({ name: "", email: "", phone: "", consent: false });
  const [submitting, setSubmitting] = useState(false);

  const current = QUESTIONS[step];
  const progress = useMemo(() => Math.round((step / QUESTIONS.length) * 100), [step]);

  function onSelect(value: string) { setAnswers((a) => ({ ...a, [current.id]: value })); }
  function onText(value: string) {
    setAnswers((a) => ({ ...a, [current.id]: value }));
    if (current.id === "name") setLead((l) => ({ ...l, name: value }));
    if (current.id === "email") setLead((l) => ({ ...l, email: value }));
    if (current.id === "phone") setLead((l) => ({ ...l, phone: value }));
  }

  useEffect(() => {
    const h = document.documentElement.scrollHeight || document.body.scrollHeight;
    try { window.parent.postMessage({ type: "QUIZ_HEIGHT", height: h }, "*"); } catch {}
  }, [step, result]);

  async function next() {
    if (!answers[current.id]) return;
    if (step < QUESTIONS.length - 1) setStep((s) => s + 1);
    else {
      setSubmitting(true);
      const res = await fetch("/api/quiz/complete", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ answers }) });
      const data = await res.json();
      setResult(data);
      setSubmitting(false);
    }
  }
  function back() { if (step > 0) setStep((s) => s - 1); }

  async function submitLead() {
    const parse = LeadSchema.safeParse(lead);
    if (!parse.success) return;
    setSubmitting(true);
    await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ answers, result, lead }) });
    setSubmitting(false);
    setResult({ path: result?.path || "submitted", summary: ["Thanks. A specialist will contact you shortly."] });
  }

  if (result) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl shadow-xl ring-1 ring-black/5 overflow-hidden bg-white">
          <div className="px-6 py-6 border-b">
            <h1 className="text-2xl font-semibold text-[#306f98]">
              {result.path === "performance_ads" ? "Recommendation: Performance Ads + Landing" :
               result.path === "seo_growth" ? "Recommendation: SEO Growth" :
               result.path === "ecommerce_growth" ? "Recommendation: E-commerce Growth" :
               result.path === "automation_crm" ? "Recommendation: Automation & CRM" :
               result.path === "brand_refresh" ? "Recommendation: Brand & Website Refresh" :
               "Preliminary result"}
            </h1>
            <p className="mt-2 text-sm text-neutral-600">Based on your answers. Not formal advice.</p>
          </div>
          <div className="px-6 py-6 space-y-4">
            <ul className="space-y-2">
              {result.summary.map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl border p-6 space-y-4">
              <h2 className="text-lg font-medium text-[#306f98]">Request a free consultation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="rounded-xl border px-4 py-3" placeholder="Name" value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} />
                <input className="rounded-xl border px-4 py-3" placeholder="Email" value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} />
                <input className="rounded-xl border px-4 py-3 md:col-span-2" placeholder="Phone" value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} />
              </div>
              <label className="flex items-center gap-3 text-sm">
                <input type="checkbox" checked={lead.consent} onChange={(e) => setLead({ ...lead, consent: e.target.checked })} />
                <span>I agree to be contacted by phone, email, or SMS. Privacy policy.</span>
              </label>
              <button disabled={submitting} onClick={submitLead} className="w-full rounded-xl bg-[#306f98] px-6 py-4 text-white">
                {submitting ? "Submitting..." : "Request free consultation"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-3xl shadow-xl ring-1 ring-black/5 overflow-hidden bg-white">
        <div className="relative p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-[#306f98]">Question {step + 1} of {QUESTIONS.length}</div>
            <div className="relative h-14 w-14 rounded-full ring-2 ring-[#306f98] overflow-hidden bg-white">
              <Image src={logo} alt="Linkit Digital Logo" fill className="object-contain p-1" sizes="56px" priority />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            {QUESTIONS.map((_, i) => (
              <div key={i} className={`h-8 w-8 rounded-full grid place-items-center text-xs font-semibold ${i <= step ? "bg-[#306f98] text-white" : "bg-neutral-200 text-neutral-600"}`}>{i + 1}</div>
            ))}
          </div>
          <div className="absolute inset-x-0 -bottom-[1px] h-1 bg-[#306f98]" style={{ width: `${progress}%` }} />
        </div>

        <div className="p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-center text-[#306f98]">{current.label}</h1>

        {current.type === "choice" && (
          <div className="mt-8 grid gap-4">
            {current.options!.map((opt) => {
              const active = answers[current.id] === opt;
              return (
                <button
                  key={opt}
                  onClick={() => onSelect(opt)}
                  className={`rounded-full px-6 py-4 border-2 text-lg transition ${active ? "border-[#306f98] bg-[#306f98]/10" : "border-neutral-300 hover:border-neutral-500"}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {current.type === "text" && (
          <div className="mt-8">
            <input
              className="w-full rounded-xl border px-4 py-3 text-lg"
              placeholder="Type your answer"
              value={answers[current.id] || ""}
              onChange={(e) => onText(e.target.value)}
            />
          </div>
        )}

        <div className="mt-10 flex items-center justify-between">
          <button onClick={back} className="rounded-xl border px-5 py-3">Back</button>
          <button onClick={next} disabled={!answers[current.id] || submitting} className="rounded-xl bg-[#306f98] px-6 py-3 text-white">
            {step === QUESTIONS.length - 1 ? "See results" : "Continue"}
          </button>
        </div>

        <div className="mt-8 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm text-[#306f98]">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">💼</span>
          <span>You’ll receive a proposal aligned to your goals and budget.</span>
        </div>
      </div>
    </div>
  );
}
