import { useEffect } from "react"
import Layout from "../components/layout"

const About = () => {
    useEffect(() => {
        document.title = 'About Page'
    }, [])

    return (<>
        <Layout>
            <h1 className=" text-3xl font-extrabold uppercase">About</h1>
        </Layout>
    </>)
}

export default About