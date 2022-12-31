import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    usdt: {
        trc20: '',
        erc20: '',
        bep20: ''
    },
    btc: ''
}

export const coinSlice = createSlice({
    name: 'coin',
    initialState,
    reducers: {
        setCoin: (store, action) => {
            switch (action.payload.type) {
                case 'usdt-trc20':
                    store.usdt.trc20 = action.payload.address
                    break
                case 'usdt-erc20':
                    store.usdt.erc20 = action.payload.address
                    break
                case 'usdt-bep20':
                    store.usdt.bep20 = action.payload.address
                    break
                case 'btc':
                    store.btc = action.payload.address
                    break
            }
        }
    }
})

export const { setCoin } = coinSlice.actions
export default coinSlice.reducer