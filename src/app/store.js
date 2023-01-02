import { configureStore } from '@reduxjs/toolkit'
import coinReducer from '../features/coin/coinSlice'
import priceReducer from '../features/price/priceSlice'
import invoiceReducer from '../features/invoice/invoiceSlice'

export const store = configureStore({
    reducer: {
        coin: coinReducer,
        price: priceReducer,
        invoice: invoiceReducer
    }
})