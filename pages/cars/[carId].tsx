import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Vehicle } from './index';

const car: React.FC<{ car: Vehicle }> = ({ car }) => {
	const router = useRouter();
	if (router.isFallback) return <h1>Loading..</h1>;
	return <div>my car is - {car.brand}</div>;
};

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [{ params: { car: 'bmw' } }],
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		props: {
			car: { brand: 'Bugatti Feran' + ' ' + context.params?.carId },
		},
	};
};

export default car;
