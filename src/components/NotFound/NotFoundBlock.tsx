import React from 'react'
import styles from './NotFoundBlock.module.scss'

function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <h1>Not found</h1>
      <p className={styles.description}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias deserunt ducimus labore ratione iste sequi architecto nemo. Perferendis incidunt illum veritatis mollitia adipisci, sequi dolorem eius dicta suscipit corporis reprehenderit!</p>
    </div>
  )
}

export default NotFoundBlock