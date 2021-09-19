import { HttpException } from './http.exception';
import { HttpStatus } from '@utils';

export class UnauthorizedException extends HttpException {
	constructor (message, error = 'Unauthorized') {
		super(
			HttpException.createHttpExceptionBody(message, error, HttpStatus.UNAUTHORIZED),
			HttpStatus.UNAUTHORIZED,
		);
	}
}
