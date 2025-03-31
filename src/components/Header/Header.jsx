import { Link } from "react-router"
import { IoLogoApple } from "react-icons/io5"
import { SlBasket } from "react-icons/sl"
import { FcLike } from "react-icons/fc"
import { FcBusinessman } from "react-icons/fc"

import { useStore } from "../../store/store"
import { useStoreBasket } from "../../store/basket.store"

import Number from "../Number/Number"

import styles from "./Header.module.scss"

function Header() {
  const { cart, favorites } = useStore()
  const { openBasket } = useStoreBasket()

  return (
    <header className={styles.header}>
      <div className='container'>
        <div className={styles.item}>
          <Link to='/' className={styles.logo}>
            <IoLogoApple className={styles.img} />
            <p>apple</p>
          </Link>
          <div className={styles.item}>
            <button className={styles.block} onClick={openBasket}>
              <SlBasket />
              <span className={styles.text}>
                {cart.length ? cart.reduce((sum, current) => sum + current.price, 0).toLocaleString() : 0} ₽
              </span>
              <Number number={cart} />
            </button>
            <Link to='/favorites'>
              <button className={styles.block}>
                <FcLike />
                <span className={styles.text}>Закладки</span>
                <Number number={favorites} />
              </button>
            </Link>
            {/* <Link to='/profile'>
              <button className={styles.block}>
                <FcBusinessman />
                <span className={styles.text}>Профиль</span>
              </button>
            </Link> */}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
