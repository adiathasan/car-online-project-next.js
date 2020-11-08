import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export const getStaticProps = async () => {
	return {
		props: {
			name: 'Joe Biden',
		},
	};
};

interface Props {
	name: string;
}

const Home: React.FC<Props> = ({ name }) => {
	return (
		<div className={styles.container}>
			<Head>
				<title>I will make you pay {name}</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div>
				<Link
					href={{
						pathname: '/cars/audi',
					}}>
					<a>click me</a>
				</Link>
			</div>
			<div>
				<Link
					href={{
						pathname: '/cars',
					}}>
					<a>click me to cars page</a>
				</Link>
			</div>
		</div>
	);
};

export default Home;
