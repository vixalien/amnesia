import https from 'https';
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

	return new Promise<T>((resolve, reject) => {
		const req = https.request(
			url,
			{
				method: meta.method ?? 'GET',
				headers: {
					'User-Agent': 'my-app/1.0',
					Authorization: `Bearer ${__settings.token}`,
					TE: 'trailers'
				}
			},
			(res) => {
				const chunks: Buffer[] = [];
				res.on('data', (chunk: Buffer) => chunks.push(chunk));
				res.on('end', () => {
					const body = Buffer.concat(chunks).toString();

					if (!res.statusCode || res.statusCode >= 400) {
						reject(new APIError(`Request failed with status ${res.statusCode}`));
						return;
					}

					try {
						resolve(JSON.parse(body) as T);
					} catch {
						reject(new APIError(`Failed to parse response as JSON`));
					}
				});
			}
		);

		req.on('error', reject);
		req.end();
	});
}
