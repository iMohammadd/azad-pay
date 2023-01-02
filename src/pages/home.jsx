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
            <p>
                قیمت دلار {usd}
            </p>
        </Layout>
    )
}

export default Home