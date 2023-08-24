# Vault SDK Example

<h4 align="center">
 ℹ️ Code Sample coming soon.
</h4>
<br />

## Introduction

The Mangopay Vault SDK allows you to securely tokenize an end user’s payment card for use in your application. A tokenized card is a virtual and secure version of the card that can be used for payment.

It is very highly recommended that you use the Mangopay Vault SDK, rather than integrating the API endpoints directly. By doing so, you:

- Avoid sensitive card details transiting your system
- Benefit from PCI-DSS compliance
- Receive ongoing support and updates

<aside>
<img src="https://www.notion.so/icons/square-alternate_lightgray.svg" alt="https://www.notion.so/icons/square-alternate_lightgray.svg" width="40px" /> **Prerequisites**

To use the Mangopay Vault SDK, you’ll need:

- A Mangopay `ClientId` and API key
- A User to register the card for (see [Testing - Payment methods](https://preview-documentation.swarm.preprod.mangopay.com/docs/dev-tools/testing/payment-methods) for test cards)
</aside>

## Installation

You can install the Mangopay Vault SDK using [npm](https://www.npmjs.com/package/@mangopay/vault-sdk) or yarn. 

### Install with npm

```jsx
npm install --save @mangopay/vault-sdk
```

### Install with Yarn

```jsx
yarn add @mangopay/vault-sdk
```

## Creating the Card Registration

In your backend, create the Card Registration via the Mangopay API, using the `Id` of the end user as the `UserId` .

You must also define the currency and type of the card at this stage.

<aside>
<img src="https://www.notion.so/icons/square-alternate_gray.svg" alt="https://www.notion.so/icons/square-alternate_gray.svg" width="40px" /> **POST** /v2.01/`ClientId`/cardregistrations

```json
{
    "Tag": "Created with the Mangopay Vault SDK",
    "UserId": "193020185",
    "CardType": "CB_VISA_MASTERCARD",
    "Currency": "EUR"
}
```

[See parameter details →](https://preview-documentation.swarm.preprod.mangopay.com/docs/endpoints/direct-card-payins#create-card-registration)

</aside>

### API response

```json
{
    "Id": "193020188",
    "Tag": null,
    "CreationDate": 1686147148,
    "UserId": "193020185",
    "AccessKey": "1X0m87dmM2LiwFgxPLBJ",
    "PreregistrationData": "XBDYiG8w9PrylPS01KmupZunmK2QRHKIC-yUF6il3aIpAnKba1TGkR9VJe5lHjHt2ddFLVXdicolcUIkv_kKEA",
    "RegistrationData": null,
    "CardId": null,
    "CardType": "CB_VISA_MASTERCARD",
    "CardRegistrationURL": "https://homologation-webpayment.payline.com/webpayment/getToken",
    "ResultCode": null,
    "ResultMessage": null,
    "Currency": "EUR",
    "Status": "CREATED"
}
```

The data obtained in the response will be used in the `preregistrationData` defined below.

## Initializing the SDK

Initialize the SDK with your `ClientId` and select your environment (Sandbox or Production). 

```jsx
import { MangopayVault } from '@mangopay/vault-sdk';

const options = {
  clientId: 'your-mangopay-client-id',
	environment: 'SANDBOX | PRODUCTION',
};

const vault = MangopayVault.initialize(options);
```

## Providing data for tokenization

The SDK requires the following information to tokenize the card:

- The end user’s card details (`cardInfoObject`) entered on the payment page (see [Testing - Payment methods](https://preview-documentation.swarm.preprod.mangopay.com/docs/dev-tools/testing/payment-methods) for test cards)
- The Card Registration data (`preregistrationData`) previously returned by the Mangopay API

### cardInfoObject

| Property | Type | Description |
| --- | --- | --- |
| cardNumber | string | The card number to be tokenized, without any separators. |
| cardExpirationDate | string (Format: “MMYY”) | The expiration date of the card. |
| cardCvx | string | The card verification code (on the back of the card, usually 3 digits). |

### preregistrationData

| Property | Type | Description |
| --- | --- | --- |
| Id | string | The unique identifier of the Card Registration object. |
| CardRegistrationURL                                                                     | string | The URL to which the card details are sent to be tokenized. |
| AccessKey | string | The secure value used when tokenizing the card. |
| PreregistrationData | string | A specific value passed to the CardRegistrationURL. |
| errors | MgpTypedError | A generic type describing the https://mangopay.com/docs/errors/error-report that is returned in case of an error. |

### Data for tokenization

```jsx
const cardInfoObject = {
  cardNumber: '4970107111111119',
  cardExpirationDate: '1127',
  cardCvx: '123',
};

const preregistrationData = {
  id: createCardRegistrationResult.Id,
  cardRegistrationURL: createCardRegistrationResult.CardRegistrationURL,
  accessKeyRef: createCardRegistrationResult.AccessKey,
  data: createCardRegistrationResult.PreregistrationData,
};
```

## Tokenizing the card

You can now tokenize the card with the card data obtained previously using the frontend SDK.

The SDK automatically updates the Card Registration object to provide you with a `CardId` that can be used for payments. 

### tokenizePaymentMethod

```jsx
const tokenizePaymentMethodResult = await vault.tokenizePaymentMethod(cardInfoObject, preregistrationData);
```

### tokenizePaymentMethodResult

```json
{
  "AccessKey": "1X0m87dmM2LiwFgxPLBJ",
  "CardId": "193441306",
  "CardRegistrationURL": "https://homologation-webpayment.payline.com/webpayment/getToken",
  "CardType": "CB_VISA_MASTERCARD",
  "CreationDate": 1686643376,
  "Currency": "EUR",
  "Id": "193440893",
  "PreregistrationData": "_nfGWK2M2AY-H3lgOikqrLj8AggrYxTmIT6E0-gC3pi_kanrlI9ECtUTFz9bpEPj2ddFLVXdicolcUIkv_kKEA",
  "RegistrationData": "data=acIcnwwLleiAvlZUea5VxRdiKSkTpQi9C_4mwMDZj2dVqeVp2t5Ale0bTDDR67xRZV7S6MnMEyJzhjosylCjNfKlVqHrO6v9_p3mEzQNSjd6qFPuWUQSA1IhgrZj4v4eNx0xgKTVnyDj15oG8jR88g",
  "ResultCode": "000000",
  "ResultMessage": "Success",
  "Status": "VALIDATED",
  "Tag": null,
  "UserId": "193020185"
}
```

| Property | Type | Description |
| --- | --- | --- |
| AccessKey | string | The secure value used when tokenizing the card. |
| CardId | string | The unique identifier of the Card object. |
| CardRegistrationURL                                                                     | string | The URL to which the card details are sent to be tokenized. |
| CardType | string | The type of the card. |
| CreationDate | timestamp | The date and time at which the object was created. |
| Currency | string | The currency of the card. |
| Id | string | The unique identifier of the Card Registration object. |
| PreregistrationData | string | A specific value passed to the CardRegistrationURL. |
| RegistrationData | string | The string returned by the tokenization server after tokenizing the card. |
| ResultCode | string | The code indicating the result of the operation. This information is mostly used to https://mangopay.com/docs/errors/error-codes or for filtering purposes. |
| ResultMessage | string | The explanation of the result code. |
| Status | string | The status of the card registration:
• CREATED – The card registration has been created, but no RegistrationData has been entered yet and the CardId value is null.
• VALIDATED – The card registration has been successfully updated with the RegistrationData from the tokenization server.
• ERROR – The card registration couldn’t be updated with the RegistrationData and no CardId was generated. For more information, refer to the ResultCode (105206, 105299) and ResultMessage. |
| Tag | string | Custom data that can be added to this object.
In the case of the Card Registration, this parameter can be used to facilitate the link between the User object and its equivalent on your platform for instance. This value will be inherited by the Card object Tag parameter and will not be editable. |
| UserId | string | The unique identifier of the user the card belongs to. |
| errors | MgpTypedError | A generic type describing the https://mangopay.com/docs/errors/error-report that is returned in case of an error. |

## Managing cards

You can use the following endpoints to manage cards: 

- [View a Card](https://mangopay.com/docs/endpoints/direct-card-payins#view-card) provides key information about the card, including its `Fingerprint` which can be used as an [anti-fraud tool](https://mangopay.com/docs/concepts/payments/payment-methods/card/anti-fraud-tools#card-fingerprint)
- [Deactivate a Card](https://mangopay.com/docs/endpoints/direct-card-payins#deactivate-card) allows you to irreversibly set the card as inactive

## Making card pay-ins

You can use a registered card (`CardId`) for pay-ins with the following objects:

- [The Direct Card PayIn object](https://mangopay.com/docs/endpoints/direct-card-payins#direct-card-payin-object), for one-shot card payments
- [The Recurring PayIn Registration object](https://preview-documentation.swarm.preprod.mangopay.com/docs/endpoints/recurring-card-payins#recurring-payin-registration-object), for recurring card payments
- [The Preauthorization object](https://preview-documentation.swarm.preprod.mangopay.com/docs/endpoints/preauthorizations#preauthorization-object), for 7-day preauthorized card payments
- [The Deposit Preauthorization object](https://preview-documentation.swarm.preprod.mangopay.com/docs/endpoints/preauthorizations#deposit-preauthorization-object), for 30-day preauthorized card payments

## Related resources

- [Testing - Payment methods](https://mangopay.com/docs/dev-tools/testing/payment-methods)
- [All supported payment methods](https://mangopay.com/docs/concepts/payments/payment-methods/all)