import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId: 0,
  currentPage: 0,
  sort: { id: 0, property: "rating", how: "desc" }
}
// 15


const filterSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload
    },
    setSortType(state, action) {
      state.sort = action.payload
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    }
  }
})


export const { setCategoryId, setSortType, setCurrentPage } = filterSlice.actions

export default filterSlice.reducer
