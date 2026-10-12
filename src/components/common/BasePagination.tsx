import "./BasePagination.css";

type BasePaginationProps = {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
};

function BasePagination({
  currentPage,
  totalPages,
  onChange,
}: BasePaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const maxVisiblePages = 5;
  const visiblePages = Math.min(maxVisiblePages, totalPages);

  let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));

  let endPage = startPage + visiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    onChange(page);
  };

  return (
    <nav className="base-pagination" aria-label="ページネーション">
      <button
        type="button"
        className="base-pagination__button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="前のページ"
      >
        ‹
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={`base-pagination__button ${
            page === currentPage ? "base-pagination__button--active" : ""
          }`}
          onClick={() => handlePageChange(page)}
          disabled={page === currentPage}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className="base-pagination__button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="次のページ"
      >
        ›
      </button>
    </nav>
  );
}

export default BasePagination;
