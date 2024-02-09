import React from 'react';
import { ITEMS_PER_PAGE } from '../../app/Constants';

const Pagination = ({ page, handlePage, totalItems }) => {

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(page * ITEMS_PER_PAGE, totalItems);

  return (
    <div className='flex flex-col items-center w-full gap-5 pt-4 border-t-2'>
      <p className="text-sm text-gray-700">
        Showing results from{' '}
        <span className="font-medium text-gray-900">{start}</span> to
        <span className="font-medium text-gray-900">{end}</span>
      </p>
      <div className="flex-wrap gap-2 px-4 join">
      {totalItems > 10 &&  (Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`join-item btn ${(page === index + 1) ? 'btn-active' : ''}`}
            onClick={() => handlePage(index + 1)}
          >
            {index + 1}
          </button>
        )))}
      </div>
    </div>
  );
};

export default Pagination;
