import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    admin: null,
    profile_pic: null,
    admins: null,
    isFetching: false,
    isError: false,
    isLoggedin: false,
    message: null,
    socketRef: null,
    deviceToken: null,
  },
  reducers: {
    Start: (state) => ({ ...state, isFetching: true }),
    isLoginSuccess: (state, action) => ({
      ...state,
      isFetching: false,
      isLoggedin: true,
      admin: action.payload,
      profile_pic: action.payload.profile_pic,
      message: null,
    }),
    Failure: (state, action) => ({
      ...state,
      isFetching: false,
      isError: true,
      message: action.payload,
    }),
    logoutSuccess: (state) => ({ ...state, isLoggedin: false, admin: null ,profile_pic:null }),
    profilePicSuccess: (state  , action) => ({ ...state, profile_pic : action.payload }),
    deviceTokenSuccess: (state, action) => ({ ...state, deviceToken: action.payload }),
  },
});

export const { Start, isLoginSuccess, Failure, logoutSuccess , profilePicSuccess , deviceTokenSuccess  } = adminSlice.actions;
export default adminSlice.reducer;
