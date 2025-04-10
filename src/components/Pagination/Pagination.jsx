import { useStore } from "../../store/store"
import { useStoreSearch } from "../../store/search.store"
import { useEffect, useState } from "react"
import Loader from "../Loader/Loader"
import styles from "./Pagination.module.scss"

function Pagination() {
  const {
    fetchProducts,
    totalPages,
    loading,
    currentPage,
    setCurrentPage,
    setIsActive,
    activeCategory,
    product,
    limit,
    filterSearch,
  } = useStore()

  const { change } = useStoreSearch()
  const [visiblePages, setVisiblePages] = useState([])

  useEffect(() => {
    setIsActive(currentPage - 1)
    updateVisiblePages(currentPage, totalPages)
  }, [currentPage, totalPages])

  const updateVisiblePages = (current, total) => {
    if (total <= 6) {
      setVisiblePages(Array.from({ length: total }, (_, i) => i + 1))
    } else {
      let pages = new Set()
      pages.add(1)
      if (current > 1) pages.add(current - 1)
      pages.add(current)
      if (current < total) pages.add(current + 1)
      pages.add(total)
      if (current > 3) pages.add(2)
      if (current < total - 2) pages.add(total - 1)
      const pagesArray = Array.from(pages).sort((a, b) => a - b)
      const result = []
      for (let i = 0; i < pagesArray.length; i++) {
        result.push(pagesArray[i])
        if (i < pagesArray.length - 1 && pagesArray[i + 1] - pagesArray[i] > 1) {
          result.push("...")
        }
      }
      setVisiblePages(result)
    }
  }

  const handlePageClick = async (index) => {
    if (index === "...") return
    const newPage = typeof index === "number" ? index : parseInt(index)
    setCurrentPage(newPage)
    if (!change) {
      await fetchProducts(activeCategory === 0 ? null : product[activeCategory], newPage, limit)
    } else {
      await filterSearch(change.toLowerCase(), newPage, limit)
    }
  }

  return (
    <>
      {!loading ? (
        <>
          <div className={styles.item}>
            {visiblePages.map((item) =>
              item === "..." ? (
                <span key={item} className={styles.ellipsis}>
                  ...
                </span>
              ) : (
                <h3
                  key={item}
                  className={currentPage === item ? styles.active : ""}
                  onClick={() => handlePageClick(item)}
                >
                  {item}
                </h3>
              )
            )}
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
