import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import useAuth from './../../hooks/useAuth'
import api from './../../services/api/db'

import avatar from './../../assets/images/avatar.svg'
import Loading from '../../components/Loading'
import { declOfNum, uuidv2 } from './../../utils'

function Task() {
	const auth = useAuth()
	const [task, setTask] = useState([])
	const [tenders, setTenders] = useState([])
	const [answer, setAnswer] = useState(false)
	const [loaded, setLoaded] = useState(false)
	const [answerPrice, setAnswerPrice] = useState('')
	const [answerDeadline, setAnswerDeadline] = useState('')
	const [answerMessage, setAnswerMessage] = useState('')
	const [answerSuccess, setAnswerSuccess] = useState(false)

	let back = useNavigate()

	let { id } = useParams()

	useEffect(() => {
		api
			.get(`/tasks/${id}`)
			.then(function (response) {
				setTask(response.data)
				setLoaded(true)
			})
			.catch(function (error) {
				setLoaded(false)
				console.log(error)
			})
	}, [id])

	useEffect(() => {
		api
			.get(`/tender`)
			.then(function (response) {
				setTenders(response.data)
				setLoaded(true)
			})
			.catch(function (error) {
				setLoaded(false)
				console.log(error)
			})
	}, [])

	const handleSubmit = async (event) => {
		api
			.post('/tender', {
				id: uuidv2(),
				task_id: task.id,
				author_id: auth.user.id,
				executor: task.author_id,
				title: task.title,
				description: task.description,
				price: task.price,
				published: task.published,
				type: task.type,
				fio: `${auth.user.firstName}`,
				phone: `${auth.user.lastName}`,
				customer_fio: task.author,
				customer_email: task.email,
				author_email: task.email,
				offer_price: answerPrice,
				offer_deadline: answerDeadline,
				message: answerMessage,
				deal: 0,
			})
			.then((response) => {
				setAnswerSuccess(true)
			})
			.catch(function (error) {
				console.log(error)
			})
		setAnswer(false)
	}

	return (
		<div>
			<button className="back" onClick={() => back(-1)}>
				??????????
			</button>

			{loaded ? (
				<div className="task">
					<div className="task__author">
						<div className="task__author-image">
							<img src={avatar} alt="avatar" />
						</div>
						<div className="task__author-text">
							<div className="task__author-name">{task.author}</div>
						</div>
					</div>
					<div className="task__about-box">
						<div className="task__about">
							<div className="title">{task.title}</div>
							<div className="subtitle">????????????</div>
							<div className="task__descr">{task.description}</div>
							{answer ? (
								<div className="task__answer">
									<div className="title">?????? ???????????????????????? ??????????????????????</div>
									<div className="task__answer-price">
										<div class="input">
											<label for="title">??????????????????</label>
											<input
												id="title"
												type="text"
												name="title"
												onChange={(e) => {
													setAnswerPrice(e.target.value)
												}}
											/>
										</div>
									</div>
									<div className="task__answer-deadline">
										<div class="input">
											<label for="title">?????????????? ????</label>
											<input
												id="title"
												type="text"
												name="title"
												placeholder="?? ????????"
												onChange={(e) => {
													setAnswerDeadline(e.target.value)
												}}
											/>
										</div>
									</div>
									<div className="task__answer-message">
										<div class="input">
											<label for="title">?????????? ??????????????????????</label>
											<textarea
												id="title"
												type="text"
												name="title"
												onChange={(e) => {
													setAnswerMessage(e.target.value)
												}}
											/>
										</div>
									</div>
									<br />
									<button className="button" onClick={handleSubmit}>
										??????????????????
									</button>
								</div>
							) : (
								''
							)}
							{answerSuccess ? (
								<div className="success">
									???????? ???????????? ?????????????? ??????????????, ???????????????? ???????????? ??????????????????
								</div>
							) : (
								''
							)}
						</div>
						<div className="task__info">
							<div className="subtitle">???????????????????? ???? ??????????????</div>
							<div className="task__info-lists">
								<div className="task__info-item">
									<span>???????????? ?????????????? ??????????????:</span>
									<span>{task.status === 1 ? '?????????? ??????????????????????' : ''}</span>
								</div>
								<div className="task__info-item">
									<span>??????????????????:</span>
									<span>
										{task.price} {task.price === '????????????????????' ? '' : '??????????'}
									</span>
								</div>
								<div className="task__info-item">
									<span>???????? ????????????????????:</span>
									<span>
										{task.date} {declOfNum(task.date, ['????????', '??????', '????????'])}
									</span>
								</div>
								<div className="task__info-item">
									<span>???????? ????????????????????:</span>
									<span>{task.published}</span>
								</div>
							</div>
							{auth.user ? (
								<button
									className="button full"
									onClick={() => {
										setAnswer(!answer)
									}}>
									???????????????????? ????????????
								</button>
							) : (
								<Link className="task__auth button full" to="/login">
									????????????????????????????
								</Link>
							)}
						</div>
					</div>
				</div>
			) : (
				<Loading />
			)}
		</div>
	)
}

export default Task
