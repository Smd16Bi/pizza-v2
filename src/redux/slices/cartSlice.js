import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  items: []
}
// 16 вип 58:42

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(obj => obj.uniqId === action.payload.uniqId);
      findItem ? findItem.count++ : state.items.push({ ...action.payload, count: 1 });
    },
    changeCount(state, action) {
      const findItem = state.items.find(obj => obj.uniqId === action.payload.id);
      switch (action.payload.type) {
        case "plus":
          if (findItem) findItem.count++;
          break;
        case "minus":
          if (findItem) findItem.count--;

          if (findItem.count <= 0) {
            state.items = state.items.filter(el => el.uniqId !== action.payload.id)
          }
          break;
        default:
          break;
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter(el => el.uniqId !== action.payload);
    },
    clearItems(state) {
      state.items = []
    },
    getTotalCount(state) {
      state.totalCount = state.items.reduce(
        (accumulator, item) => accumulator + item.count
        , 0);
    },
    getTotalPrice(state) {
      state.totalPrice = state.items.reduce(
        (accumulator, item) => accumulator + (item.price * item.count), 0);
    }
  }
})


export const { addItem, changeCount, removeItem, clearItems, getTotalPrice, getTotalCount } = cartSlice.actions

export default cartSlice.reducer
