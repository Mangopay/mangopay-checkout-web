import { useEffect, useState } from 'react';
import MangopayCheckout from '../components/MangopayCheckout';
import CardFormElement from '../components/CardFormElement';
import { getSavedCards } from '../api/get-saved-card';

function Home() {
  const [activeComponent, setActiveComponent] = useState('MangopayCheckout');
  const [savedCards, setSavedCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
          {loading ? (
            <div className="spinner"></div>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <>
              {activeComponent === 'MangopayCheckout' && <MangopayCheckout savedCards={savedCards} />}
              {activeComponent === 'CardFormElement' && <CardFormElement savedCards={savedCards} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
