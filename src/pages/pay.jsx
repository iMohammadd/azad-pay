import { useFormik } from "formik"
import QRCode from "react-qr-code"
import { useDispatch, useSelector } from "react-redux"
import Layout from "../components/layout"
import { setInvoiceAmount, setInvoiceCoin, toggleInvoiceShow } from "../features/invoice/invoiceSlice"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { entries } from "idb-keyval"
import { useEffect } from "react"
import { setCoin } from "../features/coin/coinSlice"

const Pay = () => {
    const { coin, amount, show } = useSelector(state => state.invoice)
    const { trc20, erc20, bep20, btc } = useSelector(state => state.coin)
    const { usd } = useSelector(state => state.price)
    const dispatch = useDispatch()
    const MySwal = withReactContent(Swal)

    useEffect(() => {
        const setTokens = () => {
            entries().then((tokens) => {
                tokens.forEach(token => {
                    dispatch(setCoin({
                        token: token[0],
                        address: token[1]
                    }))
                })
            })
        }
        setTokens()
    }, [])

    const dispatchable = (token, callback) => {
        if(token == '') {
            MySwal.fire({
                title: 'خطا',
                html: `<span className="rtl font-vazir">آدرس توکن انتخاب شده را در تنظیمات وارد نکرده‌اید</span>`,
                icon: 'warning'
            })
        } else {
            dispatch(toggleInvoiceShow())
            return callback
        }
    }

    const form = useFormik({
        initialValues: {
            token: 'trc20',
            irr: 0
        },
        onSubmit: values => {
            console.log(values)
            const amount = values.irr / usd
            console.log(amount.toFixed(6))
            dispatch(setInvoiceAmount(amount.toFixed(6)))
            switch(values.token) {
                case 'trc20':
                    dispatchable(trc20, dispatch(setInvoiceCoin(trc20)))
                    break
                case 'erc20':
                    dispatchable(erc20, dispatch(setInvoiceCoin(erc20)))
                    break
                case 'bep20':
                    dispatchable(bep20, dispatch(setInvoiceCoin(bep20)))
                    break
            }
            
        }
    })

    return (
        <Layout>
            <div className="rtl flex h-screen font-vazir">
                <div className="w-full m-auto">
                { show ? 
                (<div className="flex flex-col justify-center bg-white rounded px-4 py-6 mx-4 mb-16">
                    <QRCode
                                size={256}
                                className="mx-auto"
                                value={`${coin}?amount=${amount}`}
                                level={'L'}
                            />
                            <span className="text-center text-sm my-2 w-full overflow-hidden">
                                {`در حال ارسال ${amount} دلار به آدرس `}<br />
                                <input className="w-full text-xs text-center" type="text" value={coin} disabled /><br />
                                {`هستید`}
                            </span>
                            <button
                            onClick={() => dispatch(toggleInvoiceShow())}
                            className="px-4 py-2 mt-4 mx-auto transition ease-in-out duration-300 bg-cyan-600 hover:bg-cyan-800 text-white rounded-md">فاکتور جدید</button>
                </div>) 
                : 
                (<form onSubmit={form.handleSubmit}>
                    <div className="bg-white rounded px-4 py-6 mx-4 mb-16">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="pr-2 font-bold">
                                مبلغ به تومان
                            </label>
                            <input 
                                name="irr" 
                                type="number"
                                pattern="\d*"
                                className={`px-2 py-3 rounded-md rounded-b-none border-b-2 ${form.touched.irr && form.errors.irr ? 'border-b-red-600 bg-red-50' : 'border-b-cyan-400 bg-gray-50'} focus:outline-none focus:border-b-cyan-800 transition ease-in-out duration-300`} 
                                onChange={form.handleChange}
                                value={form.values.irr}
                            />
                            <span className={`${form.touched.irr && form.errors.irr ? '' : 'hidden'} text-red-600 text-xs -mt-2`}>
                                {form.errors.irr}
                            </span>
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <span className="pr-2 font-bold">توکن</span>
                            <ul className="grid w-full gap-4 md:grid-cols-3">
                                <li>
                                    <input type="radio" id="trc20" name="token" value="trc20" className="hidden peer" onChange={form.handleChange} />
                                    <label htmlFor="trc20" className="inline-flex items-center justify-between w-full p-5 border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600">
                                        <div className="block">
                                            <div className="w-full text-lg font-semibold">USDT</div>
                                            <div className="w-full">TRC20</div>
                                        </div>
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" id="erc20" name="token" value="erc20" className="hidden peer" onChange={form.handleChange} />
                                    <label htmlFor="erc20" className="inline-flex items-center justify-between w-full p-5 border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600">
                                        <div className="block">
                                            <div className="w-full text-lg font-semibold">USDT</div>
                                            <div className="w-full">ERC20</div>
                                        </div>
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" id="bep20" name="token" value="bep20" className="hidden peer" onChange={form.handleChange} />
                                    <label htmlFor="bep20" className="inline-flex items-center justify-between w-full p-5 border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600">
                                        <div className="block">
                                            <div className="w-full text-lg font-semibold">USDT</div>
                                            <div className="w-full">BEP20</div>
                                        </div>
                                    </label>
                                </li>
                            </ul>
                            {/* <label htmlFor="name" className="pr-2 font-bold">
                                توکن رمز ارز
                            </label>
                            <select 
                                onChange={form.handleChange}
                                name="token"
                                className={`px-2 py-3 rounded-md rounded-b-none border-b-2 ${form.touched.token && form.errors.token ? 'border-b-red-600 bg-red-50' : 'border-b-cyan-400 bg-gray-50'} focus:outline-none focus:border-b-cyan-800 transition ease-in-out duration-300`} 
                            >
                                <option id="trc20" value="trc20">USDT trc20</option>
                                <option id="erc20" value="erc20">USDT erc20</option>
                                <option id="bep20" value="bep20">USDT bep20</option>
                            </select> */}
                        </div>
                        <div className="mt-4">
                            <button type="submit" className="px-4 py-2 transition ease-in-out duration-300 bg-cyan-600 hover:bg-cyan-800 text-white w-full rounded-md">ایجاد فاکتور</button>
                        </div>
                    </div>
                </form>)
                }
                </div>
            </div>
        </Layout>
    )
}

export default Pay