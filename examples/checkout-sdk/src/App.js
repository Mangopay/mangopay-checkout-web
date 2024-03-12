import logo from './logo.svg';
import './App.css';
import { cardOptions } from './payment-methods/card';
import { paypalOptions } from './payment-methods/paypal';
import {useEffect} from 'react'

const { REACT_APP_PROFILING_MERCHANT_ID, REACT_APP_CLIENT_ID } = process.env;

const checkoutHandler = async () => {

    const options = {
        clientId: REACT_APP_CLIENT_ID,
        environment: "SANDBOX",
        profilingMerchantId: REACT_APP_PROFILING_MERCHANT_ID,
        amount: {
          value: "20000",
          currency: "EUR"
        },
        paymentMethods: [cardOptions, paypalOptions ]
     };
    
    const sdkElement = document.querySelector("#checkoutForm");

    const mangopaySdk = await CheckoutSdk.loadCheckoutSdk(sdkElement,options);
    
    mangopaySdk.on('tokenizationComplete', (event) => {
            console.log("tokenizationComplete", event)
            Toast.fire({
                icon: "success",
                title: "Tokenization successful - CardId ("+event.detail.CardId+")"
            });
    })
    mangopaySdk.on('paymentComplete', (event) => {
            console.log("paymentComplete", event)
            Toast.fire({
                icon: "success",
                title: "Payment successful"
            });
    })
    mangopaySdk.on('error', (event) => {
        console.log("Error", event)
        Toast.fire({
            icon: "error",
            title: "Error occured"
        });
    })
    
  return mangopaySdk;
}

const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});



function App() {
  let mangopaySdk
  useEffect(() => {
    if (!mangopaySdk)
        mangopaySdk = checkoutHandler()
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        
      <div id="checkoutForm"></div>
 
      </header>
    </div>
  );
}

export default App;
