import { createSlice } from '@reduxjs/toolkit'
import * as db from 'idb-keyval'

const initialState = {
    trc20: '',
    erc20: '',
    bep20: '',
    btc: ''
}

export const coinSlice = createSlice({
    name: 'coin',
    initialState,
    reducers: {
        setCoin: (store, action) => {
            switch (action.payload.token) {
                case 'trc20':
                    store.trc20 = action.payload.address
                    db.set('trc20', action.payload.address)
                    break
                case 'erc20':
                    store.erc20 = action.payload.address
                    db.set('erc20', action.payload.address)
                    break
                case 'bep20':
                    store.bep20 = action.payload.address
                    db.set('bep20', action.payload.address)
                    break
                case 'btc':
                    store.btc = action.payload.address
                    db.set('btc', action.payload.address)
                    break
            }
        }
    }
})

export const { setCoin } = coinSlice.actions
export default coinSlice.reducer