import { Button, FormControl, Input } from '@material-ui/core';
import React, { FormEvent, useState } from 'react';

const login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async (e: FormEvent) => {
		e.preventDefault();
		const data = await fetch('http://localhost:3000/api/login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	};
	return (
		<div>
			<form onSubmit={handleLogin}>
				<FormControl color='primary' variant='outlined'>
					<Input
						fullWidth
						value={email}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setEmail(e.target.value)
						}
						placeholder='Email'
						autoFocus
					/>
				</FormControl>
				<FormControl color='primary' variant='filled'>
					<Input
						fullWidth
						value={password}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setPassword(e.target.value)
						}
						placeholder='Password'
					/>
				</FormControl>
				<Button variant='contained' type='submit' color='primary'>
					Submit
				</Button>
			</form>
		</div>
	);
};

export default login;
