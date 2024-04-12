import { createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";

export const userSclice = createSlice({
  name: "user",
  initialState: {
    commom: {
      route: [],
    },
  },
  reducers: {
    adduserrouter(state, action) {
      return produce(state, (draft) => {
        draft.commom.route = [...action.payload];
      });
    },
  },
});

export const { adduserrouter } = userSclice.actions;

export default userSclice.reducer;
