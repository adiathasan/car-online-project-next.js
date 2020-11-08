import { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '../../../../config/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'GET') {
		res.statusCode = 500;
		res.json({
			message: 'You can only get data | Not allowed to change data.',
		});
	} else {
		dbConfig();
		res.statusCode = 200;
		res.json({
			cars: [
				{ brand: 'bugatti', owner: 'khalid' },
				{ brand: 'Lamborgini', owner: 'khalid' },
			],
		});
	}
};
