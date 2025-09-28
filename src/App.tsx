import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import VegetablesList from './components/VegetablesList';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './store/store';
import {
  addToCart,
  changeQuantity,
  removeFromCart,
} from './store/vegetablesSlice';

interface BasketItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  count: number;
}

function App() {
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const cart = useSelector((state: RootState) => state.vegetables.cart);
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = (item: BasketItem) => {
    dispatch(addToCart(item));
  };

  const handleChangeCount = (id: number | string, count: number) => {
    dispatch(changeQuantity({ id, count }));
  };

  const handleRemove = (id: number | string) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <MantineProvider>
        <Header
          basket={cart}
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
          onChangeCount={handleChangeCount}
          onRemove={handleRemove}
        />
        <VegetablesList onAddToCart={handleAddToCart} />
      </MantineProvider>
    </>
  );
}

export default App;
