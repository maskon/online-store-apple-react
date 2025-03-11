import { useEffect } from "react"
import { useStore } from "../../store/store"
import styles from "./Paginate.module.scss"

function Paginate() {
  const {
    fetchProducts,
    totalPages,
    loading,
    currentPage,
    setCurrentPage,
    goToNextPage,
    goToPreviousPage,
    isActive,
    setIsActive,
    activeCategory,
    product,
    limit,
  } = useStore()

  useEffect(() => {
    setIsActive(currentPage - 1)
  }, [currentPage])

  const handleClick = async (index) => {
    const newPage = index + 1
    setCurrentPage(newPage)

    if (activeCategory === 0) {
      // индекс "все"
      await fetchProducts(null, newPage, limit)
    } else {
      const selectedCategory = product[activeCategory]
      if (selectedCategory) {
        await fetchProducts(selectedCategory, newPage, limit)
      }
    }
  }

  const items = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <>
      {!loading ? (
        <>
          <div className={styles.item}>
            {/* <button onClick={goToPreviousPage} disabled={currentPage === 1}>
              Предыдущая
            </button> */}
            {items.map((item, index) => (
              <h3 key={item} className={isActive === index ? styles.active : ""} onClick={() => handleClick(index)}>
                {item}
              </h3>
            ))}
            {/* <button onClick={goToNextPage} disabled={currentPage === totalPages}>
              Следующая
            </button> */}
          </div>
          <p className={styles.text}>
            Текущая страница: {currentPage} из {totalPages}
          </p>
        </>
      ) : (
        <h2 className={styles.title}>Загрузка...</h2>
      )}
    </>
  )
}

export default Paginate
