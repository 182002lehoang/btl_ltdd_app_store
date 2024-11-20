import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Order = {
  id: string;
  products: Array<any>;
  shippingOption: string;
  totalAmount: number;
  shippingAddress: string;
};

interface OrderState {
  orders: Order[];
  orderStatus: 'idle' | 'loading' | 'success' | 'error';
}

const initialState: OrderState = {
  orders: [],
  orderStatus: 'idle',
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    placeOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
      state.orderStatus = 'success';
    },
    setOrderStatus(state, action: PayloadAction<'idle' | 'loading' | 'error'>) {
      state.orderStatus = action.payload;
    },
  },
});

export const { placeOrder, setOrderStatus } = orderSlice.actions;

export default orderSlice.reducer;
