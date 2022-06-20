import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import logo from './../../assets/images/logo.svg'
import useAuth from './../../hooks/useAuth'

const Header = () => {
	const auth = useAuth()
	const navigate = useNavigate()
	const [profile, setProfile] = useState(false)
	const [burger, setBurger] = useState(false)
	const profileRef = useRef()
	const burgerRef = useRef()

	const onLogOut = () => {
		auth.logOut()
		setProfile(false)
		navigate('/')
	}

	const handleOutsideClick = (e) => {
		if (!e.path.includes(profileRef.current)) {
			setProfile(false)
		}
		if (!e.path.includes(burgerRef.current)) {
			setBurger(false)
		}
	}

	useEffect(() => {
		document.body.addEventListener('click', handleOutsideClick)
	}, [])
	return (
		<header className="header">
			<div className="logo">
				<Link to="/" className="logo__link">
					<img src={logo} alt="Freelance" />
				</Link>
				<div className="logo__descr">
					<span className="logo__title">Freelance</span>
					<span className="logo__subtitle">фриланс площадка для студентов</span>
				</div>
			</div>
			<div className="menu">
				<Link className="button button--white" to="/">
					Найти работу
				</Link>
				<Link className="button" to="create">
					Разместить задание
				</Link>
			</div>
			<div className="nav">
				{auth.user ? (
					<div className="profile" ref={profileRef}>
						Привет, {auth.user.firstName}
						<div
							className="profile__button"
							onClick={() => {
								setProfile(!profile)
							}}>
							<svg
								width="23"
								height="24"
								viewBox="0 0 23 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M14.9063 20.5128C14.7948 22.4567 13.1239 24 11.0769 24C9.02995 24 7.35908 22.4567 7.24759 20.5128H2.5612C1.14663 20.5128 0 19.4118 0 18.0513C0 16.6923 1.14497 15.5897 2.55787 15.5897L2.55621 10.6666C2.55621 7.19868 4.80789 4.15871 8.09467 2.97758V2.8702C8.09467 1.28526 9.43102 0 11.0769 0C12.7245 0 14.0592 1.28526 14.0592 2.8702V2.97758C17.3459 4.15867 19.5976 7.19872 19.5976 10.6666V15.5897C21.0056 15.5897 22.1538 16.6923 22.1538 18.0513C22.1538 19.4102 21.0072 20.5128 19.5926 20.5128H14.9063ZM13.1971 20.5128H8.95676C9.06493 21.5497 9.97192 22.359 11.077 22.359C12.182 22.359 13.089 21.5497 13.1971 20.5128ZM9.18307 4.35891C6.29067 5.16179 4.26023 7.7211 4.26023 10.6666V15.5897C4.26023 16.4952 3.49635 17.2307 2.55775 17.2307C2.08676 17.2307 1.70401 17.5993 1.70401 18.0513C1.70401 18.5048 2.08678 18.8718 2.56107 18.8718H19.5927C20.0653 18.8718 20.4498 18.5032 20.4498 18.0513C20.4498 17.5993 20.0653 17.2307 19.596 17.2307C18.6558 17.2307 17.8935 16.4984 17.8935 15.5897V10.6666C17.8935 7.7227 15.8632 5.16179 12.9707 4.35891L12.3549 4.18744V2.87014C12.3549 2.19067 11.7824 1.64097 11.0768 1.64097C10.3729 1.64097 9.79873 2.19227 9.79873 2.87014V4.18744L9.18307 4.35891Z"
									fill="#82B93C"></path>
							</svg>
						</div>
						<div className={`profile__dropdown ${profile ? 'show' : ''}`}>
							<Link
								to="/candidate"
								className="profile__item"
								onClick={() => setProfile(false)}>
								Исполнители
							</Link>
							<Link
								to="/complete"
								className="profile__item"
								onClick={() => setProfile(false)}>
								Задачи к выполнению
							</Link>
							<Link to="/" className="profile__item" onClick={onLogOut}>
								Выйти из аккаунта
							</Link>
						</div>
					</div>
				) : (
					<Link className="nav__item" to="login">
						Вход
					</Link>
				)}
				<div className="burger-wrapper" ref={burgerRef}>
					<div
						className="burger"
						onClick={() => {
							setBurger(!burger)
						}}>
						<span></span>
					</div>
					<div className={`burger-dropdown ${burger ? 'show' : ''}`}>
						<Link className="" to="/" onClick={() => setBurger(false)}>
							Найти работу
						</Link>
						<Link className="" to="create" onClick={() => setBurger(false)}>
							Разместить задание
						</Link>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
