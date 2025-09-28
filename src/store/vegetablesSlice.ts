import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchVegetables } from './vegetablesThunks';

export interface Vegetable {
  id: number | string;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Vegetable {
  count: number;
}

interface VegetablesState {
  products: Vegetable[];
  cart: CartItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: VegetablesState = {
  products: [],
  cart: [],
  isLoading: false,
  error: null,
};

const vegetablesSlice = createSlice({
  name: 'vegetables',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Vegetable[]>) {
      state.products = action.payload;
    },
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.count = Math.min(
          existingItem.count + action.payload.count,
          99
        );
      } else {
        state.cart.push(action.payload);
      }
    },
    changeQuantity(
      state,
      action: PayloadAction<{ id: number | string; count: number }>
    ) {
      const item = state.cart.find((i) => i.id === action.payload.id);
      if (item) {
        item.count = action.payload.count;
      }
    },
    removeFromCart(state, action: PayloadAction<number | string>) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    clearCart(state) {
      state.cart = [];
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVegetables.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVegetables.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchVegetables.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка загрузки данных';
      });
  },
});

export const {
  setProducts,
  addToCart,
  changeQuantity,
  removeFromCart,
  clearCart,
  setLoading,
  setError,
} = vegetablesSlice.actions;

export default vegetablesSlice.reducer;
