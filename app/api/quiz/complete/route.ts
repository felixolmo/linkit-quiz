import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { answers } = await req.json();
  const a = answers || {};

  const goal = a.goal as string | undefined;
  const website = a.website as string | undefined;
  const ad = a.adSpend as string | undefined;
  const crm = a.crm as string | undefined;
  const traffic = a.traffic as string | undefined;
  const budget = a.budgetBand as string | undefined;
  const timeline = a.timeline as string | undefined;

  if (goal === "Sell online") {
    return NextResponse.json({
      path: "ecommerce_growth",
      summary: [
        "Shop platform optimization and CRO.",
        "Performance campaigns with product feed.",
        "Lifecycle email/SMS to increase LTV."
      ]
    });
  }

  if (goal === "Automate processes/CRM") {
    return NextResponse.json({
      path: "automation_crm",
      summary: [
        "CRM and automation implementation with Make.com.",
        "Lead routing and nurture flows.",
        "End-to-end tracking in GA4/CRM."
      ]
    });
  }

  if (goal === "Increase organic traffic" || goal === "Google Ranking") {
    return NextResponse.json({
      path: "seo_growth",
      summary: [
        "Technical, content, and links plan to grow organic traffic.",
        "Keyword roadmap and on-page improvements.",
        "Metrics dashboard with GA4 and Search Console."
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

  if (goal === "Generate leads") {
    if (ad && ad !== "None" && website && website !== "No") {
      return NextResponse.json({
        path: "performance_ads",
        summary: [
          "Performance campaigns on Google/Meta with optimized landing.",
          "A/B testing and conversion measurement in GA4.",
          "Weekly optimization and clear reporting."
        ]
      });
    }
    if (website === "No") {
      return NextResponse.json({
        path: "brand_refresh",
        summary: [
          "Website and brand refresh focused on conversion.",
          "Clear messaging and visual system.",
          "Prepared foundation for traffic scaling."
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
