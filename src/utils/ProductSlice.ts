import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BanckEndItem } from '../@types/general';

interface InitialState {
  items: BanckEndItem[];
  status: string | null;
  error: string | null;
}

const initialState: InitialState = {
  items: [],
  status: null,
  error: null,
};

export const productsFetch = createAsyncThunk(
  'products/productsFetch',
  async () => {
    const response = await axios.post('http://localhost:8080/products', {
      page_size: 4,
      page_number: 5,
      keyword: 'Laptop',
    });
    return response.data as BanckEndItem[];
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productsFetch.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(productsFetch.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload;
      })
      .addCase(productsFetch.rejected, (state) => {
        state.status = 'rejected';
      });
  },
});

export default productsSlice.reducer;