import Basket from "../components/Basket/Basket"
import Header from "../components/Header/Header"
import Favorite from "../components/Favorite/Favorite"
import Footer from "../components/Footer/Footer"

function Favorites() {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <Basket />
        <Favorite />
      </div>
      <Footer />
    </div>
  )
}

export default Favorites
