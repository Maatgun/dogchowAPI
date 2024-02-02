import { Schema } from "mongoose";

export interface IShippingDetails {
	name: string;
	cellphone: number;
    email: string;
	address: string;
}

export const ShippingDetailsSchema = new Schema<IShippingDetails>({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	cellphone: {
		type: Number,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
});