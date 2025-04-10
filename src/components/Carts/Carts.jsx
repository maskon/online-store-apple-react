import { useEffect } from "react"

import { useStore } from "../../store/store"

import Cart from "../Cart/Cart"
import Pagination from "../Pagination/Pagination"
import Loader from "../Loader/Loader"

import styles from "./Carts.module.scss"

function Carts() {
  const { products, fetchProducts, filterSearch, loading, currentPage, activeCategory } = useStore()
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProducts(!activeCategory ? null : activeCategory, currentPage)
      } catch (error) {
        console.error("Ошибка загрузки продуктов", error)
      }
    }

    const debounceFetch = setTimeout(fetchData, 300)
    return () => clearTimeout(debounceFetch)
  }, [fetchProducts, filterSearch])

  const displayContent = (content) =>
    content.map((product) => (
      <div key={product.id} className={styles.col}>
        <Cart product={product} />
      </div>
    ))

  return (
    <section>
      <div className='container'>
        <div className={!loading ? styles.item : styles.empty}>{!loading ? displayContent(products) : <Loader />}</div>
        {!loading && <Pagination />}
      </div>
    </section>
  )
}

export default Carts
