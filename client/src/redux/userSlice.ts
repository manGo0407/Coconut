import { createSlice } from '@reduxjs/toolkit';
import {
  userCheckSession,
  userLogin,
  userLogout,
  userRegister,
  userUpdate,
} from './thunkActions';


const initialState = {
  user: {
    login: null,
    id: null,
    role: null,
    photoUser: null,
    firstName: null,
    lastName: null,
    experience: null,
    age: null,
    aboutMe: null,
    resetToken: null,
  },
 
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userRegister.fulfilled, (state, action) => {
      // console.log('action.payload', action.payload);
      state.user = action.payload;
    });
    
    builder.addCase(userCheckSession.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(userLogout.fulfilled, (state, action) => {
      state.user = initialState;
    });
    builder.addCase(userUpdate.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default userSlice.reducer;
