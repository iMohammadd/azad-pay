import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUsdPrice } from "../features/price/priceSlice"
import Home from "./home"

const Splash = () => {
    const { isLoading, error } = useSelector(store => store.price)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsdPrice())
        if(error == "" && isLoading == false) {
            console.log('its ok')
            window.history.replaceState({}, "", '/home')
        } else {
            console.log('oh no')
        }
    }, [])
    return (<>
            { error == "" && !isLoading && (
                <Home />
            )} 
            { isLoading && (
                <div className="flex h-screen w-full bg-cyan-900 text-lg font-vazir rtl py-6 text-center">
                    <div className="m-auto w-full">
                        <span className="text-gray-300">Azad Pay</span>
                    </div>
                </div>
            )}
            { error != "" && (
                <div className="flex h-screen w-full bg-red-700 text-lg font-vazir rtl text-center">
                    <div className="m-auto w-full text-center text-gray-200">
                        <span>خطا در ارتباط با سرور</span>
                    </div>
                </div>
            )}
        </>)
}

export default Splash