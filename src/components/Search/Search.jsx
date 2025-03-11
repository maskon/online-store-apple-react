import { useState } from "react"
import { useStore } from "../../store/store"

import { AiFillCloseCircle } from "react-icons/ai"

import styles from "./Search.module.scss"

function Search({ setIsActive }) {
  const { filterSearch, fetchProducts, setActiveCategory } = useStore()
  const [change, setChange] = useState("")

  const handleChange = (e) => {
    if (e.target.value === "") {
      fetchProducts()
      setChange("")
    } else {
      setChange(e.target.value)
    }
  }

  const handleClickToImg = () => {
    fetchProducts()
    setChange("")
    setActiveCategory(0)
  }

  const handleClick = () => {
    filterSearch(change.toLowerCase(), 1, 10)
    setActiveCategory(0)
  }

  return (
    <div className={styles.item}>
      <input onChange={handleChange} value={change} type='text' placeholder='Поиск...' />
      <AiFillCloseCircle onClick={handleClickToImg} />
      <button onClick={handleClick}>Найти</button>
    </div>
  )
}

export default Search
