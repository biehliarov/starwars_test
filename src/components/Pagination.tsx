import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i}>
          <button
            className={`${
              currentPage === i
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } px-3 py-1 rounded-full focus:outline-none`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        </li>
      );
    }
    return pages;
  };

  return (
    <div className="flex justify-center mt-4">
      <ul className="flex space-x-2">{renderPageNumbers()}</ul>
    </div>
  );
};

export default Pagination;
