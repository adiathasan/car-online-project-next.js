import React from 'react';

export interface Vehicle {
	details: string;
	ownerName: string;
	brand: string;
}

export interface Props {
	vehicle?: Vehicle[];
}

const index: React.FC<Props> = ({ vehicle }) => {
	return (
		<div>
			<p>I'm a list of cars.</p>
			<ul>
				{vehicle?.map((v, i) => (
					<li key={i}>{v.ownerName}</li>
				))}
			</ul>
		</div>
	);
};

export const getStaticProps = async () => {
	return {
		props: {
			vehicle: [
				{
					ownerName: 'Kuddus',
					brand: 'Audi',
					details: 'shit at me',
				},
			],
		},
	};
};

export default index;
