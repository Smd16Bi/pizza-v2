import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchData = createAsyncThunk(
  'data/fetchDataStatus',
  async (path) => {
    const response = await axios.get(path);
    return response.data
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

export const { setItems } = dataSlice.actions
export default dataSlice.reducer