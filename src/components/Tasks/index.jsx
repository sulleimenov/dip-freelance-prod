import React from 'react'
import { Link } from 'react-router-dom'

import Loading from '../../components/Loading'
import { declOfNum } from '../../utils'

const Task = ({ tasks, loading, filteredTasks }) => {
	return (
		<div className="task-list">
			{loading ? (
				tasks.map((task, index) =>
					task.status === 1 ? (
						<Link
							to={`task/${task.id}`}
							key={index}
							className="task-list__item">
							<div className="task-list__title">{task.title}</div>
							<div className="task-list__descr">{task.description}</div>
							<div className="task-list__info">
								<div className="task-list__price">
									{task.price} {task.price === 'Договорная' ? '' : 'тенге'}
								</div>
								<div className="task-list__date">
									Срок выполнения: {task.date}{' '}
									{declOfNum(task.date, ['день', 'дня', 'дней'])}
								</div>
							</div>
							<div className="task-list__published">{task.published}</div>
						</Link>
					) : (
						''
					)
				)
			) : (
				<Loading />
			)}
		</div>
	)
}

export default Task
