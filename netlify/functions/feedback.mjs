import { neon } from "@netlify/neon";

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { values, feedback, email } = await req.json();

    if (!values || !Array.isArray(values) || values.length === 0) {
      return new Response(JSON.stringify({ error: "Values are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const sql = neon();

    // One-time migration: drop old table with TEXT[] column and recreate with TEXT
    await sql`DROP TABLE IF EXISTS feedback`;
    await sql`
      CREATE TABLE IF NOT EXISTS feedback (
        id SERIAL PRIMARY KEY,
        values_list TEXT NOT NULL,
        feedback_text TEXT,
        email TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    // Store values as comma-separated string to avoid array type issues
    const valuesStr = values.join(", ");

    await sql`
      INSERT INTO feedback (values_list, feedback_text, email)
      VALUES (${valuesStr}, ${feedback || null}, ${email || null})
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
