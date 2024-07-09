'use client';

import { useRouter } from "next/navigation";


interface IPagination {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
}


const Pagination: React.FC<IPagination> = ({ currentPage, totalPages, setCurrentPage }) => {
    const router = useRouter();

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            const previousPage = currentPage - 1;
            setCurrentPage(previousPage);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
        }
    };

    const handlePageClick = (page: any) => {
        setCurrentPage(page)
    };

    const renderPageButtons = () => {
        const pageButtons = [];

        // Calculate the range of visible pages
        const visiblePages = Math.min(totalPages, 7);
        const halfVisiblePages = Math.floor(visiblePages / 2);
        let startPage = currentPage - halfVisiblePages;
        let endPage = currentPage + halfVisiblePages;

        if (startPage <= 0) {
            startPage = 1;
            endPage = visiblePages;
        }

        if (endPage > totalPages) {
            startPage = totalPages - visiblePages + 1;
            endPage = totalPages;
        }

        for (let page = startPage; page <= endPage; page++) {
            pageButtons.push(
                <button
                    key={page}
                    className={`px-4 py-1 ${page === currentPage ? 'bg-gray-300' : 'bg-white'
                        } border border-gray-300 text-xs md:text-base  rounded-md hover:text-gray-700 hover:bg-gray-100`}
                    onClick={() => handlePageClick(page)}
                >
                    {page}
                </button>
            );
        }

        return pageButtons;
    };

    return (
        <div className="flex items-center justify-center space-x-2 mt-7">
            <button
                className={`px-4 py-1 text-xs md:text-base text-gray-600 bg-white border border-gray-300 rounded-md hover:text-gray-700 hover:bg-gray-100 ${currentPage === 1 ? 'hidden' : ''}`}
                onClick={handlePreviousPage}
            >
                Previous
            </button>
            {renderPageButtons()}
            <button
                className="px-4 py-1 text-xs md:text-base text-gray-600 bg-white border border-gray-300 rounded-md hover:text-gray-700 hover:bg-gray-100"
                onClick={handleNextPage}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;