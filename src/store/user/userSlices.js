import { createSlice } from "@reduxjs/toolkit";

export const userSclice=createSlice({
    name:'user',
    initialState:{
        commom:{
            route:[]
        }
    },
    reducers:{
        adduserrouter(state,action){
            // state.commom.route=[...action.payload]
            console.log(state.commom.route,action.payload);
        }
    }
})

export const {adduserrouter} =userSclice.actions

export default userSclice.reducer