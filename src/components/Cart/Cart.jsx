import { useState, useEffect } from "react"
import { useStore } from "../../store/store"
import { FaRegSquarePlus } from "react-icons/fa6"
import { IoCheckmarkCircleSharp } from "react-icons/io5"
import styles from "./Cart.module.scss"

function Cart({ product, addToCart }) {
  const { cart, removeFromCart } = useStore()
  const [isAdded, setIsAdded] = useState(false)

  useEffect(() => {
    const exists = cart.some((item) => item.id === product.id)
    setIsAdded(exists)
  }, [cart, product.id])

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
