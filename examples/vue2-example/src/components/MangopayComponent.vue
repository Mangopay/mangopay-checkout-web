<script type="text/ecmascript-6">
import {cardOptions} from '@/payment-methods/card';
import {CheckoutSdk} from '@mangopay/checkout-sdk';

export default {
  mounted() {
    this.initMangoPaySDK();
  },
  data() {
    return {
      mangopaySdk: null,
      currency: 'EUR',
      mangoTermsAccepted: true
    };
  },
  methods: {
    error(event) {
      console.log('error', event.detail.error.ResultMessage);
    },
    async paymentComplete(event) {
      console.log('event paymentComplete');
      console.log(event);
    },
    async initMangoPaySDK() {
      console.log('event initMangoPaySDK');
      const options = {
        clientId: import.meta.env.VITE_CLIENT_ID,
        profilingMerchantId: import.meta.env.VITE_PROFILING_MERCHANT_ID,
        environment: 'SANDBOX',
        supportedCardBrands: ['VISA', 'MASTERCARD', 'CB'],
        amount: {
          'currency': this.currency,
          'value': 1000
        },
        paymentMethods: [
          cardOptions
        ]
      };

      try {
        this.mangopaySdk = await CheckoutSdk.loadCheckoutSdk('#container', options);
        if (!this.mangopaySdk) {
          throw new Error('Failed to load MangopayCheckoutSdk');
        }
      } catch (error) {
        console.log('initSdk error');
        console.log(error);
      }

      this.mangopaySdk.on('paymentComplete', this.paymentComplete);
      this.mangopaySdk.on('error', this.error);
    }
  }
};
</script>

<template>
  <div>
    <div id="container"></div>
  </div>
</template>
