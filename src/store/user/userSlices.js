import { createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";

export const userSclice = createSlice({
  name: "user",
  initialState: {
    commom: {},
    token: "",
    ISlogin: false,
    userdata: {},
  },
  reducers: {
    adduserrouter(state, action) {
      return produce(state, (draft) => {
        draft.commom.route = [...action.payload];
      });
    },
    loginfu(state, action) {
      console.log(action);
      return produce(state, (draft) => {
        draft.token = action.payload.token;
        draft.ISlogin = true;
      });
    },
    adduserdata(state, action) {
      return produce(state, (draft) => {
        draft.userdata = action.payload.userdata;
      });
    },
    loginoutfu(state, action) {
      return produce(state, (draft) => {
        draft.userdata = {};
        draft.ISlogin = false;
        draft.token = "";
        loginitTime = "";
      });
    },
  },
});

export const { adduserrouter, loginfu, adduserdata, loginoutfu } =
  userSclice.actions;

export default userSclice.reducer;
