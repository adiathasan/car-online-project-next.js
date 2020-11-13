import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import dbConfig from '../../../config/database';
import { Car } from '../../../models/car';

export default async function getAllCars(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') {
		res.statusCode = 500;
		res.json({
			message: 'You can only get data | Not allowed to change data.',
		});
	} else {
		dbConfig();
		try {
			const cars = await Car.find();
			res.statusCode = 200;
			await mongoose.connection
				.close()
				.then(() => console.log('connection closed'));
			res.json(cars);
		} catch (error) {
			await mongoose.connection
				.close()
				.then(() => console.log('connection closed'));
			res.json(error);
		}
	}
}
