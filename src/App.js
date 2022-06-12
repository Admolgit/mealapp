import { useState } from 'react';
import Header from '../src/Components/Layout/Header';
import Meals from './Components/Meals/Meals';
import Cart from '../src/Components/Cart/Cart';
import CartProvider from './store/cart-provider';
import Footer from '../src/Components/Layout/Footer';

function App() {

  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  }

  const hideCartHandler = () => {
    setCartIsShown(false);
  }

  return (
    <CartProvider>
      { cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
      <Footer />
    </CartProvider>
  );
}

export default App;
