import { useStore } from "../../store/store"
import { useStoreSearch } from "../../store/search.store"

import Search from "../Search/Search"

import styles from "./Categories.module.scss"

function Categories() {
  const { fetchProducts, activeCategory, setActiveCategory, setCurrentPage, product } = useStore()
  const { setChange } = useStoreSearch()

  const handleClick = (item, index) => {
    setActiveCategory(index)
    fetchProducts(item === "все" ? null : item)
    setCurrentPage(1)
    setChange("")
  }

  return (
    <section>
      <div className='container'>
        <div className={styles.item}>
          <div className={styles.block}>
            {product.map((item, index) => (
              <h2
                key={item}
                className={activeCategory === index ? styles.active : styles.title}
                onClick={() => handleClick(item.toLowerCase(), index)}
              >
                {item}
              </h2>
            ))}
          </div>
          <Search />
        </div>
      </div>
    </section>
  )
}

export default Categories
