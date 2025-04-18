export interface TProduct {
  author: string;
  _id?: string;
  name: string;
  brand: string;
  price: number;
  model: string;
  rating: number;
  stock: number;
  image: string; // Added image field
  // error:string;
  category: 'Fiction' | 'Science' | 'SelfDevelopment' | 'Poetry' | 'Religious';
  description?: string | null;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  inStock?: boolean | null | undefined;
}
