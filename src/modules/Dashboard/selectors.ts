import { Selector } from "react-redux";

import { Product } from "../../library/common/interfaces/Product";
import { GlobalState } from "../../library/common/interfaces/global";

export const allProductsSelector: Selector<GlobalState, Product[]> = (state: GlobalState) => state.dashboard.products;
export const hasQuantityExceedingError: Selector<GlobalState, boolean> = (state: GlobalState) => state.dashboard.hasExceedingQuantityError;
export const addedProductsSelector: Selector<GlobalState, Product[]> = (state: GlobalState) => state.dashboard.addedProducts;
export const areProductsLoadingSelector: Selector<GlobalState, boolean> = (state: GlobalState) => state.dashboard.loading;
