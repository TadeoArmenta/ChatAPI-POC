import {isObject} from "@src/utils/shared";

export const createHttpExceptionBody = (
	message,
	error,
	statusCode,
) => {
	if (!message) {
		return { statusCode, error };
	}
	return isObject(message) && !Array.isArray(message)
		? message
		: { statusCode, error, message };
};
