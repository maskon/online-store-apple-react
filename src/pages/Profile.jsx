import Header from "../components/Header/Header"
import Basket from "../components/Basket/Basket"
import Footer from "../components/Footer/Footer"

function Profile() {
  return (
    <div className='wrapper'>
      <Header />
      <Basket />
      <div className='content'>
        <div className='container'>
          <div>Profile</div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Profile
