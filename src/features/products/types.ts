// UI-Modell - bleibt IMMER gleich!
export interface UiProduct {
  id: string;
  title: string;
  price: number;
  imageUrl?: string;
  tags: string[];
  category?: string;
  description?: string;
}

export interface ProductsState {
  items: UiProduct[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  sortBy: 'title' | 'price-asc' | 'price-desc';
  tagFilter: string | null;
  selectedProduct: UiProduct | null;
}