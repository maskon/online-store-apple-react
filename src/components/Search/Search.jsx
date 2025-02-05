import { useState } from "react"
import { useStore } from "../../store/store"

import styles from "./Search.module.scss"

function Search() {
  const { filterProducts } = useStore()
  const [change, setChange] = useState("")

  const handleChange = (e) => {
    if (e.target.value === "") {
      filterProducts("")
      setChange("")
    } else {
      setChange(e.target.value)
    }
  }

  return (
    <div className={styles.item}>
      <input onChange={handleChange} value={change} type='text' placeholder='Поиск...' />
      <button onClick={() => filterProducts(change.toLowerCase())}>Найти</button>
    </div>
  )
}

export default Search
