import { useNavigate } from "react-router-dom"
import { FaArrowLeftLong } from "react-icons/fa6"

import { useStore } from "../../store/store"

import styles from "./Information.module.scss"

function Information() {
  const { cart, favorites, currentProduct, addToCart, removeFromCart, addToFavorites, removeFromFavorites } = useStore()
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  const handleClickBuy = () => {
    cart.some((el) => currentProduct.id === el.id) ? removeFromCart(currentProduct.id) : addToCart(currentProduct)
  }

  const handleClickFavorites = () => {
    favorites.some((el) => currentProduct.id === el.id)
      ? removeFromFavorites(currentProduct.id)
      : addToFavorites(currentProduct)
  }

  return (
    <section>
      <div className='container'>
        <section className={styles.inner}>
          {!currentProduct ? (
            <div>Нет информации о товаре</div>
          ) : (
            <>
              <div className={styles.flex}>
                <button className={styles.back} onClick={handleBack}>
                  <FaArrowLeftLong />
                </button>
                <span className={styles.title}>{currentProduct.title}</span>
              </div>
              <div className={styles.item}>
                <div className={styles.col}>
                  <img src={currentProduct.img} alt={currentProduct.title} />
                </div>
                <div className={styles.col}>
                  <p className={styles.text}>{currentProduct.description}</p>
                  <p className={styles.price}>Цена: {currentProduct.price.toLocaleString()} руб.</p>
                  <button
                    className={
                      favorites.some((element) => currentProduct.id === element.id) ? styles.remove : styles.add
                    }
                    onClick={handleClickFavorites}
                  >
                    {favorites.some((element) => currentProduct.id === element.id)
                      ? "Удалить из избранного"
                      : "В избранное"}
                  </button>
                  <button
                    className={cart.some((element) => currentProduct.id === element.id) ? styles.remove : styles.add}
                    onClick={handleClickBuy}
                  >
                    {cart.some((element) => currentProduct.id === element.id) ? "Удалить из корзины" : "Купить"}
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </section>
  )
}

export default Information
