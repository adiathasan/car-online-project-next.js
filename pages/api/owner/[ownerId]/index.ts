import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import dbConfig from '../../../../config/database';
import { Owner } from '../../../../models/owner';

export default async function getOwnerById(
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
			const owner = await Owner.findById(ownerId).select('-password');
			if (owner) {
				res.statusCode = 200;
				mongoose.connection.close();
				res.json(owner);
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
