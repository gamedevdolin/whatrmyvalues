import { neon } from "@netlify/neon";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_VALUES = 20;
const MAX_VALUE_LEN = 100;
const MAX_EMAIL_LEN = 254;
const MAX_FEEDBACK_WORDS = 500;

const bad = (message) =>
  new Response(JSON.stringify({ error: message }), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });

const countWords = (s) => s.trim().split(/\s+/).filter(Boolean).length;

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { values, feedback, email } = await req.json();

    if (!Array.isArray(values) || values.length === 0 || values.length > MAX_VALUES) {
      return bad("Values are required");
    }
    if (values.some((v) => typeof v !== "string" || v.length === 0 || v.length > MAX_VALUE_LEN)) {
      return bad("Invalid values");
    }

    const feedbackStr = typeof feedback === "string" ? feedback.trim() : "";
    if (countWords(feedbackStr) > MAX_FEEDBACK_WORDS) {
      return bad(`Feedback exceeds ${MAX_FEEDBACK_WORDS}-word limit`);
    }

    const emailStr = typeof email === "string" ? email.trim() : "";
    if (emailStr.length > MAX_EMAIL_LEN) {
      return bad("Email too long");
    }
    if (emailStr && !EMAIL_REGEX.test(emailStr)) {
      return bad("Invalid email format");
    }

    const sql = neon();

    // Store values as comma-separated string to avoid array type issues
    const valuesStr = values.join(", ");

    await sql`
      INSERT INTO feedback (values_list, feedback_text, email)
      VALUES (${valuesStr}, ${feedbackStr || null}, ${emailStr || null})
    `;

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Feedback error:", error);
    return new Response(JSON.stringify({ error: "Failed to save feedback" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config = {
  path: "/api/feedback",
};
