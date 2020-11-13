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
		const { email, password } = JSON.parse(req.body);
		dbConfig();
		const user: any = await Owner.findOne({ email });
		console.log(user);

		if (user && (await bcrypt.compare(password, user.password))) {
			res.statusCode = 201;
			res.json({ token: getToken({ email: user.email, name: user.name }) });
		} else {
			res.statusCode = 401;
			res.json({
				message: 'Invalid username or password',
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
