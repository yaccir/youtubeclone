import { createSlice } from "@reduxjs/toolkit";

const youtubeSlice=createSlice({
name:"youtube",
initialState:{
    items:[],
    token:false
},
reducers:{
    fetchvid:(state,action)=>{
        state.items=(action.payload)

    },
    settoken:(state,action)=>{
        state.token=action.payload;
    }


}

});

export const {fetchvid,settoken}=youtubeSlice.actions;
export default youtubeSlice.reducer;