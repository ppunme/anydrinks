import React from "react";
import "./Pagination.css";

const Pagination = ({ totalPages, currentPage, handlePage }) => {
  const pages = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <div className="pagination">
      <li className={`page-item ${currentPage === 1 && "disabled"}`}>
        <button
          className="page-link page-number"
          aria-label="Previous"
          onClick={() => handlePage(currentPage - 1)}
        >
          <i className="bi bi-chevron-left"></i>
        </button>
      </li>
      {pages.map((num, index) => (
        <li className="page-item" key={index}>
          <button
            onClick={() => handlePage(num)}
            className={`page-link page-number ${
              currentPage === num ? "active" : ""
            }`}
          >
            {num}
          </button>
        </li>
      ))}
      <li className="page-item">
        <button
          className="page-link page-number"
          aria-label="Previous"
          onClick={() => handlePage(currentPage + 1)}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </li>
    </div>
  );
};

export default Pagination;
