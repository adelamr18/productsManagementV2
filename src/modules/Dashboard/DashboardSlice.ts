import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

import { GET_PRODUCTS } from "../../library/common/constants/Routes";
import { DashboardState } from "../../library/common/interfaces/Dashboard";
import { Product } from "../../library/common/interfaces/Product";
import api from "../../main/axios";
import { store } from "../../main/store/store";

const namespace = 'dashboard'

export const FetchDashboardData = createAsyncThunk(
  'dashboard/fetchDashboardData',
  async () => {
    const data = await api.get(GET_PRODUCTS);
    return data;
  }
)
const initialState = {
  loading: false,
  products: [],
  error: false,
  addedProducts: [],
  hasExceedingQuantityError: false
} as DashboardState;

interface AddProductPayload {
  product: Product;
  typedQuantity: number;
}

const dashboardSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    AddSelectedProduct(state: DashboardState, action: PayloadAction<AddProductPayload>) {
      const { id } = action.payload.product;
      const { typedQuantity } = action.payload;
      const products = [...state.products];
      const product = products.find((elem: Product) => elem.id === id);

      if (product) {
        if (typedQuantity > product?.quantity) {
          return {
            ...state,
            hasExceedingQuantityError: true
          }
        }
      }

      if ([...state.addedProducts].length) {
        const addedProducts = [...state.addedProducts];
        const previouslyAddedProduct = addedProducts.find((elem: Product) => elem.id === id);

        if (previouslyAddedProduct) {
          const product = products.find((elem: Product) => elem.id === id);
          if (product && (typedQuantity + previouslyAddedProduct.quantity <= product?.quantity)) {
            debugger;
            return {
              ...state,
              addedProducts: state.addedProducts.map((product: Product) => {
                if (product.id === previouslyAddedProduct.id) {
                  return {
                    ...product,
                    quantity: typedQuantity + previouslyAddedProduct.quantity
                  };
                }
                return product;
              })
            }
          } else {
            return {
              ...state,
              hasExceedingQuantityError: true
            }
          }

        }
      }


      return {
        ...state,
        hasExceedingQuantityError: false,
        addedProducts: state.addedProducts.concat(
          action.payload.product
        )
      }

    }
  },
  extraReducers: {
    [FetchDashboardData.pending.toString()](state: DashboardState) {
      state.loading = true;
    },
    [FetchDashboardData.fulfilled.toString()](state: DashboardState, { payload }) {
      state.loading = false;
      state.products = payload.data;
    },
    [FetchDashboardData.rejected.toString()](state: DashboardState) {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { AddSelectedProduct } = dashboardSlice.actions;

export type AppDispatch = typeof store.dispatch;

export default dashboardSlice.reducer;