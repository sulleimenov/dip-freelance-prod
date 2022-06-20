import { Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import './sass/app.sass'
import { Home, Profile, Task, Register, Login, NotFound, PostTask, Candidate, Сomplete, Thanks, PostTaskThanks } from './pages'

function App() {
	return (
		<div className="box">
			<Header />

			<div className="box__body">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="profile" element={<Profile />} />
					<Route path="candidate" element={<Candidate />} />
					<Route path="complete" element={<Сomplete />} />
					<Route path="task/:id" element={<Task />} />
					<Route path="register" element={<Register />} />
					<Route path="login" element={<Login />} />
					<Route path="create" element={<PostTask />} />
					<Route path="thanks" element={<Thanks />} />
					<Route path="thanks-task" element={<PostTaskThanks />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>

			<Footer />
		</div>
	)
}

export default App
