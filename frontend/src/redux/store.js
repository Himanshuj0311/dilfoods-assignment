import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import menuReducer from './menuSlice';
import orderReducer from './orderSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
    order: orderReducer,
  },
});

export default store;
