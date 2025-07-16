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
import { confirmRecurringCIT } from '../../src/confirm-recurring-cit.js';

const app = Fastify({ logger: false });

app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: false,
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
    api.get('/', async (_, reply) => {
      try {
        reply.send("Backend for Mangopay's Checkout example.");
      } catch (err) {
        reply.code(500).send({ error: true, message: err.message });
      }
    });

    api.post('/create-card-registration', async (req, reply) => {
      try {
        const { CardType } = req.body;
        reply.send(await createCardRegistration(CardType));
      } catch (err) {
        reply.code(500).send({ error: true, message: err.message });
      }
    });

    api.post('/create-card-payment', async (req, reply) => {
      try {
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
      } catch (err) {
        reply.code(500).send({ error: true, message: err.message });
      }
    });

    api.post('/create-paypal-payment', async (req, reply) => {
      try {
        const result = await createPayPalPayin(req.body?.SecureModeReturnURL);
        reply.send(result);
      } catch (err) {
        reply.code(500).send({ error: true, message: err.message });
      }
    });

    api.post('/create-googlepay-payment', async (req, reply) => {
      try {
        const raw = req.body;
        const paymentData = raw.PaymentData ?? raw.paymentData?.PaymentData;
        reply.send(
          await createGooglePayPayIn(paymentData, raw.SecureModeReturnURL)
        );
      } catch (err) {
        reply.code(500).send({ error: true, message: err.message });
      }
    });

    api.post('/get-apple-pay-session', async (req, reply) => {
      try {
        reply.send(await getApplePaySession(req.body));
      } catch (err) {
        reply.code(500).send({ error: true, message: err.message });
      }
    });

    api.post('/create-applepay-payment', async (req, reply) => {
      try {
        reply.send(await createApplePayPayIn(req.body.PaymentData));
      } catch (err) {
        reply.code(500).send({ error: true, message: err.message });
      }
    });

    api.get('/saved-cards', async (_, reply) => {
      try {
        reply.send(await getSavedCards());
      } catch (err) {
        reply.code(500).send({ error: true, message: err.message });
      }
    });

    api.put('/deactivate-card', async (req, reply) => {
      try {
        reply.send(await deactivateCard(req.body.cardId));
      } catch (err) {
        reply.code(500).send({ error: true, message: err.message });
      }
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
        const res = await confirmRecurringCIT();
        reply.send(res);
      } catch (err) {
        reply.code(500).send({ error: true, message: err.message });
      }
    });

    api.setNotFoundHandler(async (_, reply) => {
      try {
        reply.code(404).send({ error: 'Not found' });
      } catch (err) {
        reply.code(500).send({ error: true, message: err.message });
      }
    });
  },
  { prefix: '/api' }
);

export const handler = awsLambdaFastify(app);
