import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '../../../../config/database';
import { Car } from '../../../../models/car';
import { Owner } from '../../../../models/owner';

export default async function getAllCarsOfOwner(
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
		const ownerId = req.query?.ownerId;
		if (mongoose.isValidObjectId(ownerId)) {
			const owner = await Owner.findById(ownerId);
			if (owner) {
				const cars = await Car.find({ owner: owner._id });
				res.statusCode = 200;
				mongoose.connection.close();
				res.json(cars);
			} else {
				res.statusCode = 404;
				mongoose.connection.close();
				res.json({ message: 'Oops! user not found' });
			}
		} else {
			res.statusCode = 404;
			mongoose.connection.close();
			res.json({ message: 'Oops! not a valid Id' });
		}
	}
}
