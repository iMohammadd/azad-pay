import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Layout from "../components/layout"
import { getUsdPrice } from "../features/price/priceSlice"

const Home = () => {
    const { usd } = useSelector(store => store.price)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsdPrice())
        axios.get('https://api.tetherland.com/currencies')
        .then(response => console.log(response.data.data))
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