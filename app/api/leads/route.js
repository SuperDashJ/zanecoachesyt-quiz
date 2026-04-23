import { z } from "zod";

import { buildLeadProfile } from "@/lib/quiz-logic";
import { saveLead } from "@/lib/storage";

const leadSchema = z.object({
  email: z.string().email().max(254),
  answers: z.object({
    priority: z.string(),
    status: z.string(),
    blocker: z.string(),
    pain: z.string(),
    "change-style": z.string(),
    "time-budget": z.string(),
    "fastest-improvement": z.string()
  }),
  website: z.string().optional().default("")
});

export async function POST(request) {
  try {
    const body = await request.json();
    const payload = leadSchema.parse(body);

    if (payload.website) {
      return Response.json({ ok: true }, { status: 200 });
    }

    const profile = buildLeadProfile(payload.answers);
    const createdAt = new Date().toISOString();
    const lead = {
      id: crypto.randomUUID(),
      createdAt,
      email: payload.email.trim().toLowerCase(),
      answers: payload.answers,
      profile,
      source: "zanesbestlife-quiz",
      ipAddress:
        request.headers.get("x-forwarded-for") ||
        request.headers.get("x-real-ip") ||
        "",
      userAgent: request.headers.get("user-agent") || ""
    };

    const storage = await saveLead(lead);

    return Response.json(
      {
        ok: true,
        storage,
        profile
      },
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof z.ZodError
        ? "Please complete the quiz and enter a valid email address."
        : error instanceof Error
          ? error.message
          : "Something went wrong while saving your plan.";

    return Response.json(
      {
        ok: false,
        error: message
      },
      { status: 400 }
    );
  }
}
