import { useStore } from "../../store/store"
import { useStoreSearch } from "../../store/search.store"

import { useEffect } from "react"

import Loader from "../Loader/Loader"

import styles from "./Pagination.module.scss"

function Pagination() {
  const {
    fetchProducts,
    totalPages,
    loading,
    currentPage,
    setCurrentPage,
    isActive,
    setIsActive,
    activeCategory,
    product,
    limit,
    filterSearch,
  } = useStore()

  const { change } = useStoreSearch()

  useEffect(() => {
    setIsActive(currentPage - 1)
  }, [currentPage])

  const handlePageClick = async (index) => {
    const newPage = index + 1
    setCurrentPage(newPage)
    if (!change) {
      await fetchProducts(activeCategory === 0 ? null : product[activeCategory], newPage, limit)
    } else {
      await filterSearch(change.toLowerCase(), newPage, limit)
    }
  }

  const items = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <>
      {!loading ? (
        <>
          <div className={styles.item}>
            {items.map((item, index) => (
              <h3 key={item} className={isActive === index ? styles.active : ""} onClick={() => handlePageClick(index)}>
                {item}
              </h3>
            ))}
          </div>
          <p className={styles.text}>
            Текущая страница: {currentPage} из {totalPages}
          </p>
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default Pagination
