import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Layout from "../components/layout"
import { setUsdPrice } from "../features/price/priceSlice"

const Home = () => {
    const { usd } = useSelector(store => store.price)
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get('https://api.tetherland.com/currencies')
        .then(response => {
            dispatch(setUsdPrice(response.data.data.currencies.USDT.price))
        })
        .catch(err => console.log(err))
    }, [])
    return (
        <Layout>
            <p className="flex h-screen text-lg font-vazir rtl py-6 text-center">
                <div className="m-auto w-full bg-slate-800 rounded px-4 py-6">
                    <span className="text-gray-300">قیمت دلار</span><br />
                    <span className="text-4xl text-gray-100 font-extrabold">{(usd)}</span>
                </div>
            </p>
        </Layout>
    )
}

export default Home