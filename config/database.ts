import mongoose from 'mongoose';
import { MONGO_DB_URI } from '../env';

export default async () => {
	mongoose
		.connect(MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
		.then(() => {
			console.log('connected to database');
		});
};
