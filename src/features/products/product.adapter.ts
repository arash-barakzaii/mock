import type { UiProduct } from './types';

/**
 * Mappt die rohe JSON-Struktur auf unser UI-Modell.
 * ⚡ MORGEN: Hier die Feldnamen an die neue JSON anpassen!
 */
export function mapToUiProduct(raw: any): UiProduct {
  return {
    id: String(raw.slug ?? raw.id ?? raw.imageHash),
    title: raw.name ?? raw.title ?? 'Unknown',
    price: Number(raw.price ?? 0),
    imageUrl: raw.imageUrl ?? raw.image,
    tags: raw.tags ?? [],
    category: raw.itemType ?? raw.category,
    description: raw.description,
  };
}

export function mapProducts(rawData: any[]): UiProduct[] {
  return rawData.map(mapToUiProduct);
}