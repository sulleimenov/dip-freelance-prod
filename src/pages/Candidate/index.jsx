import React, { useEffect, useState } from 'react'

import useAuth from './../../hooks/useAuth'
import api from './../../services/api/db'
import styles from './Candidate.module.sass'
import Loading from '../../components/Loading'
import { declOfNum } from './../../utils'

const Candidate = () => {
	const auth = useAuth()
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
		let id = e.currentTarget.dataset.id;
		api
		.patch(`/tender/${id}`, {
			deal: 1
		})
		.then((response) => {
			alert('Задание изменено!')
		})
		.catch(function (error) {
			console.log(error)
		})
	}

	return loaded ? (
		<div>
			<div className="title">Исполнители</div>
			{tenders.length !== 0 ? (
				<div>
					<div className={styles.head}>
						<div className={styles.head__item}>№</div>
						<div className={styles.head__item}>Имя</div>
						<div className={styles.head__item}>Предлагаемая цена</div>
						<div className={styles.head__item}>Срок выполнения</div>
						<div className={styles.head__item}>Сообщение</div>
					</div>
					<div className={styles.list}>
						{tenders.map((tender, index) => (
							<div className={styles.list__item} key={index}>
								<div className={styles.list__column}>{index + 1}</div>
								<div className={styles.list__column}>{tender.fio}</div>
								<div className={styles.list__column}>
									{tender.offer_price} тенге
								</div>
								<div className={styles.list__column}>
									{tender.offer_deadline}{' '}
									{declOfNum(tender.offer_deadline, ['день', 'дня', 'дней'])}
								</div>
								<div className={styles.list__column}>{tender.message}</div>
								<button className={styles.button} onClick={handleAccept} data-id={tender.id}>
									<svg
										width="15"
										height="15"
										viewBox="0 0 15 15"
										fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<path
											d="M1 7L5.5 11.5L14 3"
											stroke="#fff"
											strokeLinecap="square"
										/>
									</svg>
								</button>
							</div>
						))}
					</div>
				</div>
			) : (
				<div className={styles.not}>На вашу работу еще никто не отозвался!</div>
			)}
		</div>
	) : (
		<Loading />
	)
}

export default Candidate
