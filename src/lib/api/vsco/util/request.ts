import { APIError } from './error';
import { __settings } from './settings';

interface RequestMeta {
	method?: string;
	query?: Record<string, string>;
}

export async function request<T = unknown>(endpoint: string, meta: RequestMeta = {}) {
	if (!__settings.token) {
		throw new APIError('Token not set');
	}

	const url = new URL(__settings.baseUrl + endpoint);

	if (meta.query) {
		url.search = new URLSearchParams(meta.query).toString();
	}

	const response = await fetch(url, {
		method: 'GET',
		headers: {
			authorization: `Bearer ${__settings.token}`,
			Te: 'trailers',
			'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:148.0) Gecko/20100101 Firefox/148.0'
		}
	});

	if (!response.ok) {
		throw new APIError(`Request failed with status ${response.status}`);
	}

	return response.json() as T;
}
