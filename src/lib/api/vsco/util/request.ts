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
			authorization: `Bearer 7356455548d0a1d886db010883388d08be84d0c9`
		}
	});

	if (!response.ok) {
		throw new APIError(`Request failed with status ${response.status}`);
	}

	return response.json() as T;
}
