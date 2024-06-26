# 🔀 &nbsp; Changelog

## 1.1.1 (2024-03-11)
 

### Bug Fixes
  * *CARD*: Fixed issue where `onTokenizationComplete` failed to trigger when `onCreatePayment` was utilized. Now, events will consistently fire regardless of the use of `onCreatePayment`. Please note the following:

    1. If `onCreatePayment` is used, the SDK will promptly advance to the subsequent step in the process by invoking `onCreatePayment` after `onTokenizationComplete`, subsequently initiating a 3DS redirect.
    2. `onCreatePayment(data)` provides you with the cardId required for payment within the data parameter.



## 1.1.0 (2024-02-29)

### Features & Improvements
 * Changed package name: The package name has been changed from `sdk-loader` to `checkout-sdk`.

     * Subseuqently: `MangopaySdkLoader` has been renamed to `MangopayCheckout`
  
 * PayPal payment method support: Added the ability for customers to pay via PayPal in addition to credit/debit cards. PayPal is now available as a payment option during the checkout flow.
    
 * Introduced new `onPaymentComplete` event: Developers can now listen for the `onPaymentComplete` event, which is triggered after a payment is successfully completed. This allows for customized post-payment logic or analytics tracking.
    
* Introduced new `onCreateCardRegistration` delegate: The `onCreateCardRegistration` delegate gives developers control over making card registration creation optional during the Payment session. It is only called when the shooper clicks the "Pay" button for card payment.
    
* Introduced new `onCreatePayment` delegate: The `onCreatePayment` delegate is called when the user is ready to pay. Developers can use this to make a backend request for the transaction details and return the corresponding payment method object.
    
* Improved 3DS workflow: The 3D Secure (3DS) authentication workflow for card payments is now handled entirely within the SDK. Developers no longer need to separately install and integrate a 3DS component.
    
* Introduced `profillingMerchantId`: When initializing the SDK, developers must now provide a `profillingMerchantId` for risk profiling and fraud prevention purposes.
    
* Added support for CB (Cartes Bancaires): The CB (Cartes Bancaires) card network has been added to the list of `supportedCardBrands`.
    
* Renamed `paymentConfiguration` to `amount`: The paymentConfiguration option in the configuration object has been renamed to `amount` for clarity.
    
* Removed red error message from iframe: The red error message previously printed in the iframe has been removed. Errors are now communicated via the onError event callback.

* Added currency support for card payments: Support has been added for the following currencies for card payments: AED, AUD, CAD, CHF, DKK, EUR, GBP, HKD, JPY, NOK, PLN, SEK.


### Bug Fixes
  * Enforced `supportedCardBrands` for card form: The `supportedCardBrands` option now correctly drives the visible card networks displayed on the card form during checkout.
