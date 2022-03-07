import { ServerError } from '@presentation/errors/server-error';
import { IHttpResponse } from '@presentation/interfaces/http';

export const badRequest = (error: Error): IHttpResponse => {
	return {
		statusCode: 400,
		body: error
	};
};

export const serverError = (): IHttpResponse => {
	return {
		statusCode: 500,
		body: new ServerError()
	};
};

export const okResponse = <T>(data: T): IHttpResponse<T> => {
	return {
		statusCode: 200,
		body: data
	};
};
