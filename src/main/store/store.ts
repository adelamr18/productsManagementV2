import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from '../../modules/Dashboard/DashboardSlice';

export const store = configureStore({
    reducer: {
        dashboard: dashboardReducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

});