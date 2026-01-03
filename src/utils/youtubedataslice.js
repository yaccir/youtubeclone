import { createSlice } from "@reduxjs/toolkit";

const youtubeSlice=createSlice({
name:"youtube",
initialState:{
    items:[],
    token:false,
    burger:false
},
reducers:{
    fetchvid:(state,action)=>{
        state.items=(action.payload)

    },
    settoken:(state,action)=>{
        state.token=action.payload;
    },
    setburger:(state)=>{
        state.burger=!state.burger;
    }


}

});

export const {fetchvid,setburger,settoken}=youtubeSlice.actions;
export default youtubeSlice.reducer;