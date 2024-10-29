import { createSlice } from '@reduxjs/toolkit';

import { allTours, addTour, tourDelete, tourEdit, authorTour, tourAccept } from './thunkActions';
import { TourType, UserType } from '../types';


type InitialStateType = {
  tours: TourType[];
  tourAuthor: UserType;
};

const initialState: InitialStateType = {
  tours: [],
  tourAuthor: {
    id: 0,
    firstName: '',
    lastName: '',
    experience: 0,
    aboutMe: '',
    rating: 0,
    quantity: 0,
  }
};

const tourSlice = createSlice({
  name: 'tourSlice',
  initialState,
  reducers: {
    increment(state) {
      state.count += 1;
    },
    decrement(state) {
      state.count -= 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(allTours.fulfilled, (state, action) => {
      state.tours = action.payload;
    });

    builder.addCase(addTour.fulfilled, (state, action) => {
      state.tours.push(action.payload);
      // console.log(action.payload, 'я экшн пэйлоад add');
    });
    builder.addCase(tourDelete.fulfilled, (state, action) => {
      state.tours = state.tours.filter((el) => el.id !== action.payload);
    });
    builder.addCase(tourEdit.fulfilled, (state, action) => {

        state.tours=state.tours.map((el) => el.id == action.payload.id ? action.payload : el)
        // console.log(action.payload, 'я экшн пэйлоад на редактирование');
    })
    builder.addCase(authorTour.fulfilled, (state, action) => {
      state.tourAuthor=action.payload
    })
    builder.addCase(tourAccept.fulfilled, (state, action) => {
      state.tours = state.tours.map((el) =>
        el.id == action.payload.id ? action.payload : el
      );
    });
  },
});


export default tourSlice.reducer;
export const { increment, decrement } = tourSlice.actions;
