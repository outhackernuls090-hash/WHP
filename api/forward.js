import { getWebhook } from "../lib/db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { webhook_id, embeds, placeId } = req.body;

  if (!webhook_id || !embeds) {
    return res.status(400).json({ error: "Bad request" });
  }

  const record = await getWebhook(webhook_id);
  if (!record) {
    return res.status(403).json({ error: "Invalid webhook ID" });
  }

  // 🔒 Bind to game
  if (record.placeId && record.placeId !== placeId) {
    return res.status(403).json({ error: "Invalid place" });
  }

  // 🧪 Basic validation
  if (!Array.isArray(embeds) || embeds.length > 5) {
    return res.status(400).json({ error: "Invalid embeds" });
  }

  await fetch(record.webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ embeds })
  });

  res.json({ ok: true });
}
