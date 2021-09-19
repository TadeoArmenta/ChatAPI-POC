import path from 'path';
import express from 'express';
import * as bodyParser from 'body-parser';
import { startClient } from '@database/connect';
import { LoggerService } from '@src/services/logger.service';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import documentation from '@src/docs/docs.json'
import { ApiV1 } from '@modules';

const swaggerOptions = {
	failOnErrors: false,
	apis: ['./src/modules/api/v1/accounts.js'],
	definition: documentation
};
const specs = swaggerJsdoc(swaggerOptions);

class AppFactory {
	constructor () {
		this.initDatabaseConnection();
		this.app = express();

		/** Set config & middlewares */
		this.config();

		/** Add API routes */
		this.initializeModules();

		/** Initialize Swagger UI  */
		this.app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(specs));

		this.getIndex();

		this.app.use('*', (req, res) => {
			res.status(404).json({
				statusCode: 404,
				error: 'Not found',
			});
		})
	}

	/**
	 * Initialize database connection
	 *
	 * @private
	 */
	initDatabaseConnection () {
		startClient()
			.then(() => {
				LoggerService.log('Successfully connected to database', 'DatabaseConnection');
			})
			.catch(error => {
				LoggerService.error(error.message, 'DatabaseConnection');
			});
	}

	/**
	 * Initialize application modules
	 *
	 * @private
	 */
	initializeModules () {
		this.addModule(ApiV1.accounts);
		this.addModule(ApiV1.threads);
	}

	/**
	 * Inject Module
	 *
	 * @param {Router} Module
	 *
	 * @private
	 */
	addModule (Module) {
		this.app.use(`${__API_PREFIX}/`, Module);
	}

	/**
	 * Set app configuration
	 *
	 * @private
	 */
	config () {
		this.app.use(bodyParser.json());
		this.app.use(new LoggerService().logger);
	}

	getIndex () {
		this.app.get(__API_PREFIX, (req, res) => {
			const { name, version, author, description } = require(path.join(__BASEDIR, 'package.json'));
			res.status(200).json({ name, version, author, description });
		});
	}
}

export const App = new AppFactory().app;
