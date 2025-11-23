import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, onPageChange, hasNextPage, hasPreviousPage }) => {
  const pages = [];
  const maxPagesToShow = 5;

  // Calculate page range to display
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-elegant-lg p-6 border border-neutral-200">
      <div className="flex items-center justify-between">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPreviousPage}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
            hasPreviousPage
              ? 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-elegant hover:shadow-elegant-lg active:scale-95'
              : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
          }`}
        >
          <FaChevronLeft />
          <span>Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-2">
          {startPage > 1 && (
            <>
              <button
                onClick={() => onPageChange(1)}
                className="w-10 h-10 rounded-xl bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-semibold transition-all duration-200"
              >
                1
              </button>
              {startPage > 2 && (
                <span className="text-neutral-500">...</span>
              )}
            </>
          )}

          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-xl font-semibold transition-all duration-300 ${
                page === currentPage
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-elegant-lg scale-110'
                  : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-700'
              }`}
            >
              {page}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className="text-neutral-500">...</span>
              )}
              <button
                onClick={() => onPageChange(totalPages)}
                className="w-10 h-10 rounded-xl bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-semibold transition-all duration-200"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
            hasNextPage
              ? 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-elegant hover:shadow-elegant-lg active:scale-95'
              : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
          }`}
        >
          <span>Next</span>
          <FaChevronRight />
        </button>
      </div>

      {/* Page Info */}
      <div className="text-center mt-4 text-sm text-neutral-600 font-medium">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Pagination;
