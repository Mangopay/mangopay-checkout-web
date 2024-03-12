const BE_API = process.env.REACT_APP_BACKEND_API | ''; 

export const paypalOptions =  {
        type: "paypal",
        options: {
		  onCreatePayment: (data) => createPayment(data)
        }
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