import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product, ProductsState } from './types';

const API_URL = 'http://localhost:3001';

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = await fetch(`${API_URL}/items`);
  return res.json();
});

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  searchTerm: '',
  sortBy: 'name',
  tagFilter: null,        // NEU
  selectedProduct: null,  // NEU
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'name' | 'price-asc' | 'price-desc'>) => {
      state.sortBy = action.payload;
    },
    setTagFilter: (state, action: PayloadAction<string | null>) => {
      state.tagFilter = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to load products';
      });
  },
});

export const { setSearchTerm, setSortBy, setTagFilter, setSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;