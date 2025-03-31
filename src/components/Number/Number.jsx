import styles from "./Number.module.scss"

function Number({ number }) {
  return (
    <>
      {number.length > 0 && (
        <div className={styles.block}>
          <div className={styles.item}>{number.length}</div>
        </div>
      )}
    </>
  )
}

export default Number
