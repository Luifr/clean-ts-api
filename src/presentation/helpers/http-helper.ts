import { IHttpResponse } from '@interfaces/http';

export const badRequest = (error: Error): IHttpResponse => {
	return {
		statusCode: 400,
		body: error
	};
};

export const okResponse = <T>(data: T): IHttpResponse<T> => {
	return {
		statusCode: 200,
		body: data
	};
};
