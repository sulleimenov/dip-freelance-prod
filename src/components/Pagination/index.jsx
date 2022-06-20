import React from 'react'

const Pagination = ({ tasksPerPage, totalTasks, currentPage, paginate }) => {
	const pageNumbers = []
	
	for (let i = 1; i <= Math.ceil(totalTasks / tasksPerPage); i++) {
		pageNumbers.push(i)
	}

	return (
		<nav className="pagination">
			{pageNumbers.map((number) => (
				<button
					className={`pagination__item ${
						currentPage === number ? 'active' : ''
					}`}
					key={number}
					onClick={() => paginate(number)}>
					{number}
				</button>
			))}
		</nav>
	)
}

export default Pagination
