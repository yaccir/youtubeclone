import { createSlice } from "@reduxjs/toolkit";

const youtubeSlice=createSlice({
name:"youtube",
initialState:{
    items:[],
},
reducers:{
    fetchvid:(state,action)=>{
        state.items=(action.payload)

    }

}

});

export const {fetchvid}=youtubeSlice.actions;
export default youtubeSlice.reducer;