import axios from "axios"
import { useForm } from "react-hook-form"
import { IoMdCloseCircle, IoIosSend } from "react-icons/io"

import { useState } from "react"

import { useStore } from "../../store/store"
import { useStoreModal } from "../../store/modal.store"

import OrderAdded from "../OrderAdded/OrderAdded"

import styles from "./Form.module.scss"

function Form() {
  const [createdOrder, setCreatedOrder] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { cart, resetCart } = useStore()
  const { closeModal } = useStoreModal()

  const onSubmit = async (data) => {
    const order = { ...data, order: cart }
    try {
      const response = await axios.post("https://6788cbfc2c874e66b7d6528d.mockapi.io/api/order", order)
      if (response.status === 201) {
        await resetCart()
        setCreatedOrder(true)
      }
    } catch (error) {
      console.error("Ошибка при отправке заказа:", error)
    }
  }

  return (
    <>
      {!createdOrder ? (
        <div>
          <div className={styles.close} onClick={closeModal}>
            <IoMdCloseCircle />
          </div>
          <div className={styles.item}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                placeholder='Ваше имя'
                {...register("lastName", { required: true, minLength: 3, pattern: /^[а-яА-ЯёЁa-zA-Z]+$/ })}
              />
              {errors.lastName?.type === "required" && <p>Поле не может быть пустым</p>}
              {errors.lastName?.type === "minLength" && <p>Минимум 3 символа</p>}
              {errors.lastName?.type === "pattern" && <p>Некорректно введено Имя</p>}

              <input
                placeholder='Номер телефона'
                {...register("Phone", { required: true, pattern: /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/ })}
              />
              {errors.Phone?.type === "required" && <p>Поле не может быть пустым</p>}
              {errors.Phone?.type === "pattern" && <p>Введите корректный телефон</p>}
              <div className={styles.total}>
                <span>Ваш заказ на сумму: </span>
                {cart.reduce((sum, current) => sum + current.price, 0).toLocaleString() + " ₽"}
              </div>
              <button>
                <IoIosSend /> <span>Отправить</span>
              </button>
            </form>
          </div>
        </div>
      ) : (
        <OrderAdded />
      )}
    </>
  )
}

export default Form
