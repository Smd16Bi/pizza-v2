import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId: 0,
  currentPage: 0,
  label: "All",
  searchValue: "",
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
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload
    },
    setLabel(state, action) {
      state.label = action.payload
    },
    setFilters(state, action) {
      const { categoryId, currentPage, sortType } = action.payload;
      state.categoryId = Number(categoryId)
      state.currentPage = Number(currentPage)
      state.sort = {
        id: Number(sortType.id),
        property: sortType.property,
        how: sortType.how
      }
    }
  }
})

export const selectFilter = (state) => state.filter;

export const { setCategoryId, setSortType, setCurrentPage, setSearchValue, setFilters, setLabel } = filterSlice.actions

export default filterSlice.reducer
