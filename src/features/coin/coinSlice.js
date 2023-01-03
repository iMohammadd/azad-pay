import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    trc20: 'trcxyz',
    erc20: 'ercxyz',
    bep20: 'bepxyz',
    btc: ''
}

export const coinSlice = createSlice({
    name: 'coin',
    initialState,
    reducers: {
        setCoin: (store, action) => {
            switch (action.payload.type) {
                case 'usdt-trc20':
                    store.trc20 = action.payload.address
                    break
                case 'usdt-erc20':
                    store.erc20 = action.payload.address
                    break
                case 'usdt-bep20':
                    store.bep20 = action.payload.address
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