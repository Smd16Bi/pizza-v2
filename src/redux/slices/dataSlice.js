import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchData = createAsyncThunk(
  'data/fetchDataStatus',
  async (path, thunkAPI) => {
    const response = await axios.get(path);
    if (response.data.length === 0) {
      return thunkAPI.rejectWithValue("Pizzas are empty")
    }

    return thunkAPI.fulfillWithValue(response.data);
  }
)

const initialState = {
  items: [],
  status: "loading"
}

const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.status = "loading"
      state.items = []
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = "success"
    });
    builder.addCase(fetchData.rejected, (state) => {
      state.status = "error"
      state.items = []
    });
  }
})

export const selectData = (state) => state.data;

export const { setItems } = dataSlice.actions
export default dataSlice.reducer