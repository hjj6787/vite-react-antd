import { createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";

const gatewaySlices = createSlice({
  name: "gateway",
  initialState: {
    iplist: [],
    ipblist: [],
  },
  reducers: {
    setip(state, action) {
      return produce(state, (draft) => {
        // console.log("addfiles");
        draft.iplist = [...action.payload];
      });
    },
    setbip(state, action) {
      return produce(state, (draft) => {
        // console.log("addfiles");
        draft.ipblist = [...action.payload];
      });
    },
  },
});

export const { setip, setbip } = gatewaySlices.actions;

export default gatewaySlices.reducer;
