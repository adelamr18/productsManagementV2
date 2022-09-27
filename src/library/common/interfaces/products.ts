export interface Product {
    id: string;
    productName: string;
    price: number;
    quantity: number;
}

export interface ProductsState {
    allProducts: Product[]
}