import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP_STATUS } from "../../library/common/constants/thunkConstants";

import api from "../../main/axios";
import { store } from "../../main/store/store";

const namespace = 'dashboard'

export const fetchDashboardData = createAsyncThunk(
    'dashboard/fetchDashboardData',
    async () => {
        const data = await api.get('http://localhost:3005/api/products');
        return data;
    }
)

const dashboardSlice = createSlice({
    name: namespace,
    initialState: {
      loading: '',
      data: null,
      errorMessage: null,
    },
    reducers: {},
    extraReducers: {
      [fetchDashboardData.pending.toString()](state: any) {
        state.loading = HTTP_STATUS.PENDING
      },
      [fetchDashboardData.fulfilled.toString()](state, { payload }) {
        state.loading = HTTP_STATUS.FULFILLED
        state.data = payload
      },
      [fetchDashboardData.rejected.toString()](state, { error }) {
        state.loading = HTTP_STATUS.REJECTED
        state.errorMessage = error.message
      },
    },
  });

  export type AppDispatch = typeof store.dispatch;

  export default dashboardSlice.reducer;