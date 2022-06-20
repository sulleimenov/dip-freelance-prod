import React, { useState, useEffect } from 'react'

import api from './../../services/api/db'
import Tasks from '../../components/Tasks'
import Pagination from '../../components/Pagination'

function Home() {
	const [tasks, setTasks] = useState([])
	const [loading, setLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [tasksPerPage, setPostsPerPage] = useState(5)

	const [searchValue, setSearchValue] = useState('')
	const search = searchValue ? `q=${searchValue}` : ''

	const indexOfLastTask = currentPage * tasksPerPage
	const indexOfFirstTask = indexOfLastTask - tasksPerPage
	const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask)

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	useEffect(() => {
		api
			.get(`/tasks?${search}`)
			.then(function (response) {
				setTasks(response.data)
				setLoading(true)
			})
			.catch(function (error) {
				console.log(error)
			})
	}, [searchValue])

	return (
		<div>
			<div className="title">Список заданий</div>
			<div className="filter">
				<div className="filter__input">
					<label htmlFor="word">Ключевые слова</label>
					<input
						id="word"
						type="text"
						name="word"
						value={searchValue}
						autoComplete="off"
						onChange={(event) => setSearchValue(event.target.value)}
					/>
				</div>
				{/* <div className="filter__input">
					<label htmlFor="price_start">Оплата, от</label>
					<input
						id="price_start"
						type="text"
						name="price_start"
						autoComplete="off"
					/>
				</div>
				<div className="filter__input">
					<label htmlFor="price_end">Оплата, до</label>
					<input
						id="price_end"
						type="text"
						name="price_end"
						autoComplete="off"
					/>
				</div> */}
			</div>
			<Tasks tasks={currentTasks} loading={loading} />
			{tasksPerPage <= tasks.length ? (
				<Pagination
					paginate={paginate}
					tasksPerPage={tasksPerPage}
					totalTasks={tasks.length}
					currentPage={currentPage}
				/>
			) : (
				''
			)}
		</div>
	)
}

export default Home
