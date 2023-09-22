import React from "react";
import Link from "next/link";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  nextPage?: string;
  previousPage?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  basePath,
  nextPage,
  previousPage,
}) => {
  const pageNumbersToShow = 5; // Adjust the number of page numbers to show

  if (!currentPage) {
    currentPage = 1;
  }

  const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const renderPageNumbers = () => {
    if (totalPages <= pageNumbersToShow) {
      return range(1, totalPages);
    }

    const leftOffset = Math.floor(pageNumbersToShow / 2);
    const rightOffset = totalPages - leftOffset;

    if (currentPage <= leftOffset) {
      return [...range(1, pageNumbersToShow - 2), "...", totalPages];
    } else if (currentPage >= rightOffset) {
      return [
        1,
        "...",
        ...range(totalPages - pageNumbersToShow + 3, totalPages),
      ];
    } else {
      return [
        1,
        "...",
        ...range(currentPage - 1, currentPage + 1),
        "...",
        totalPages,
      ];
    }
  };

  return (
    <div className="flex mt-5 items-center justify-center space-x-2">
      {previousPage !== null && (
        <Link href={`${basePath}/${previousPage}`}>
          <button className="pagination-btn">
            <AiOutlineLeft />
          </button>
        </Link>
      )}

      {renderPageNumbers().map((pageNumber, index) => (
        <span key={index}>
          {pageNumber === "..." ? (
            <span className="px-4 py-2">...</span>
          ) : (
            <Link href={`${basePath}/?page=${pageNumber}`}>
              <p
                className={`px-4 py-2 border rounded-md ${
                  pageNumber === currentPage ? "bg-red-500 text-white" : ""
                }`}
              >
                {pageNumber}
              </p>
            </Link>
          )}
        </span>
      ))}

      {nextPage !== null && (
        <Link href={`${basePath}/${nextPage}`}>
          <button className="pagination-btn">
            <AiOutlineRight />
          </button>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
