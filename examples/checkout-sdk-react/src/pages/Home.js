import { useState } from 'react';
import MangopayCheckout from '../components/MangopayCheckout';
import CardFormElement from '../components/CardFormElement';

function Home() {
  const [activeComponent, setActiveComponent] = useState('MangopayCheckout');

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="App">
      <div className="App-content">
        <div className="button-group">
          <button
            className={activeComponent === 'MangopayCheckout' ? 'button active' : 'button'}
            onClick={() => handleComponentChange('MangopayCheckout')}
          >
            Mangopay Checkout
          </button>
          <button
            className={activeComponent === 'CardFormElement' ? 'button active' : 'button'}
            onClick={() => handleComponentChange('CardFormElement')}
          >
            Card Form Element
          </button>
        </div>

        <div className="checkout-container">
          {activeComponent === 'MangopayCheckout' && <MangopayCheckout />}
          {activeComponent === 'CardFormElement' && <CardFormElement />}
        </div>
      </div>
    </div>
  );
}

export default Home;
