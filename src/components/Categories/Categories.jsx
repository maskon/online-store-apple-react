import { useStore } from "../../store/store"
import { useState } from "react"

import Search from "../Search/Search"

import styles from "./Categories.module.scss"

function Categories() {
  const { filterCategory } = useStore()

  const [isActive, setIsActive] = useState(0)

  const handleClick = (item, index) => {
    setIsActive(index)
    filterCategory(item)
  }

  const product = ["Все", "MacBook", "iPhone"]

  return (
    <section>
      <div className='container'>
        <div className={styles.item}>
          <div className={styles.block}>
            {product.map((item, index) => (
              <h2
                key={item}
                className={isActive === index ? styles.active : styles.title}
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
