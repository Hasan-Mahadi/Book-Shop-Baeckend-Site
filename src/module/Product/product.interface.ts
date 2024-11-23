
  export interface TProduct{
    title:string,
    author: string,
    price: number,
    category: 'Fiction'|'Science'| 'SelfDevelopment'| 'Poetry'| 'Religious'
    description?: string | null,
    quantity:number,
    inStock?: boolean | null | undefined
}