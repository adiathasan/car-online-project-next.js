import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { Car } from '../../models/car';
import { Owner } from '../../models/owner';
import dbConfig from '../../config/database';
import { NextApiRequest, NextApiResponse } from 'next';

export default function migration(req: NextApiRequest, res: NextApiResponse) {
	async function migrate() {
		dbConfig();
		await Owner.deleteMany({});
		await Car.deleteMany({});

		const owner = new Owner({
			name: 'Adiat Hasan',
			email: 'adiathasan.me@gmail.com',
			password: await bcrypt.hash('123456', 10),
		});
		const createdOwner = await owner.save();
		await Car.insertMany([
			{
				owner: createdOwner._id,
				brand: 'Audi',
				model: 'R8',
				image:
					'https://cdn.motor1.com/images/mgl/qjRXZ/s1/audi-r8-v10-decennium.jpg',
			},
			{
				owner: createdOwner._id,
				brand: 'Lamborghini',
				model: 'Aventador Roadster SVJ Xago Edition',
				image:
					'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2020%2F07%2F2021-lamborghini-aventador-svj-xago-edition-launch-info-3.jpg?q=75&w=800&cbr=1&fit=max',
			},
		]);
	}

	mongoose.connection.close();

	migrate();

	res.json({ message: 'success' });
}
