import { Button, FormControl, Input } from '@material-ui/core';
import React, { FormEvent, useState } from 'react';

const signup = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSignup = async (e: FormEvent) => {
		e.preventDefault();
		const data = await fetch('http://localhost:3000/api/signup', {
			method: 'POST',
			body: JSON.stringify({ email, password, name }),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
		console.log(data);
	};
	return (
		<div>
			<form onSubmit={handleSignup}>
				<FormControl color='primary' variant='outlined' fullWidth>
					<Input
						value={name}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setName(e.target.value)
						}
						placeholder='Name'
						autoFocus
					/>
				</FormControl>
				<FormControl color='primary' variant='outlined' fullWidth>
					<Input
						value={email}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setEmail(e.target.value)
						}
						placeholder='Email'
						autoFocus
					/>
				</FormControl>
				<FormControl color='primary' variant='filled' fullWidth>
					<Input
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

export default signup;
