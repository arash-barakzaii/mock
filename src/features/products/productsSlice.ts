import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UiProduct, ProductsState } from './types';
import { mapProducts } from './product.adapter';

const API_URL = 'http://localhost:3001';

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = await fetch(`${API_URL}/items`);
  const rawData = await res.json();
  return mapProducts(rawData);  // ← Adapter nutzen!
});

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  searchTerm: '',
  sortBy: 'title',
  tagFilter: null,
  selectedProduct: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'title' | 'price-asc' | 'price-desc'>) => {
      state.sortBy = action.payload;
    },
    setTagFilter: (state, action: PayloadAction<string | null>) => {
      state.tagFilter = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<UiProduct | null>) => {
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