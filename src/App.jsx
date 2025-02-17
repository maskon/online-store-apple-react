import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
import Profile from "./pages/Profile"

function App() {
  return (
    <Router basename='/online-store-apple-react'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App
