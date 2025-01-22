import { useState } from "react"
import styles from "./Header.module.scss"
import Basket from "../Basket/Basket"
import { SlBasket } from "react-icons/sl"
import { FcLike } from "react-icons/fc"
import { FcBusinessman } from "react-icons/fc"

function Header() {
  const [basket, setBasket] = useState(false)

  const openBasket = () => setBasket(true)

  const closeBasket = () => setBasket(false)

  return (
    <header className={styles.header}>
      <div className='container'>
        <div className={styles.item}>
          <p>LOGO</p>
          <div className={styles.item}>
            <button className={styles.block} onClick={openBasket}>
              <SlBasket />
              <span>1205 руб.</span>
            </button>
            <Basket basket={basket} closeBasket={closeBasket} />
            <button className={styles.block}>
              <FcLike />
              <span>Закладки</span>
            </button>
            <button className={styles.block}>
              <FcBusinessman />
              <span>Профиль</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
