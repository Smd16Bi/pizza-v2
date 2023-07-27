import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  items: []
}


const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(obj =>
        obj.id === action.payload.id
        && obj.type === action.payload.type
        && obj.size === action.payload.size);
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload, count: 1
        })
      }
    },
    removeItem(state, action) {
      state.items.filter(el => el.id !== action.payload)
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
        (accumulator, item) => accumulator + (item.price * item.count)
        , 0);
    }
  }
})


export const { addItem, removeItem, clearItems, getTotalPrice, getTotalCount } = cartSlice.actions

export default cartSlice.reducer
