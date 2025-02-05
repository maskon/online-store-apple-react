import Search from "../Search/Search"

import sryles from "./Categories.module.scss"

function Categories() {
  return (
    <section>
      <div className='container'>
        <div className={sryles.item}>
          <h2>MacBook</h2>
          <Search />
        </div>
      </div>
    </section>
  )
}

export default Categories
