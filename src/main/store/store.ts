import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import dashboardReducer from '../../modules/Dashboard/DashboardSlice';

export const store = configureStore({
    reducer: {
        dashboard: dashboardReducer
    }
});