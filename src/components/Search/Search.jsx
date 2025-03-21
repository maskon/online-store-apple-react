import { AiFillCloseCircle } from "react-icons/ai"

import { useStore } from "../../store/store"
import { useStoreSearch } from "../../store/search.store"

import styles from "./Search.module.scss"

function Search() {
  const {
    filterSearch,
    fetchProducts,
    activeCategory,
    setActiveCategory,
    setCurrentPage,
    product,
    limit,
    currentPage,
  } = useStore()

  const { change, setChange } = useStoreSearch()

  const handleChange = (e) => {
    setChange(e.target.value)
  }

  const handleClickToImg = async () => {
    setCurrentPage(currentPage)
    if (activeCategory === 0) {
      await fetchProducts(null, currentPage, limit)
    } else {
      const selectedCategory = product[activeCategory]
      if (selectedCategory) {
        await fetchProducts(selectedCategory, currentPage, limit)
      }
    }
    setChange("")
  }

  const handleClickButton = async () => {
    const selectedCategory = product[activeCategory]
    if (selectedCategory) {
      await filterSearch(change.toLowerCase(), 1, limit)
      setActiveCategory(0)
      setCurrentPage(1)
    }
  }

  return (
    <div className={styles.item}>
      <input onChange={handleChange} value={change} type='text' placeholder='Поиск...' />
      <AiFillCloseCircle onClick={handleClickToImg} />
      <button onClick={handleClickButton}>Найти</button>
    </div>
  )
}

export default Search
