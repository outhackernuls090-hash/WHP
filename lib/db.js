import { kv } from "@vercel/kv";

export async function getWebhook(id) {
  return await kv.get(`webhook:${id}`);
}

export async function setWebhook(id, data) {
  await kv.set(`webhook:${id}`, data);
}

export async function disableWebhook(id) {
  await kv.set(`webhook:${id}:disabled`, true);
}
