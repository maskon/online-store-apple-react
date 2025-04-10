import { GoHeartFill } from "react-icons/go"

import { useStore } from "../../store/store"

import styles from "./Favorite.module.scss"

function Favorite() {
  const { favorites, removeFromFavorites } = useStore()

  return (
    <section>
      <div className='container'>
        <div className={favorites.length ? styles.item : styles.empty}>
          {favorites.length ? (
            favorites.map((product) => (
              <article key={product.id} className={styles.col}>
                <div key={product.id} className={styles.cart}>
                  <button className={styles.active} onClick={() => removeFromFavorites(product.id)}>
                    <GoHeartFill />
                  </button>
                  <div className={styles.img}>
                    <img src={product.img} alt={product.title} />
                  </div>
                  <div className={styles.elem}>
                    <p className={styles.title}>{product.title}</p>
                    <div className={styles.block}>
                      <div>
                        <span className={styles.text}>ЦЕНА:</span>
                        <span className={styles.price}>{product.price.toLocaleString()} руб.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p className={styles.center}>В избранном еще нет товаров...</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default Favorite
