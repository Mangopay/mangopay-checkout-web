import fs from 'fs';
import path from 'path';
import https from 'https';

const certPath = path.join(__dirname, 'certs', 'merchant_id.pem');
const keyPath = path.join(__dirname, 'certs', 'merchant_id.key');

console.log('[ApplePay] Loading certs:', { certPath, keyPath });

const cert = fs.readFileSync(certPath);
const key = fs.readFileSync(keyPath);

export async function getApplePaySession({
  validationURL,
  initiativeContext,
  merchantIdentifier,
}) {
  console.log('[ApplePay] start', { validationURL, initiativeContext });

  const httpsAgent = new https.Agent({ cert, key, rejectUnauthorized: false });

  const payload = {
    merchantIdentifier,
    displayName: 'Mangopay Store',
    initiative: 'web',
    initiativeContext,
    domain: initiativeContext,
    validationURL,
  };

  try {
    const res = await fetch(validationURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      agent: httpsAgent,
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('[ApplePay] validation failed', res.status, text);
      throw new Error(`Apple Pay session validation failed (${res.status})`);
    }

    const data = await res.json();
    console.log('[ApplePay] success');
    return data;
  } catch (err) {
    console.error('[ApplePay] error', err);
    throw err;
  }
}
