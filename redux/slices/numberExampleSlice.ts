import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const numberSlice = createSlice({
    name: "number",
    initialState: 0,
    reducers: {
        increment: (state: number, action: PayloadAction<number>) =>{
            state+= 5
           return state
        },
        decrement: (state: number, action: PayloadAction<number>) =>{
            state = state-1;
        },
        incrementByTen: (state: number, action: PayloadAction<number>) =>{
            state = state+= 10;
            return state
        }
    }
})
export const {increment, decrement, incrementByTen} = numberSlice.actions
export default numberSlice.reducer