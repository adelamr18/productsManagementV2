import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
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
interface DeleteProductPayload {
  id: string;
}

interface UpdateProductPayload {
  id: string;
  quantity: number;
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

    },
    DeleteProduct(state: DashboardState, action: PayloadAction<DeleteProductPayload>) {
      const { id } = action.payload;

      return {
        ...state,
        addedProducts: state.addedProducts.filter((product: Product) => product.id !== id)
      }
    },
    UpdateProduct(state: DashboardState, action: PayloadAction<UpdateProductPayload>) {
      const { id, quantity } = action.payload;

      return {
        ...state,
        addedProducts: state.addedProducts.map((product: Product) => {
          if (product.id === id) {
            return {
              ...product,
              quantity: quantity,
            };
          }
          return product;
        })
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

export const { AddSelectedProduct, DeleteProduct, UpdateProduct } = dashboardSlice.actions;

export type AppDispatch = typeof store.dispatch;

export default dashboardSlice.reducer;