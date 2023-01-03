import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    coin: '',
    amount: 0,
    show: false
}

const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        setInvoiceCoin: (state, action) => {state.coin = action.payload},
        setInvoiceAmount: (state, action) => {state.amount = action.payload},
        toggleInvoiceShow: state => {state.show = !state.show}
    }
})

export const { setInvoiceCoin, setInvoiceAmount, toggleInvoiceShow } = invoiceSlice.actions
export default invoiceSlice.reducer