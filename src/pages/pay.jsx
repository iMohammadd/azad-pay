import { useFormik } from "formik"
import QRCode from "react-qr-code"
import { useDispatch, useSelector } from "react-redux"
import Layout from "../components/layout"
import { setInvoiceAmount, setInvoiceCoin, toggleInvoiceShow } from "../features/invoice/invoiceSlice"

const Pay = () => {
    const { coin, amount, show } = useSelector(state => state.invoice)
    const { trc20, erc20, bep20, btc } = useSelector(state => state.coin)
    const { usd } = useSelector(state => state.price)
    const dispatch = useDispatch()

    const form = useFormik({
        initialValues: {
            token: 'trc20',
            irr: 0
        },
        onSubmit: values => {
            console.log(values)
            console.log(values.irr / usd)
            dispatch(setInvoiceAmount(values.irr / usd))
            switch(values.token) {
                case 'trc20':
                    dispatch(setInvoiceCoin(trc20))
                    break
                case 'erc20':
                    dispatch(setInvoiceCoin(erc20))
                    break
                case 'bep20':
                    dispatch(setInvoiceCoin(bep20))
                    break
            }
            dispatch(toggleInvoiceShow())
        }
    })

    return (
        <Layout>
            <div className="rtl font-vazir px-4 py-6 bg-white rounded mx-4">
                { show ? 
                (<div className="flex flex-col justify-center">
                    <QRCode
                        size={256}
                        className="mx-auto"
                        value={`${coin}?amount=${amount}`}
                        level={'L'}
                    />
                    <button
                    onClick={() => dispatch(toggleInvoiceShow())}
                    className="px-4 py-2 mt-4 mx-auto transition ease-in-out duration-300 bg-cyan-600 hover:bg-cyan-800 text-white rounded-md">فاکتور جدید</button>
                </div>) 
                : 
                (<form onSubmit={form.handleSubmit}>
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
                        <label htmlFor="name" className="pr-2 font-bold">
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
                        </select>
                    </div>
                    <div className="mt-4">
                        <button type="submit" className="px-4 py-2 transition ease-in-out duration-300 bg-cyan-600 hover:bg-cyan-800 text-white w-full rounded-md">ایجاد فاکتور</button>
                    </div>
                </form>)
                }
            </div>
        </Layout>
    )
}

export default Pay