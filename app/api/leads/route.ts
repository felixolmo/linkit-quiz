import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { answers, result, lead } = await req.json();

  const url = process.env.MAKE_WEBHOOK_URL;
  if (url) {
    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, result, lead }),
      });
    } catch (e) {
      console.error("make.webhook.error", e);
    }
  }

  return NextResponse.json({ ok: true });
}
