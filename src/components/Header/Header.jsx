import { useStore } from "../../store/store"

import { SlBasket } from "react-icons/sl"
import { FcLike } from "react-icons/fc"
import { FcBusinessman } from "react-icons/fc"

import styles from "./Header.module.scss"

function Header() {
  const { cart, openBasket } = useStore()

  return (
    <header className={styles.header}>
      <div className='container'>
        <div className={styles.item}>
          <p>LOGO</p>
          <div className={styles.item}>
            <button className={styles.block} onClick={openBasket}>
              <SlBasket />
              <span>
                {cart.length ? cart.reduce((sum, current) => sum + current.price, 0).toLocaleString() : 0} руб.
              </span>
            </button>
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
