import * as mongoose from 'mongoose';
import { MONGO_DB_URI } from '../env';

const dbConfig = async () => {
	mongoose
		.connect(MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
		.then(() => {
			console.log('connected to database');
		});

	const db = mongoose.connection;

	db.on('error', console.error.bind(console, 'MongoDB connection error:'));
};

export default dbConfig;
