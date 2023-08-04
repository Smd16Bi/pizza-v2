import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type Sort = {
  id: number;
  property: 'rating' | 'price' | 'title';
  how: 'desc' | 'asc';
};

interface FilterState {
  categoryId: number;
  currentPage: number;
  label: string;
  searchValue: string;
  sort: Sort;
}

const initialState: FilterState = {
  categoryId: 0,
  currentPage: 0,
  label: 'All',
  searchValue: '',
  sort: { id: 0, property: 'rating', how: 'desc' },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState: initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setLabel(state, action) {
      state.label = action.payload;
    },
    setFilters(state, action) {
      const { categoryId, currentPage, sortType } = action.payload;
      state.categoryId = Number(categoryId);
      state.currentPage = Number(currentPage);
      state.sort = {
        id: Number(sortType.id),
        property: sortType.property,
        how: sortType.how,
      };
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setSortType, setCurrentPage, setSearchValue, setFilters, setLabel } = filterSlice.actions;

export default filterSlice.reducer;
// 24 35: 15
