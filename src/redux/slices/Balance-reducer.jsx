import { createSlice } from "@reduxjs/toolkit";


const balanceSlice = createSlice({
    name: "balance",
    initialState: {totalBalance:0 },
    reducers: {
        setTotalBalance: (state,action) =>{
            state.totalBalance = action.payload;
        }
    }

});

export const {setTotalBalance} = balanceSlice.actions;
export default balanceSlice.reducer;