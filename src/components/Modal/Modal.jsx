import { motion, AnimatePresence } from "framer-motion"

import { useStoreModal } from "../../store/modal.store"

import Form from "../Form/Form"

import styles from "./Modal.module.scss"

function Modal() {
  const { modal } = useStoreModal()

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
            <Form />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
