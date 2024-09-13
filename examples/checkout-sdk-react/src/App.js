import { useState } from 'react';
import './App.css';
import MangopayCheckout from './MangopayCheckout';
import CardFormElement from './CardFormElement';

function App() {
  const [activeComponent, setActiveComponent] = useState('MangopayCheckout');
  const [showComponent, setShowComponent] = useState(true);

  const handleComponentChange = (component) => {
    // setShowComponent(false);
    // setTimeout(() => {
    setActiveComponent(component);
    //   setShowComponent(true);
    // }, 0);
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
          {showComponent && activeComponent === 'MangopayCheckout' && <MangopayCheckout />}
          {showComponent && activeComponent === 'CardFormElement' && <CardFormElement />}
        </div>
      </div>
    </div>
  );
}

export default App;
