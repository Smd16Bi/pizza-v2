import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export const fetchData = createAsyncThunk('data/fetchDataStatus', async (path: string, thunkAPI) => {
  const response = await axios.get(path);
  if (response.data.length === 0) {
    return thunkAPI.rejectWithValue('Pizzas are empty');
  }

  return thunkAPI.fulfillWithValue(response.data);
});

type PizzaItem = {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
  sizes: [];
  types: [];
};

interface PizzaSliceState {
  items: PizzaItem[];
  status: 'loading' | 'success' | 'error';
}

const initialState: PizzaSliceState = {
  items: [],
  status: 'loading',
};

const dataSlice = createSlice({
  name: 'data',
  initialState: initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchData.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });
  },
});

export const selectData = (state: RootState) => state.data;

export const { setItems } = dataSlice.actions;
export default dataSlice.reducer;
