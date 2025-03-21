import { motion, AnimatePresence } from "framer-motion"

import { IoMdCloseCircle } from "react-icons/io"
import { TbBasketCancel } from "react-icons/tb"

import { useEffect, useState } from "react"

import { useStore } from "../../store/store"
import { useStoreBasket } from "../../store/basket.store"
import { useStoreModal } from "../../store/modal.store"

import Modal from "../Modal/Modal"

import styles from "./Basket.module.scss"

function Basket() {
  const { cart, removeFromCart } = useStore()
  const { basket, closeBasket } = useStoreBasket()
  const { openModal } = useStoreModal()

  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    cart.length ? setDisabled(false) : setDisabled(true)
  }, [cart])

  const bodyNoScroll = () => {
    basket
      ? (document.querySelector("body").style.overflow = "hidden")
      : (document.querySelector("body").style.overflow = "auto")
  }

  useEffect(() => {
    bodyNoScroll()
  }, [basket])

  return (
    <AnimatePresence>
      {basket && (
        <section className={styles.basket}>
          <Modal />
          <motion.div
            exit={{ x: 400 }}
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.inner}
          >
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
                <div className={styles.null}>
                  <div>
                    <TbBasketCancel />
                  </div>
                  <h3>Корзина пустая</h3>
                </div>
              )}
            </div>
            <div>
              <div className={styles.between}>
                <span className={styles.cartTitle}>Итого</span>
                <span className={styles.cartPrice}>
                  {cart.reduce((sum, current) => sum + current.price, 0).toLocaleString()} руб.
                </span>
              </div>
              <button
                className={styles.btn}
                style={{
                  backgroundColor: disabled ? "#d5c3ca" : "#9DD458",
                  cursor: disabled ? "not-allowed" : "pointer",
                }}
                disabled={disabled}
                onClick={openModal}
              >
                Оформить заказ
              </button>
            </div>
          </motion.div>
        </section>
      )}
    </AnimatePresence>
  )
}

export default Basket
