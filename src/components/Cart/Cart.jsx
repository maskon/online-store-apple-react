import { FaRegSquarePlus } from "react-icons/fa6"
import { IoCheckmarkCircleSharp } from "react-icons/io5"
import { GoHeartFill } from "react-icons/go"

import { useState, useEffect } from "react"

import { useStore } from "../../store/store"

import styles from "./Cart.module.scss"

function Cart({ product }) {
  const { cart, addToCart, removeFromCart, addToFavorites, favorites, removeFromFavorites } = useStore()
  const [isAdded, setIsAdded] = useState(false)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const exists = cart.some((item) => item.id === product.id)
    const reside = favorites.some((item) => item.id === product.id)
    setIsAdded(exists)
    setIsActive(reside)
  }, [cart, product.id, favorites])

  const addToBookmarks = () => {
    if (isActive) {
      removeFromFavorites(product.id)
      setIsActive(false)
    } else {
      addToFavorites(product)
      setIsActive(true)
    }
  }

  const handleClick = () => {
    if (isAdded) {
      removeFromCart(product.id)
      setIsAdded(false)
    } else {
      addToCart(product)
      setIsAdded(true)
    }
  }

  return (
    <article className={styles.col}>
      <div className={styles.cart}>
        <button onClick={addToBookmarks} className={!isActive ? styles.heart : styles.active}>
          <GoHeartFill />
        </button>
        <div className={styles.img}>
          <img src={product.img} alt={product.title} />
        </div>
        <h3>{product.title}</h3>
        <div className={styles.block}>
          <div>
            <span className={styles.text}>ЦЕНА:</span>
            <span className={styles.price}>{product.price.toLocaleString()} руб.</span>
          </div>
          <button className={styles.plus} onClick={handleClick}>
            {isAdded ? <IoCheckmarkCircleSharp /> : <FaRegSquarePlus />}
          </button>
        </div>
      </div>
    </article>
  )
}

export default Cart
