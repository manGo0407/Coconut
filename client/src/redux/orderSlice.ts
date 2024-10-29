import { createSlice } from '@reduxjs/toolkit';
import { OrderType } from '../types';
import {
  accepteOrder,
  allOrders,
  deleteOrder,
  oneOrder,
  orderCreate,
} from './thunkActions';

type OrdersStateType = {
  orders: OrderType[];
  order: OrderType | object;
};

const initialState: OrdersStateType = {
  orders: [],
  order: {}

};

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(allOrders.fulfilled, (state, action) => {
      if (action.payload !== null) {
        state.orders = action.payload;
     }
    });
    builder.addCase(orderCreate.fulfilled, (state, action) => {
       state.orders.push(action.payload);
    });
    // Получение заказа из редакса
    builder.addCase(oneOrder.fulfilled, (state, action) => {
      state.order = action.payload
    });
    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      state.orders = state.orders.filter((el) => el.id !== Number(action.payload));
    });
    builder.addCase(accepteOrder.fulfilled, (state, action) => {
      state.orders = state.orders.map((el) =>
        el.id === action.payload.id ? action.payload : el
      );
    });
  },
});

export default orderSlice.reducer;
