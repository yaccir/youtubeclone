import { configureStore } from "@reduxjs/toolkit";
import youtubereducer from "./youtubedataslice"


const store=configureStore({
    reducer:{
        youtube:youtubereducer
    }

})
export default store;