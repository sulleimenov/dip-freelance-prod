import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";

function Login() {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const auth = useAuth();

	const schema = yup.object().shape({
		email: yup.string().email().required('Введите адрес электронной почты!'),
		password: yup.string().required('Введите пароль!').typeError('A number is required'),
	})

	const { register, handleSubmit, formState: { errors }, setError } = useForm({
		resolver: yupResolver(schema),
	});
	
	const onSubmit = async (data) => {
		try {
			setIsLoading(true);
			const { data: loginData } = await api.auth.login(data);
			navigate('/')

			auth.setToken(loginData.token);
			auth.setUser(loginData.user);
		} catch (e) {
			if (e.response.status === 422) {
				Object.keys(e.response.data.errors).forEach((key) => {
					setError(key, {
						type: "manual",
						message: e.response.data.errors[key],
					});
				});
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<form className='form' onSubmit={handleSubmit(onSubmit)}>
				<div className="title center">Вход</div>
				<input {...register("email", { required: true })} autoComplete="off" />
				<p className='error'>{errors.email?.message}</p>
				<input type='password' {...register("password", { required: true })} autoComplete="off" />
				<p className='error'>{errors.password?.message}</p>
				<input className='button' type="submit" />
				<div className="register">
					<span>Нет аккаунта?!</span>
					<Link to='/register'>Зарегистрируйтесь</Link>
				</div>
			</form>
		</div>
	)
}

export default Login
