import { configureStore } from "@reduxjs/toolkit";
import balanceReducer from './slices/Balance-reducer.jsx'

const store = configureStore({
    reducer: ({
        balance: balanceReducer
    })
})

export default store;