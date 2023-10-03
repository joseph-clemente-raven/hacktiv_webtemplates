import React, { useMemo, useState, useEffect } from "react";

export default function Pagination(props) {
  const {
    dataPageCount,
    pageNumber,
    setPageNumber,
    rowsPerPageOptions=[10, 20, 50],
    rowsPerPage=10,
    setRowsPerPage,
  } = props;

  // Update the number of pages whenever dataPageCount or rowsPerPage changes
  const totalPages = useMemo(() => Math.ceil(dataPageCount / rowsPerPage), [
    dataPageCount,
    rowsPerPage,
  ]);

  useEffect(() => {
    // If the current page is greater than the new total pages, reset to page 1.
    if (pageNumber > totalPages) {
      setPageNumber(1);
    }
  }, [pageNumber, totalPages, setPageNumber]);

  function setPageNumberUsingPages(pageNumber) {
    setPageNumber(pageNumber);
  }

  function previousPage() {
    if (pageNumber !== 1) {
      let previousPageNumber = pageNumber - 1;
      setPageNumber(previousPageNumber);
    }
  }

  function nextPage() {
    if (pageNumber !== totalPages) {
      let nextPageNumber = pageNumber + 1;
      setPageNumber(nextPageNumber);
    }
  }

  return (
    <div className="flex justify-between">
    <div className="py-1">
      <label htmlFor="rowsPerPage">Rows per page:</label>
      <select
        id="rowsPerPage"
        name="rowsPerPage"
        className="ml-2"
        value={rowsPerPage}
        onChange={(e) => setRowsPerPage(Number(e.target.value))}
      >
        {rowsPerPageOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item">
            <button
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 focus:shadow-none"
              onClick={() => previousPage()}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }).map((_, index) => (
            <li className="page-item" key={index}>
              <button
                className={`${
                  pageNumber === index + 1
                    ? "bg-[#5F8793] text-white"
                    : "bg-transparent text-gray-800"
                } page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded focus:shadow-none`}
                onClick={() => setPageNumberUsingPages(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              onClick={() => nextPage()}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
