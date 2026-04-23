import { z } from "zod";

import { sendReportEmail } from "@/lib/email";
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
    let emailDelivery;

    try {
      emailDelivery = await sendReportEmail({
        email: payload.email.trim().toLowerCase(),
        profile
      });
    } catch (emailError) {
      emailDelivery = {
        ok: false,
        error: emailError instanceof Error ? emailError.message : "Unable to send the reset report email."
      };
    }

    const lead = {
      id: crypto.randomUUID(),
      createdAt,
      email: payload.email.trim().toLowerCase(),
      answers: payload.answers,
      profile,
      emailDelivery,
      source: "zanesbestlife-quiz",
      ipAddress:
        request.headers.get("x-forwarded-for") ||
        request.headers.get("x-real-ip") ||
        "",
      userAgent: request.headers.get("user-agent") || ""
    };

    const storage = await saveLead(lead);

    if (!emailDelivery?.ok && !emailDelivery?.skipped) {
      return Response.json(
        {
          ok: false,
          error:
            "We saved the lead, but the report email could not be sent. Please fix email delivery before going live.",
          storage,
          profile,
          emailDelivery
        },
        { status: 502 }
      );
    }

    return Response.json(
      {
        ok: true,
        storage,
        profile,
        emailDelivery
      },
      { status: 200 }
    );
  } catch (error) {
    const isValidationError = error instanceof z.ZodError;
    const message =
      isValidationError
        ? "Please complete the quiz and enter a valid email address."
        : error instanceof Error
          ? error.message
          : "Something went wrong while saving your plan.";

    return Response.json(
      {
        ok: false,
        error: message
      },
      { status: isValidationError ? 400 : 500 }
    );
  }
}
