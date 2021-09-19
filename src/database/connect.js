import mongoose from 'mongoose';

/**
 * @returns {Connection}
 */
// eslint-disable-next-line no-unused-vars
export async function startClient(uri, callback) {
	mongoose.Promise = global.Promise;
	mongoose.connect(process.env.DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
	return await mongoose.connection;
}
