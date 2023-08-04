import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  uniqId: string;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  totalCount: number;
  items: CartItem[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.uniqId === action.payload.uniqId);
      findItem ? findItem.count++ : state.items.push({ ...action.payload, count: 1 });
    },
    changeCount(state, action: PayloadAction<{ id: string; type: string }>) {
      const findItem = state.items.find((obj) => obj.uniqId === action.payload.id);
      switch (action.payload.type) {
        case 'plus':
          if (findItem) findItem.count++;
          break;
        case 'minus':
          if (findItem) findItem.count--;

          if (findItem && findItem.count <= 0) {
            state.items = state.items.filter((el) => el.uniqId !== action.payload.id);
          }
          break;
        default:
          break;
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((el) => el.uniqId !== action.payload);
    },
    clearItems(state) {
      state.items = [];
    },
    getTotalCount(state) {
      state.totalCount = state.items.reduce((accumulator, item) => accumulator + item.count, 0);
    },
    getTotalPrice(state) {
      state.totalPrice = state.items.reduce((accumulator, item) => accumulator + item.price * item.count, 0);
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const { addItem, changeCount, removeItem, clearItems, getTotalPrice, getTotalCount } = cartSlice.actions;

export default cartSlice.reducer;
