import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import addressSlice from './addressSlice';
import shippingOptionsReducer from './shippingOptionsSlice';
import orderReducer from './orderSlice';
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        address: addressSlice,
        shippingOptions: shippingOptionsReducer,
        orders: orderReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
