import { useStoreBasket } from "../../store/basket.store"
import { useStoreModal } from "../../store/modal.store"

import styles from "./OrderAdded.module.scss"

function OrderAdded() {
  const { closeBasket } = useStoreBasket()
  const { closeModal } = useStoreModal()

  const closeModalAndBasket = () => {
    closeBasket()
    setTimeout(() => {
      closeModal()
    }, 300)
  }

  return (
    <div className={styles.btn}>
      <div className={styles.text}>
        <p>Заказ успешно добавлен</p>
        <p>Скоро с вами свяжется наш менеджер</p>
      </div>
      <button onClick={closeModalAndBasket}>OK</button>
    </div>
  )
}

export default OrderAdded
