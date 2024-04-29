import axios from 'axios';
import { IQueryResponse, IResponse } from '../types';

function get<T = any>(url: string): Promise<IQueryResponse | IResponse<T>> {
	return axios.get(url);
}

function post<T = any, K = any>(url: string, params: T): Promise<IResponse<K>> {
	return axios.post(url, params);
}

function put<T = any, K = any>(url: string, params: T): Promise<IResponse<K>> {
	return axios.put(url, params);
}

function del<T = any, K = any>(url: string, params: T): Promise<IResponse<K>> {
	return axios.delete(url, { data: params });
}

const Api = {
	get,
	post,
	put,
	delete: del,
	execute<T = any, K = any>(method: string, url: string, params?: T): Promise<IResponse<K>> {
		console.info(`[API] ${method}`, decodeURIComponent(url), params);
		// if (method == 'GET') return Api.get(url);
		if (method == 'POST') return Api.post(url, params || {});
		if (method == 'PUT') return Api.put(url, params || {});
		if (method == 'DELETE') return Api.delete(url, params || {});

		const status: IResponse = {
			Success: false,
			Message: `The '${method}' request method is not implemented. Try to call 'Api.${method}' function`,
			Resource: null,
		};
		console.error('[API].error', status);
		return Promise.resolve(status);
	},
};

export default Api;
