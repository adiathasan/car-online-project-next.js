import { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '../../../config/database';
import { Car } from '../../../models/car';
import mongoose from 'mongoose';

export default async function getCarById(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') {
		res.statusCode = 500;
		res.json({
			message: 'You can only get data | Not allowed to change data.',
		});
	} else {
		const carId = req.query?.carId;
		dbConfig();
		try {
			if (mongoose.isValidObjectId(carId)) {
				const car = await Car.findById(carId);
				res.statusCode = 200;
				mongoose.connection
					.close()
					.then(() => console.log('connection closed'));
				res.json(car);
			} else {
				await mongoose.connection
					.close()
					.then(() => console.log('connection closed'));
				res.json({ message: 'Oops! not a valid id.' });
			}
		} catch (error) {
			await mongoose.connection
				.close()
				.then(() => console.log('connection closed'));
			res.json(error);
		}
	}
}
