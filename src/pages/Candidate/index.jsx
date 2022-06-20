import React, { useEffect, useState } from 'react'

import useAuth from './../../hooks/useAuth'
import api from './../../services/api/db'
import styles from './Candidate.module.sass'
import Loading from '../../components/Loading'
import { declOfNum } from './../../utils'
import { useNavigate } from 'react-router-dom'

const Candidate = () => {
	const auth = useAuth()
	const navigate = useNavigate()

	const [tenders, setTenders] = useState([])
	const [tasks, setTasks] = useState([])
	const [loaded, setLoaded] = useState(false)

	const authId = auth.user ? auth.user.id : ''

	useEffect(() => {
		api
			.get(`/tasks?author_id=${authId}`)
			.then(function (response) {
				setTasks(response.data)
				setLoaded(true)
			})
			.catch(function (error) {
				setLoaded(false)
				console.log(error)
			})
	}, [authId])

	useEffect(() => {
		api
			.get(`/tender?executor=${authId}`)
			.then(function (response) {
				setTenders(response.data)
				setLoaded(true)
			})
			.catch(function (error) {
				setLoaded(false)
				console.log(error)
			})
	}, [authId])

	const handleAccept = async (e) => {
		let id = e.currentTarget.dataset.id
		api
			.patch(`/tender/${id}`, {
				deal: 1,
			})
			.then((response) => {})
			.catch(function (error) {
				console.log(error)
			})
	}

	const handleClose = async (e) => {
		let id = e.currentTarget.dataset.iddel
		let deltaskid = e.currentTarget.dataset.deltaskid
		api
			.delete(`/tender/${id}`)
			.then((response) => {})
			.catch(function (error) {
				console.log(error)
			})
		api
			.patch(`/tasks/${deltaskid}`, {
				status: 0
			})
			.then((response) => {})
			.catch(function (error) {
				console.log(error)
			})
	}

	return loaded ? (
		<div>
			<div className="title">Исполнители</div>
			{tenders.length !== 0 ? (
				<div className="candidate-list">
					{tenders.map((tender, index) => (
						<div className="candidate-list__item" key={index}>
							<div className="candidate-list__row">
								<span>Статус:</span>
								<span>
									{tender.deal === 0 ? (
										<div className="candidate-list__except">Ожидание</div>
									) : (
										<div className="candidate-list__progress">Выполняется</div>
									)}
								</span>
							</div>
							<div className="candidate-list__row">
								<span>Имя:</span>
								<span>{tender.fio}</span>
							</div>
							<div className="candidate-list__row">
								<span>Предлагаемая цена:</span>
								<span>{tender.offer_price} тенге</span>
							</div>
							<div className="candidate-list__row">
								<span>Срок выполнения:</span>
								<span>
									{tender.offer_deadline}{' '}
									{declOfNum(tender.offer_deadline, ['день', 'дня', 'дней'])}
								</span>
							</div>
							<div className="candidate-list__row_message">
								<span>Сообщение:</span>
								<span>{tender.message}</span>
							</div>
							{tender.deal !== 1 ? (
								<div
									className="candidate-list__accept"
									onClick={handleAccept}
									data-id={tender.id}>
									Принять условия
								</div>
							) : (
								<div
									className="candidate-list__close"
									onClick={handleClose}
									data-iddel={tender.id}
									data-deltaskid={tender.task_id}>
									Закрыть задачу
								</div>
							)}
						</div>
					))}
				</div>
			) : (
				<div className="not">На вашу работу еще никто не отозвался!</div>
			)}
		</div>
	) : (
		<Loading />
	)
}

export default Candidate
