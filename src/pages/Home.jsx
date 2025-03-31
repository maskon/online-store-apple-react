import Basket from "../components/Basket/Basket"
import Header from "../components/Header/Header"
import Categories from "../components/Categories/Categories"
import Carts from "../components/Carts/Carts"
import Footer from "../components/Footer/Footer"

function Home() {
  return (
    <div className='wrapper'>
      <Basket />
      <Header />
      <div className='content'>
        <Categories />
        <Carts />
      </div>
      <Footer />
    </div>
  )
}

export default Home
