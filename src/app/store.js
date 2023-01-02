import { configureStore } from '@reduxjs/toolkit'
import coinReducer from '../features/coin/coinSlice'
import priceReducer from '../features/price/priceSlice'

export const store = configureStore({
    reducer: {
        coin: coinReducer,
        price: priceReducer
    }
})