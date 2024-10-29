import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import tourSlice from './tourSlice'
import commentSlice from './commentSlice'
import orderSlice from './orderSlice';

const storeOptions = {
  reducer: {
    userSlice,
    tourSlice,
    commentSlice,
    orderSlice,

  },
};

export const store = configureStore(storeOptions);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
