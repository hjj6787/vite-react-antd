import { configureStore } from "@reduxjs/toolkit";
import userSlices from "./user/userSlices";

export default configureStore({
  reducer: {
    user: userSlices,
  },
});
