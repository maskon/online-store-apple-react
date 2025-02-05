import { useStore } from "../../store/store"

import { IoMdCloseCircle } from "react-icons/io"

import Form from "../Form/Form"

import styles from "./Modal.module.scss"

function Modal() {
  const { modal, closeModal } = useStore()

  return (
    <>
      {modal && (
        <div className={styles.modal}>
          <div className={styles.item}>
            <div className={styles.close} onClick={closeModal}>
              <IoMdCloseCircle />
            </div>
            <Form />
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
