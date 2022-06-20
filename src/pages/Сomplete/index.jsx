import React, { useEffect, useState, useRef } from 'react'

import useAuth from './../../hooks/useAuth'
import api from './../../services/api/db'
import Loading from '../../components/Loading'
import styles from './Сomplete.module.sass'
import { declOfNum } from './../../utils'

const Complete = () => {
	const auth = useAuth()
	const [tenders, setTenders] = useState([])
	const [tasks, setTasks] = useState([])
	const [loaded, setLoaded] = useState(false)
	// const idTask = useRef()

	// let idd = idTask.current.getAttribute('data-id')

	// useEffect(() => {
	// 	api
	// 		.get(`/tasks?id=${idd}`)
	// 		.then(function (response) {
	// 			setTasks(response.data)
	// 			setLoaded(true)
	// 		})
	// 		.catch(function (error) {
	// 			setLoaded(false)
	// 			console.log(error)
	// 		})
	// }, [])

	const userId = auth.user ? auth.user.id : ''
	
	useEffect(() => {
		api
			.get(`/tender?author_id=${userId}`)
			.then(function (response) {
				setTenders(response.data)
				setLoaded(true)
			})
			.catch(function (error) {
				setLoaded(false)
				console.log(error)
			})
	}, [userId])

	return (
		<div>
			<div className="title">Задание к выполнению</div>
			{tenders.length === 1 ? (
				tenders.map((tender, index) => (
					<div key={index}>
						<div className={styles.info}>
							<div className={styles.title}>{tender.title}</div>
							<div className={styles.text}>{tender.description}</div>
							<div className={styles.column}>
								<span className={styles.text}>
									Срок выполнения: {tender.offer_deadline}{' '}
									{declOfNum(tender.offer_deadline, ['день', 'дня', 'дней'])}
								</span>
								<span className={styles.text}>
									Стоимость: {tender.offer_price} тенге
								</span>
							</div>
						</div>
						<div className={styles.deadline}>
							<div className={styles.title}>Информация о заказчике</div>
							<div className="text">Имя: {tender.customer_fio}</div>
							<div className="text">E-mail: {tender.customer_email}</div>
							<div className="text">Телефон: {tender.phone}</div>
							<a
								href={`https://wa.me/${
									tender.phone
								}?text=Здравствуйте, готов выполнить задание за ${
									tender.offer_price
								} тенге. Уложусь за ${tender.offer_deadline} ${declOfNum(
									tender.offer_deadline,
									['день', 'дня', 'дней']
								)}.`}
								target="_blank"
								className={styles.link}>
								Написать заказчику
							</a>
						</div>
					</div>
				))
			) : (
				<div className={styles.not}>У вас нет активных задании!</div>
			)}
		</div>
	)
}

export default Complete
