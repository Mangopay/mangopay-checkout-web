import { deactivateSavedCard } from '../api/deactivate-saved-card';
import { createCardDirectPayIn } from '../api/create-card-direct-pay-in';
import { createCardRegistration } from '../api/create-card-registration';

export const cardOptions = {
  enableSaveCard: true,
  supportedCardBrands: ['CB', 'VISA', 'MAESTRO', 'MASTERCARD'],
  onCreateCardRegistration: (cardType) => createCardRegistration(cardType),
  onCreatePayment: (data) => createCardDirectPayIn(data),
  onDeactivateSavedCard: deactivateSavedCard,
};
