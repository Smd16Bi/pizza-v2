import React from 'react'
import ReactPaginate from 'react-paginate';

import styles from "./Pagination.module.scss"

const Pagination = ({ setCurrentPage }) => {

  const handlePage = (event) => {
    setCurrentPage(event.selected)
  }
  return (
    <div className={styles.root}>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePage}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  )
}

export default Pagination