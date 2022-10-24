import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from '../../modules/Dashboard/DashboardSlice';
import shippingReducer from '../../modules/Shipping/ShippingSlice';

export const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        shipping: shippingReducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

});