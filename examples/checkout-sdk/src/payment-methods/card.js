
const BE_API = 'https://qy9ybxo620.execute-api.us-west-2.amazonaws.com/dev'; 


export const cardOptions =  {
        type: "card",
        options: {
          supportedCardBrands: ["CB", "VISA", "MAESTRO", "MASTERCARD" ],
          onCreateCardRegistration: (cardType) => createCardRegistration(cardType),
		  onCreatePayment: (paymentMehod) => createPayment(paymentMehod)
        }
}

const createCardRegistration = async (cardType) => {
    
   const response = await fetch(BE_API +  "/create-card-registration",{
        method: 'POST',
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify({
            "CardType": cardType
        })
      });

  const cardRegistration = await response.json();
  return cardRegistration;
  
}

const createPayment = async (paymentMethod) => {
    
  const {Currency, CardId, profilingAttemptReference } =  paymentMethod

  const response = await fetch(BE_API +  "/create-card-direct-payin",{
    method: 'POST',
    headers: { "Content-Type" : "application/json"},
    body: JSON.stringify({
        cardId: CardId, 
        profilingAttemptReference, 
        currency: Currency,
        amount: "2000"
    },)
  });
  const payin =  await response.json();
  console.log(payin);
  return payin
}