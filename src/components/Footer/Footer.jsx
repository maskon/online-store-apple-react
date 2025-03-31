import styles from "./Footer.module.scss"

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className='container'>
        <div className={styles.block}>
          <p>© 2025 iStore. Все права защищены.</p>
          <p>Официальный партнёр Apple в России.</p>
        </div>
        {/* <a href='/privacy'>Политика конфиденциальности</a>
        <a href='/terms'>Условия использования</a>
        <a href='/contacts'>Контакты</a> */}
      </div>
    </footer>
  )
}

export default Footer
