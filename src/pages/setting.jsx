import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import * as yup from "yup"
import Layout from "../components/layout"
import { setCoin } from "../features/coin/coinSlice"


const Setting = () => {
    const dispatch = useDispatch()
    const tokenSchema = yup.object({
        address: yup.string().required('آدرس کیف پول را وارد کنید'),
        token: yup.string().required('یک توکن را انتخاب کنید')
    })
    const form = useFormik({
        initialValues: {
            address: '',
            token: ''
        },
        validationSchema: tokenSchema,
        onSubmit: (values, {resetForm}) => {
            dispatch(setCoin({
                token: values.token,
                address: values.address
            }))
            resetForm()
        }
    })
    return (<>
        <Layout>
            <div className="rtl flex h-screen font-vazir mb-16">
                <div className="m-auto w-full bg-white rounded px-6 py-4">
                    <form onSubmit={form.handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="addres" className="pr-2 font-bold">
                                آدرس کیف پول
                            </label>
                            <input 
                                name="address" 
                                type="text"
                                className={`px-2 py-3 rounded-md rounded-b-none border-b-2 ${form.touched.address && form.errors.address ? 'border-b-red-600 bg-red-50' : 'border-b-cyan-400 bg-gray-50'} focus:outline-none focus:border-b-cyan-800 transition ease-in-out duration-300`} 
                                onChange={form.handleChange}
                                value={form.values.address}
                            />
                            <span className={`${form.touched.address && form.errors.address ? '' : 'hidden'} text-red-600 text-xs -mt-2`}>
                                {form.errors.address}
                            </span>
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
                            </div>
                            <div className="mt-4">
                                <button type="submit" className="px-4 py-2 transition ease-in-out duration-300 bg-cyan-600 hover:bg-cyan-800 text-white w-full rounded-md">ثبت آدرس توکن</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    </>)
}

export default Setting