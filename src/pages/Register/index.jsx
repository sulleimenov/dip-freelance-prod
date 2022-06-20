import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import api from '../../services/api'
import useAuth from '../../hooks/useAuth'

const Register = () => {
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()
	const auth = useAuth()

	const phoneRegExp = /^((\\[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

	const schema = yup.object().shape({
		email: yup
			.string()
			.email('Некорректный email')
			.required('Укажите адрес электронной почты'),
		password: yup
			.string()
			.min(6, 'Придумайте пароль от 6 символов')
			.required('Введите пароль'),
		firstName: yup.string().required('Введите своё имя'),
		lastName: yup.string().matches(phoneRegExp, 'Введите правильный телефон').required('Введите телефон')
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm({
		resolver: yupResolver(schema),
	})

	const onSubmit = async (data) => {
		try {
			setIsLoading(true)
			await api.auth.registration(data)
			const { data: loginData } = await api.auth.login(data)
			auth.setToken(loginData.token)
			auth.setUser(loginData.user)
			navigate('/thanks')
		} catch (e) {
			if (e.response.status === 422) {
				Object.keys(e.response.data.errors).forEach((key) => {
					setError(key, {
						type: 'manual',
						message: e.response.data.errors[key],
					})
				})
			}
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<div>
			<form className="form" onSubmit={handleSubmit(onSubmit)}>
				<div className="title center">Регистрация</div>
				<input
					{...register('email', { required: true })}
					placeholder="E-mail"
				/>
				<p className="error">{errors.email?.message}</p>
				<input
					{...register('firstName', { required: true })}
					placeholder="Имя"
				/>
				<p className="error">{errors.firstName?.message}</p>
				<input
					{...register('lastName', { required: true })}
					placeholder="Телефон"
				/>
				<p className="error">{errors.lastName?.message}</p>
				<input
					type="password"
					{...register('password', { required: true })}
					placeholder="Пароль"
				/>
				<p className="error">{errors.password?.message}</p>
				<input className="button" type="submit" />
			</form>
		</div>
	)
}

export default Register
