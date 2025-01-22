import { useEffect } from "react"
import { useStore } from "../../store/store"
import Cart from "../Cart/Cart"
import styles from "./Carts.module.scss"

function Carts() {
  const { products, fetchProducts, addToCart } = useStore()

  // const [loading, setLoading] = useState(false)

  // const handleClick = (item) => {
  //   const exists = cart.some((existingItem) => existingItem.id === item.id)
  //   if (!exists) {
  //     setCart((prev) => [
  //       ...prev,
  //       {
  //         ...item,
  //       },
  //     ])
  //   }
  // }

  // useEffect(() => {
  //   axios
  //     .get("https://6788cbfc2c874e66b7d6528d.mockapi.io/api/product")
  //     .then((response) => {
  //       setData(response.data)
  //       setLoading(false)
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //       setLoading(false)
  //     })
  // }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <section>
      <div className='container'>
        <div className={styles.item}>
          {products?.map((product) => (
            <Cart key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Carts
