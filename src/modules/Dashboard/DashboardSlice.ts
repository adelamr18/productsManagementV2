import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { GET_PRODUCTS } from "../../library/common/constants/Routes";
import { DashboardState } from "../../library/common/interfaces/Dashboard";
import api from "../../main/axios";
import { store } from "../../main/store/store";

const namespace = 'dashboard'

export const fetchDashboardData = createAsyncThunk(
    'dashboard/fetchDashboardData',
    async () => {
        const data = await api.get(GET_PRODUCTS);
        return data;
    }
)
const initialState = {} as DashboardState;

const dashboardSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {},
    extraReducers: {
      [fetchDashboardData.pending.toString()](state: DashboardState) {
        state.loading = true;
      },
      [fetchDashboardData.fulfilled.toString()](state: DashboardState, { payload }) {
        state.loading = false;
        state.products = payload.data;
      },
      [fetchDashboardData.rejected.toString()](state: DashboardState) {
        state.loading = false;
        state.error = true;
      },
    },
  });

  export type AppDispatch = typeof store.dispatch;

  export default dashboardSlice.reducer;