import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    coin: '',
    amount: 0
}

const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        setInvoiceCoin: (state, action) => state.coin = action.payload,
        setInvoiceAmount: (state, action) => state.amount = action.payload
    }
})

export const { setInvoiceCoin, setInvoiceAmount } = invoiceSlice.actions
export default invoiceSlice.reducer