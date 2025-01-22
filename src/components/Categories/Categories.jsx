import sryles from "./Categories.module.scss"

function Categories() {
  return (
    <section>
      <div className='container'>
        <div className={sryles.item}>
          <h2>MacBook</h2>
          <input type='text' placeholder='Search...' />
        </div>
      </div>
    </section>
  )
}

export default Categories
