import styles from "@/styles/Home.module.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.pagination__button}
      >
        Previous
      </button>
      {totalPages - currentPage < 1 && currentPage - 4 > 0 && (
        <button className={styles.pagination__button} onClick={() => onPageChange(currentPage - 4)}>
          {currentPage - 4}
        </button>
      )}
      {totalPages - currentPage < 2 && currentPage - 3 > 0 && (
        <button className={styles.pagination__button} onClick={() => onPageChange(currentPage - 3)}>
          {currentPage - 3}
        </button>
      )}
      {totalPages && currentPage - 2 > 0 && (
        <button className={styles.pagination__button} onClick={() => onPageChange(currentPage - 2)}>
          {currentPage - 2}
        </button>
      )}
      {totalPages && currentPage - 1 > 0 && (
        <button className={styles.pagination__button} onClick={() => onPageChange(currentPage - 1)}>
          {currentPage - 1}
        </button>
      )}
      <button className={`${styles.pagination__button} ${styles.active}`}>{currentPage}</button>
      {currentPage + 1 <= totalPages && (
        <button className={styles.pagination__button} onClick={() => onPageChange(currentPage + 1)}>
          {currentPage + 1}
        </button>
      )}
      {currentPage + 2 <= totalPages && (
        <button className={styles.pagination__button} onClick={() => onPageChange(currentPage + 2)}>
          {currentPage + 2}
        </button>
      )}
      {currentPage + 3 <= totalPages && currentPage < 3 && (
        <button className={styles.pagination__button} onClick={() => onPageChange(currentPage + 3)}>
          {currentPage + 3}
        </button>
      )}
      {currentPage + 4 <= totalPages && currentPage < 2 && (
        <button className={styles.pagination__button} onClick={() => onPageChange(currentPage + 4)}>
          {currentPage + 4}
        </button>
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.pagination__button}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
