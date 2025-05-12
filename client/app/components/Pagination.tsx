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
	const pages: number[] = [];

	for (let i = 1; i <= totalPages; i++) {
		pages.push(i);
	}

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			onPageChange(page);
		}
	};

	return (
		<div className="flex justify-center items-center space-x-1 mt-6">
			<button
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="px-3 py-1 rounded border bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50"
			>
				Previous
			</button>

			{pages.map((page) => (
				<button
					key={page}
					onClick={() => handlePageChange(page)}
					className={`px-3 py-1 rounded border ${
						page === currentPage
							? "bg-cyan-500 text-white"
							: "bg-gray-900 text-gray-300 hover:bg-gray-700"
					}`}
				>
					{page}
				</button>
			))}

			<button
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="px-3 py-1 rounded border bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50"
			>
				Next
			</button>
		</div>
	);
};

export default Pagination;
