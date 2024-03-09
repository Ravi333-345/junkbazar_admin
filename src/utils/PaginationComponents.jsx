import React from "react";

const PaginationComponent = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  const visiblePages = pageNumbers.slice(Math.max(currentPage - 2, 0), Math.min(currentPage + 3, totalPages));

  return (
    <nav className="w-full my-4 flex items-center justify-center">
      <ul className="flex items-center -space-x-px h-12 text-base w-full">
        <li>
          <div
            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 e"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <svg
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
            </svg>
            <span className="sr-only">Previous</span>
          </div>
        </li>

        {visiblePages.map((pageNumber) => (
          <li key={pageNumber}>
            <div
              className={`flex items-center justify-center px-4 h-10 leading-tight ${pageNumber === currentPage
                  ? "text-white bg-[#a3e635] border  hover:bg-green-600 hover:border-green-600 "
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </div>
          </li>
        ))}

        <li>
          <div
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
            </svg>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationComponent;
