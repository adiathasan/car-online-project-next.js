import { GetStaticProps } from 'next';
import React from 'react';
import { NextRouter, useRouter } from 'next/router';
import Link from 'next/link';

export interface Vehicle {
	_id: string;
	model: string;
	owner: string;
	brand: string;
	image: string;
}

export interface Props {
	cars?: Vehicle[];
}

const index: React.FC<Props> = ({ cars }) => {
	const router: NextRouter = useRouter();
	if (router.isFallback) return <h1>Loading...</h1>;
	return (
		<div>
			<div>
				<Link href='/login'>
					<a>Login</a>
				</Link>
			</div>
			<p>I'm a list of cars.</p>
			<ul>
				{cars?.map((car, i) => (
					<Link key={car._id} href={`/cars/${car._id}`}>
						<a>
							<li>
								{car.brand} - {car.model}
							</li>
						</a>
					</Link>
				))}
			</ul>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const cars = await fetch('http://localhost:3000/api/cars').then((res) =>
		res.json()
	);

	return {
		props: {
			cars,
		},
	};
};

export default index;
