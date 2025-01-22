import { useState } from "react"
import { FaRegSquarePlus } from "react-icons/fa6"
import { IoCheckmarkCircleSharp } from "react-icons/io5"
import styles from "./Cart.module.scss"

function Cart({ product, addToCart }) {
  const [add, setAdd] = useState(<FaRegSquarePlus />)

  const handleClick = () => {
    addToCart(product)
    setAdd(<IoCheckmarkCircleSharp />)
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
            {add}
          </button>
        </div>
      </div>
    </article>
  )
}

export default Cart
