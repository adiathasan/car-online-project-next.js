import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Vehicle } from './index';

const car: React.FC<{ car: Vehicle }> = ({ car }) => {
	const router = useRouter();
	if (router.isFallback) return <h1>Loading..</h1>;
	return (
		<div>
			my car is - {car.brand} - {car.model}
			<img src={car.image} alt={car.brand} width='300px' />
		</div>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const cars: Vehicle[] = await fetch(
		'http://localhost:3000/api/cars'
	).then((res) => res.json());

	const paths = cars.map((car) => ({ params: { carId: car._id } }));

	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	const car: Vehicle = await fetch(
		`http://localhost:3000/api/cars/${context.params?.carId}`
	).then((res) => res.json());
	return {
		props: {
			car,
		},
	};
};

export default car;
