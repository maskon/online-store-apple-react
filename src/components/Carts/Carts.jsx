import { useEffect, useState } from "react"
import { useStore } from "../../store/store"
import Cart from "../Cart/Cart"
import styles from "./Carts.module.scss"

function Carts() {
  const { products, fetchProducts, addToCart } = useStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts()
      setLoading(false)
    }
    fetchData()
  }, [fetchProducts])

  return (
    <section>
      <div className='container'>
        <div className={styles.item}>
          {!loading ? (
            products?.map((product) => <Cart key={product.id} product={product} addToCart={addToCart} />)
          ) : (
            <h2 className={styles.title}>Загрузка...</h2>
          )}
        </div>
      </div>
    </section>
  )
}

export default Carts
