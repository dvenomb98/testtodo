import type { NextPage } from "next"
import OuterFooter from "../components/Footers/OuterFooter"
import Header from "../components/Header/Header"

import Navbar from "../components/Header/Navbar"
import Faq from "../components/Page/Faq"
import Features from "../components/Page/Features"
import Newsletter from "../components/Page/Newsletter"
import Pricing from "../components/Page/Pricing"



const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Features />
      <Pricing />
      <Faq />
      <Newsletter />
      <OuterFooter />
    </>
  )
}

export default Home
