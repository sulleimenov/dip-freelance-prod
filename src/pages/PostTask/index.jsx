import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import useAuth from './../../hooks/useAuth'
import api from './../../services/api/db'
import { declOfNum, uuidv4 } from './../../utils'

const PostTask = () => {
	const auth = useAuth()

	const [tabs, setTabs] = useState([
		{
			title: 'Название',
			complited: false,
		},
		{
			title: 'Описание',
			complited: false,
		},
		{
			title: 'Бюджет',
			complited: false,
		},
		{
			title: 'Публикация',
			complited: false,
		},
	])
	const [active, setActive] = useState(0)
	const navigate = useNavigate()

	const [postTitle, setPostTitle] = useState('')
	const [postDescr, setPostDescr] = useState('')
	const [postDeadlines, setPostDeadlines] = useState('')
	const [postContract, setPostContract] = useState(false)
	const [postPrice, setPostPrice] = useState('')
	const [postType, setPostType] = useState('')

	const handleSubmit = async (event) => {
		api
			.post('/tasks', {
				id: uuidv4(),
				author: `${auth.user.firstName}`,
				author_id: auth.user.id,
				email: auth.user.email,
				title: postTitle,
				description: postDescr,
				status: 1,
				type: postType,
				price: postContract ? 'Договорная' : postPrice,
				date: postDeadlines,
				published: new Date().toLocaleDateString(),
			})
			.then((response) => {
				navigate('/thanks-task')
			})
			.catch(function (error) {
				console.log(error)
			})
	}

	return auth.user ? (
		<div className="create-task">
			<div className="create-task__progress">
				{tabs.map((tab, index) => (
					<span
						className={
							active === index
								? 'active'
								: '' || tab.complited
								? 'complited'
								: ''
						}
						key={index}
						onClick={(e) =>
							e.target.className === 'complited' ? setActive(index) : ''
						}>
						{tab.title}
					</span>
				))}
			</div>
			<div className={`create-task__stage ${active === 0 ? 'show' : ''}`}>
				<div className="title">Что нужно сделать</div>
				<div className="text">
					Придумайте заголовок вашего задания. Кратко опишите, какую задачу надо
					реализовать исполнителю.
				</div>
				<div className="input">
					<label htmlFor="title">Заголовок</label>
					<input
						id="title"
						type="text"
						name="title"
						onChange={(e) => {
							setPostTitle(e.target.value)
						}}
					/>
				</div>
				<button
					className="create-task__button button"
					onClick={() => {
						setActive(1)
						setTabs(
							tabs.map((tab) =>
								tab.title === 'Название' || tab.title === 'Описание'
									? { ...tab, complited: true }
									: tab
							)
						)
					}}>
					Далее
				</button>
			</div>
			<div className={`create-task__stage ${active === 1 ? 'show' : ''}`}>
				<div className="title">Описание задания</div>
				<div className="text">
					Опишите подробно, что необходимо сделать в рамках проекта. Чем
					подробнее опишите задачу, тем качественнее будет результат.
				</div>
				<div className="text">
					Укажите cущественные требования, которым должен соответствовать
					результат: форматы файлов, способы проверки и пр.
				</div>
				<div className="input">
					<label htmlFor="descr">Описание</label>
					<textarea
						id="descr"
						type="text"
						name="descr"
						cols="10"
						rows="10"
						onChange={(e) => {
							setPostDescr(e.target.value)
						}}></textarea>
				</div>
				<button
					className="create-task__button button"
					onClick={() => {
						setActive(2)
						setTabs(
							tabs.map((tab) =>
								tab.title === 'Описание' || tab.title === 'Бюджет'
									? { ...tab, complited: true }
									: tab
							)
						)
					}}>
					Далее
				</button>
			</div>
			<div className={`create-task__stage ${active === 2 ? 'show' : ''}`}>
				<div className="title">Условия сотрудничества</div>
				<div className="text">
					Для максимальной эффективности рекомендуем указывать ожидаемую
					стоимость и сроки.
				</div>
				<div className="input">
					<label htmlFor="time">Максимальный срок выполнения</label>
					<div className="input-box">
						<input
							id="time"
							type="text"
							name="time"
							autoComplete="off"
							placeholder="Введите срок"
							onChange={(e) => {
								setPostDeadlines(e.target.value)
							}}
						/>
						<div className="input-box__info">в днях</div>
					</div>
				</div>
				<div className="input">
					<label htmlFor="time">Стоимость</label>
					<div className="input-box">
						<div className="input-box__contract">
							<input
								type="checkbox"
								name="contract"
								id="contract"
								autoComplete="off"
								onClick={() => setPostContract(!postContract)}
							/>
							<label htmlFor="contract">Договорная</label>
						</div>
						<input
							id="time"
							type="text"
							name="time"
							autoComplete="off"
							placeholder={
								postContract
									? 'Стоимость работ согласовывается индивидуально'
									: ''
							}
							onChange={(e) => {
								setPostPrice(e.target.value)
							}}
							disabled={postContract}
						/>
						<div className="input-box__info">тенге</div>
					</div>
				</div>
				<div className="input">
					<label htmlFor="treaty">Тип договора</label>
					<div className="rows">
						<div className="input-radio">
							<input
								type="radio"
								name="pay"
								id="treaty"
								defaultChecked
								onClick={() => setPostType('По договоренности')}
							/>
							<label htmlFor="treaty">По договоренности</label>
						</div>
						<div className="input-radio">
							<input
								type="radio"
								name="pay"
								id="agreement"
								onClick={() => setPostType('Заключение договора')}
							/>
							<label htmlFor="agreement">Заключение договора</label>
						</div>
					</div>
				</div>
				<button
					className="create-task__button button"
					onClick={() => {
						setActive(3)
						setTabs(
							tabs.map((tab) =>
								tab.title === 'Бюджет' || tab.title === 'Публикация'
									? { ...tab, complited: true }
									: tab
							)
						)
					}}>
					Далее
				</button>
			</div>
			<div className={`create-task__stage ${active === 3 ? 'show' : ''}`}>
				<div className="title">Ваш проект</div>
				<div className="result">
					<div className="result__item">
						<div className="result__title">Название</div>
						<div className="result__value">{postTitle}</div>
					</div>
					<div className="result__item">
						<div className="result__title">Описание</div>
						<div className="result__value">{postDescr}</div>
					</div>
					<div className="result__item">
						<div className="result__title">Бюджет</div>
						<div className="result__value">
							{postContract ? 'Договорная' : `${postPrice} тенге`}{' '}
						</div>
					</div>
					<div className="result__item">
						<div className="result__title">Срок исполнения</div>
						<div className="result__value">
							{postDeadlines}{' '}
							{declOfNum(postDeadlines, ['день', 'дня', 'дней'])}
						</div>
					</div>
					<div className="result__item">
						<div className="result__title">Варианты оплаты</div>
						<div className="result__value">{postType}</div>
					</div>
				</div>
				<button className="button" onClick={handleSubmit}>
					Разместить задание
				</button>
			</div>
		</div>
	) : (
		<div className="need-log">
			<div className="need-log__message">
				Для размещения задания вам необходимо авторизоваться
			</div>
			<div className="need-log__button">
				<Link className="button" to="/login">
					Войти
				</Link>
				<Link className="button button--white" to="/register">
					Зарегистрироваться
				</Link>
			</div>
		</div>
	)
}

export default PostTask
