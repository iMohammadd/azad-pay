import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Layout from "../components/layout"
import { getUsdPrice } from "../features/price/priceSlice"

const Home = () => {
    const { usd } = useSelector(store => store.price)
    const dispatch = useDispatch()
    const { error } = useSelector(state => state.price)

    useEffect(() => {
        dispatch(getUsdPrice())
    }, [])
    return (
        <Layout>
            <div className="flex h-screen text-lg font-vazir rtl py-6 text-center">
                { error == "" ? (
                    <div className="m-auto w-full bg-slate-800 rounded px-4 py-6">
                        <span className="text-gray-300">قیمت دلار</span><br />
                        <span className="text-4xl text-gray-100 font-extrabold">{(usd)}</span>
                    </div>
                ) : (
                    <div className="m-auto w-full bg-red-700 rounded px-4 py-6">
                        <span className="text-gray-300">خطا در دریافت قیمت دلار</span><br />
                        <span className="text-gray-100">لطفا اتصالتان به اینترنت را برقرار کنید</span>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default Home