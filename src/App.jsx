import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import Layout from "./components/layout"
import { setCoin } from "./features/coin/coinSlice"

function App() {
  const dispatch = useDispatch()
  // dispatch(setCoin({
  //   type: 'btc',
  //   address: '0x1111122222222'
  // }))
  return (<>
    <Layout>
    <h1 className=" font-bold text-3xl">hola</h1>
    </Layout>
  </>)
}

export default App
