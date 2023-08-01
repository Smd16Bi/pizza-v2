import React from 'react'
import ReactPaginate from 'react-paginate';


import styles from "./Pagination.module.scss"
import { useSelector } from 'react-redux';
import { selectFilter } from '../../redux/slices/filterSlice';

const Pagination = ({ setCurrentPage }) => {
  const { currentPage } = useSelector(selectFilter);
  const handlePage = (event) => {
    setCurrentPage(event.selected)
  }
  return (
    <div className={styles.root}>
      <ReactPaginate
        forcePage={currentPage}
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