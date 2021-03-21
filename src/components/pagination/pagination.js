import React from 'react';
import './pagination.css';

const Pagination = (props) => {
  const pages = [];
  for (let i = 0; i < props.totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination-wrapper">
      <button className="pagination-nav__btn prev" onClick={props.prevPageHandler} disabled={props.first}>Prev</button>
      {
        pages && pages.map((page, index) => (
          <button className="pagination-nav__btn index" key={index} onClick={() => props.changePageHandler(index)}>{index + 1}</button>
        ))
      }
      <button className="pagination-nav__btn next" onClick={props.nextPageHandler} disabled={props.last}>Next</button>
    </div>
  );
}

export default Pagination;