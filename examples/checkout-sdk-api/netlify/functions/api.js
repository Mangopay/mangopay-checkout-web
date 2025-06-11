import Fastify from 'fastify';
import awsLambdaFastify from '@fastify/aws-lambda';
import fastifyCors from '@fastify/cors';

import { createCardRegistration } from '../../src/create-card-registration.js';
import { createCardPayIn } from '../../src/create-card-direct-payin.js';
import { createPayPalPayin } from '../../src/create-paypal-payin.js';
import { createGooglePayPayIn } from '../../src/create-googlepay-payin.js';
import { getApplePaySession } from '../../src/get-apple-pay-session.js';
import { createApplePayPayIn } from '../../src/create-applepay-payin.js';
import { getSavedCards } from '../../src/get-saved-cards.js';
import { deactivateCard } from '../../src/deactivate-card.js';
import { createPayinsCardWeb } from '../../src/create-payins-card-web.js';
import { createRecurringRegistration } from '../../src/create-recurring-registration.js';
import { confirmRecurringCIT } from '../../src/confirm-recurring-cit.js';

const app = Fastify({ logger: false });

app.register(fastifyCors, {
  origin: true,
  credentials: true,
  allowedHeaders: [
    'Authorization',
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Slug',
    'X-UID',
  ],
});

app.register(
  async (api) => {
    api.get('/', (_, reply) =>
      reply.send("Backend for Mangopay's Checkout example.")
    );

    api.post('/create-card-registration', async (req, reply) => {
      const { CardType } = req.body;
      reply.send(await createCardRegistration(CardType));
    });

    api.post('/create-card-payment', async (req, reply) => {
      const {
        cardId,
        SecureModeReturnURL,
        PreferredCardNetwork,
        ProfilingAttemptReference,
      } = req.body;
      reply.send(
        await createCardPayIn(
          cardId,
          SecureModeReturnURL,
          PreferredCardNetwork,
          ProfilingAttemptReference
        )
      );
    });

    api.post('/create-paypal-payment', async (req, reply) => {
      reply.send(await createPayPalPayIn(req.body.SecureModeReturnURL));
    });

    api.post('/create-googlepay-payment', async (req, reply) => {
      const raw = req.body;
      const paymentData = raw.PaymentData ?? raw.paymentData?.PaymentData;
      reply.send(
        await createGooglePayPayIn(paymentData, raw.SecureModeReturnURL)
      );
    });

    api.post('/get-apple-pay-session', async (req, reply) => {
      reply.send(await getApplePaySession(req.body));
    });

    api.post('/create-applepay-payment', async (req, reply) => {
      reply.send(await createApplePayPayIn(req.body.PaymentData));
    });

    api.get('/saved-cards', async (_, reply) => {
      reply.send(await getSavedCards());
    });

    api.put('/deactivate-card', async (req, reply) => {
      reply.send(await deactivateCard(req.body.cardId));
    });

    api.post('/create-payins-card-web', async (req, reply) => {
      try {
        const redirectUrl = await createPayinsCardWeb(req.body);
        reply.send({ redirectUrl });
      } catch (err) {
        reply.code(500).send({ error: true, message: err.message });
      }
    });

    api.post('/paypal/confirm-recurring-cit', async (_, reply) => {
      try {
        reply.send({ cit: await confirmRecurringCIT() });
      } catch (err) {
        reply.code(500).send({ error: true, message: err.message });
      }
    });

    api.setNotFoundHandler((_, reply) =>
      reply.code(404).send({ error: 'Not found' })
    );
  },
  { prefix: '/api' }
);

export const handler = awsLambdaFastify(app);
