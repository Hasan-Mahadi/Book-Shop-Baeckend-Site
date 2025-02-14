export interface TProduct {
  title: string;
  author: string;
  price: number;
  // error:string;
  category: 'Fiction' | 'Science' | 'SelfDevelopment' | 'Poetry' | 'Religious';
  description?: string | null;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  inStock?: boolean | null | undefined;
}
