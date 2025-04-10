import Basket from "../components/Basket/Basket"
import Header from "../components/Header/Header"
import Information from "../components/Information/Information"
import Footer from "../components/Footer/Footer"

function Info() {
  return (
    <div className='wrapper'>
      <Basket />
      <Header />
      <div className='content'>
        <Information />
      </div>
      <Footer />
    </div>
  )
}

export default Info
