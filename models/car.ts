import mongoose from 'mongoose';

const car = new mongoose.Schema(
	{
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Owner',
		},
		brand: { type: String, required: true, trim: true },
		model: { type: String, required: true, trim: true },
		image: { type: String, required: true, trim: true },
	},
	{ timestamps: true }
);

mongoose.models = {};

export const Car = mongoose.model('Car', car);
