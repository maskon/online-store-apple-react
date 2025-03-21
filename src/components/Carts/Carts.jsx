import { useEffect } from "react"

import { useStore } from "../../store/store"

import Cart from "../Cart/Cart"
import Pagination from "../Pagination/Pagination"

import styles from "./Carts.module.scss"

function Carts() {
  const { products, fetchProducts, filterSearch, loading, currentPage } = useStore()

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProducts(null, currentPage)
      } catch (error) {
        console.error("Ошибка загрузки продуктов", error)
      }
    }

    const debounceFetch = setTimeout(fetchData, 300) // Задержка 300 мс
    return () => clearTimeout(debounceFetch)
  }, [fetchProducts, filterSearch])

  const displayContent = (content) => content.map((product) => <Cart key={product.id} product={product} />)

  return (
    <section>
      <div className='container'>
        <div className={styles.item}>
          {!loading ? displayContent(products) : <h2 className={styles.title}>Загрузка...</h2>}
        </div>
        {!loading && <Pagination />}
      </div>
    </section>
  )
}

export default Carts
