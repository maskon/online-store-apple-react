import { useEffect } from "react"
import { useStore } from "../../store/store"

import { IoMdCloseCircle } from "react-icons/io"

import Modal from "../Modal/Modal"

import styles from "./Basket.module.scss"

function Basket() {
  const { cart, removeFromCart, basket, closeBasket, openModal } = useStore()

  const bodyNoScroll = () => {
    basket
      ? (document.querySelector("body").style.overflow = "hidden")
      : (document.querySelector("body").style.overflow = "auto")
  }

  useEffect(() => {
    bodyNoScroll()
  }, [basket])

  return (
    <>
      {basket && (
        <section className={styles.basket}>
          <Modal />
          <div className={styles.inner}>
            <div className={styles.block}>
              <div className={styles.item}>
                <h3 className={styles.title}>Корзина</h3>
                <IoMdCloseCircle onClick={closeBasket} />
              </div>
              {cart.length ? (
                cart.map((product) => (
                  <div key={product.id} className={styles.cart}>
                    <img src={product.img} alt='' />
                    <div>
                      <p className={styles.cartTitle}>{product.title}</p>
                      <p className={styles.cartPrice}>{product.price.toLocaleString()} руб.</p>
                      <button className={styles.delete} onClick={() => removeFromCart(product.id)}>
                        Удалить из корзины
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <h3 className={styles.null}>Корзина пустая</h3>
              )}
            </div>
            <div>
              <div className={styles.between}>
                <span className={styles.cartTitle}>Итого</span>
                <span className={styles.cartPrice}>
                  {cart.reduce((sum, current) => sum + current.price, 0).toLocaleString()} руб.
                </span>
              </div>
              <button className={styles.btn} onClick={openModal}>
                Оформить заказ
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default Basket
