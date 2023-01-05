import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    usd: 0,
    isLoading: false,
    error: ''
}

export const getUsdPrice = createAsyncThunk(
    'price/getUsdPrice',
    async (_, thunkApi) => {
        try {
            const response = await axios.get('https://api.tetherland.com/currencies')
            return response.data
        } catch (error) {
            throw thunkApi.rejectWithValue(error)
        }
    }
)

const priceSlice = createSlice({
    name: 'price',
    initialState,
    reducers: {
        setUsdPrice: (state, action) => {
            state.usd = action.payload
        }
    },
    extraReducers: (buider) => {
        buider.addCase(getUsdPrice.pending, (state) => {
            state.isLoading = true
            state.error = ""
        })
        buider.addCase(getUsdPrice.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.usd = payload.data.currencies.USDT.price
        })
        buider.addCase(getUsdPrice.rejected, (state, { payload }) => {
            state.isLoading = false
            console.log(payload)
            state.error = payload.message
        })
        // [getUsdPrice.pending] : (state) => state.isLoading = true,
        // [getUsdPrice.fulfilled] : (state, action) => {
        //     state.isLoading = false
        //     // state.usd = action.payload.stats.usdt-rls.bestSell
        //     console.log(action.payload)
        // },
        // [getUsdPrice.rejected] : (state, action) => {
        //     state.isLoading = false
        //     state.error = action.payload
        // }
    }
})

export const { setUsdPrice } = priceSlice.actions
export default priceSlice.reducer