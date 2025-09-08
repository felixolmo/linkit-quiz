import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { answers } = await req.json();
  const a = answers || {};

  const goal = a.goal;
  const website = a.website;
  const ad = a.adSpend;
  const crm = a.crm;
  const tracking = a.tracking;
  const traffic = a.traffic;
  const budget = a.budgetBand;
  const timeline = a.timeline;

  if (goal === "Generate leads" && (ad === "$1,000–$3,000" || ad === "$3,000–$10,000" || ad === "Over $10,000") && website !== "No") {
    return NextResponse.json({
      path: "performance_ads",
      summary: [
        "Performance campaigns on Google/Meta with optimized landing.",
        "A/B testing and conversion measurement in GA4.",
        "Weekly optimization and clear reporting."
      ]
    });
  }

  if (goal === "Increase organic traffic" && (traffic === "Under 1k" || traffic === "1k–5k")) {
    return NextResponse.json({
      path: "seo_growth",
      summary: [
        "Technical, content, and links plan to grow organic traffic.",
        "Keyword roadmap and on-page improvements.",
        "Metrics dashboard with GA4 and Search Console."
      ]
    });
  }

  if (goal === "Sell online" && website === "Yes, Shopify") {
    return NextResponse.json({
      path: "ecommerce_growth",
      summary: [
        "Shopify catalog and checkout optimization.",
        "Performance Max and Meta Ads with product feed.",
        "Email/SMS for recovery and LTV growth."
      ]
    });
  }

  if (goal === "Automate processes/CRM" && (crm === "None" || crm === "Other")) {
    return NextResponse.json({
      path: "automation_crm",
      summary: [
        "CRM and automation implementation with Make.com.",
        "Lead nurturing flows and assignment rules.",
        "End-to-end tracking in GA4/CRM."
      ]
    });
  }

  if (goal === "Improve brand presence" || website === "No") {
    return NextResponse.json({
      path: "brand_refresh",
      summary: [
        "Website and brand refresh focused on conversion.",
        "Clear messaging and visual system.",
        "Prepared foundation for traffic scaling."
      ]
    });
  }

  if (budget === "Free evaluation first" && timeline === "3+ months") {
    return NextResponse.json({
      path: "brand_refresh",
      summary: [
        "Roadmap and quick wins without heavy spend.",
        "Prioritization for the next quarter."
      ]
    });
  }

  return NextResponse.json({
    path: "performance_ads",
    summary: [
      "Balanced acquisition and on-site optimization plan.",
      "90-day starter plan with monthly milestones."
    ]
  });
}
