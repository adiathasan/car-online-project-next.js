import mongoose from 'mongoose';

const owner = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, trim: true, unique: true },
		password: { type: String, required: true },
	},
	{ timestamps: true }
);

mongoose.models = {};

export const Owner = mongoose.model('Owner', owner);
