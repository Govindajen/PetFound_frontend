'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    username: null,
    rank: null,
    firstname: null,
    lastname: null,
    location: null,
    email: null,
    token: null,
    profileImg: null,
    lang: 'en',
    latitude: 0,
    longitude: 0
  },
};

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
      setLogin: (state, action) => {
          state.value.username = action.payload.username;
          state.value.rank = action.payload.rank;
          state.value.firstname = action.payload.firstname;
          state.value.lastname = action.payload.lastname;
          state.value.location = action.payload.location;
          state.value.email = action.payload.email;
          state.value.token = action.payload.token;
          state.value.profileImg = action.payload.profileImg;
      },
      setLogout: (state) => {
          state.value.username = null;
          state.value.rank = null;
          state.value.firstname = null;
          state.value.lastname = null;
          state.value.location = null;
          state.value.email = null;
          state.value.token = null;
          state.value.profileImg = null;
      },
      setCoordinates: (state, action) => {
        state.value.longitude = action.payload.longitude;
        state.value.latitude = action.payload.latitude;
    },
      setLangReducer: (state, action) => {
        console.log(action.payload)
        if (action.payload === 'en') {
          console.log('set EN')
         state.value.lang = 'en'
        } else if (action.payload === 'fr') {
          console.log('set FR')
         state.value.lang = 'fr'
        }
      }
    },
  });
  
  export const { setLogin, setLogout, setLangReducer, setCoordinates } = accountSlice.actions;
  export default accountSlice.reducer;
  