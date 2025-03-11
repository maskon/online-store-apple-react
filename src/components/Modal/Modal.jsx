import { useStore } from "../../store/store"
import { motion, AnimatePresence } from "framer-motion"

import { IoMdCloseCircle } from "react-icons/io"

import Form from "../Form/Form"

import styles from "./Modal.module.scss"

function Modal() {
  const { modal, closeModal } = useStore()

  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          exit={{ scale: 0 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className={styles.modal}
        >
          <div className={styles.item}>
            <div className={styles.close} onClick={closeModal}>
              <IoMdCloseCircle />
            </div>
            <Form />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
