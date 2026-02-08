// lib/db.js
import { kv } from "@vercel/kv";

export async function setWebhook(id, data) {
  await kv.set(`webhook:${id}`, data);
}

export async function getWebhook(id) {
  return await kv.get(`webhook:${id}`);
}

export async function deleteWebhook(id) {
  await kv.del(`webhook:${id}`);
}
