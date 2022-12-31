import { configureStore } from '@reduxjs/toolkit'
import coinReducer from '../features/coin/coinSlice'

export const store = configureStore({
    reducer: {
        coin: coinReducer
    }
})