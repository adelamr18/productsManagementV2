import { Product } from "./Product";

export interface DashboardState {
    loading: boolean;
    products: Product[];
    error: boolean;
}