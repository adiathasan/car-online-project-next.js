import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import dbConfig from '../../config/database';
import { Owner } from '../../models/owner';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET } from '../../env';

const getToken = (user: object) => {
	const token = jwt.sign(user, JWT_SECRET, { expiresIn: '10d' });
	return token;
};

export default async function getOwnerById(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const { email, password, name } = JSON.parse(req.body);
		dbConfig();
		const user: any = await Owner.findOne({ email });

		if (user) {
			res.statusCode = 400;
			res.json({
				message: `user with email: ${email} already exists`,
			});
		} else {
			const createdUser: any = await Owner.create({
				email,
				password: await bcrypt.hash(password, 10),
				name,
			});

			res.statusCode = 201;
			res.json({
				token: getToken({
					email: createdUser.email,
					name: createdUser.name,
				}),
			});
		}
		mongoose.connection.close();
	} else {
		res.statusCode = 500;
		res.json({
			message: 'You can only post data | Not allowed to get/put data.',
		});
	}
}
