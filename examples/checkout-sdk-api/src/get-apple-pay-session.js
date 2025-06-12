import fs from 'fs';
import path from 'path';
import https from 'https';

export async function getApplePaySession({
  validationURL,
  initiativeContext,
  merchantIdentifier,
}) {
  const cert = fs.readFileSync(path.resolve('certs/merchant_id.pem'));
  const key = fs.readFileSync(path.resolve('certs/merchant_id.key'));

  const payload = JSON.stringify({
    merchantIdentifier,
    displayName: 'Mangopay Store',
    initiative: 'web',
    initiativeContext,
    domain: initiativeContext,
  });

  console.log('payload', payload);

  const options = {
    method: 'POST',
    hostname: 'apple-pay-gateway-cert.apple.com',
    path: '/paymentservices/startSession',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
    },
    key,
    cert,
    rejectUnauthorized: false,
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode !== 200) {
          console.error('Apple Pay 401 error:', data);
          return reject(new Error(`Apple Pay error: ${res.statusCode}`));
        }

        try {
          resolve(data);
        } catch (e) {
          reject(new Error('Failed to parse Apple Pay response'));
        }
      });
    });

    req.on('error', (err) => reject(err));
    req.write(payload);
    req.end();
  });
}
