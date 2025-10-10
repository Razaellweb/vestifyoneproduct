import crypto from "crypto";

const ALGO = "aes-256-gcm";

function getKey() {
  const key = process.env.ENCRYPTION_KEY || "";
  if (!key) throw new Error("ENCRYPTION_KEY missing");
  // derive 32 bytes from provided key
  return crypto.createHash("sha256").update(key).digest();
}

export function encryptString(plain: string): string {
  const key = getKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, key, iv);
  const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  // format: iv.tag.ciphertext (base64)
  return [iv.toString("base64"), tag.toString("base64"), enc.toString("base64")].join(".");
}

export function decryptString(token: string): string {
  const key = getKey();
  const [ivB64, tagB64, dataB64] = token.split(".");
  const iv = Buffer.from(ivB64, "base64");
  const tag = Buffer.from(tagB64, "base64");
  const data = Buffer.from(dataB64, "base64");
  const decipher = crypto.createDecipheriv(ALGO, key, iv);
  decipher.setAuthTag(tag);
  const dec = Buffer.concat([decipher.update(data), decipher.final()]);
  return dec.toString("utf8");
}
