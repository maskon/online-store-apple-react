import Basket from "../components/Basket/Basket"
import Carts from "../components/Carts/Carts"
import Categories from "../components/Categories/Categories"
import Header from "../components/Header/Header"

function Home() {
  return (
    <>
      <Basket />
      <Header />
      <Categories />
      <Carts />
    </>
  )
}

export default Home
