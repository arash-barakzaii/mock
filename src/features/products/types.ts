export interface Product {
  name: string;
  slug?: string;
  description?: string;
  price: number;
  imageUrl?: string;
  tags?: string[];
  manufacturer?: string;
  itemType?: string;
  [key: string]: any;
}

export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  sortBy: 'name' | 'price-asc' | 'price-desc';
  tagFilter: string | null;
  selectedProduct: Product | null;
}