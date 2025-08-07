import { useEffect, useState } from 'react';
import MangopayCheckout from '../components/MangopayCheckout';
import CardFormElement from '../components/CardFormElement';
import PaymentExamples from '../components/PaymentExamples';
import CheckoutConfiguration from '../components/CheckoutConfiguration';
import { getSavedCards } from '../api/get-saved-card';

function Home() {
  const [activeComponent, setActiveComponent] = useState('MangopayCheckout');
  const [savedCards, setSavedCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [respectPaymentMethodsOrder, setRespectPaymentMethodsOrder] = useState(false);

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  useEffect(() => {
    const fetchSavedCards = async () => {
      setLoading(true);
      setError(null);
      try {
        const cards = await getSavedCards();
        setSavedCards(cards);
      } catch (err) {
        setError('Failed to fetch saved cards.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedCards();
  }, []);

  return (
    <div className="App">
      <div className="App-content">
        <header className="app-header">
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#e0e0e0' }}>
            Mangopay Checkout SDK Demo
          </h1>
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
        </header>

        <main className="app-main">
          <aside className="sidebar">
            <PaymentExamples />
            <CheckoutConfiguration
              respectPaymentMethodsOrder={respectPaymentMethodsOrder}
              onToggle={setRespectPaymentMethodsOrder}
            />
          </aside>

          <div className="main-content">
            <div className="checkout-container">
              {loading ? (
                <div className="spinner"></div>
              ) : error ? (
                <p className="error">{error}</p>
              ) : (
                <>
                  {activeComponent === 'MangopayCheckout' && (
                    <MangopayCheckout savedCards={savedCards} respectPaymentMethodsOrder={respectPaymentMethodsOrder} />
                  )}
                  {activeComponent === 'CardFormElement' && <CardFormElement savedCards={savedCards} />}
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
