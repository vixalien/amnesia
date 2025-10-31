import type { RequestHandler } from './$types';

import { error, json } from '@sveltejs/kit';
import { getMedia, getMediaSiblings } from '$lib/api';
import type { SingleImageData } from '$lib/types';

export const GET: RequestHandler = async ({ url }) => {
	const id = url.searchParams.get('id');

	if (!id) error(400, 'Missing ID param');

	const [{ media }, { next, previous }] = await Promise.all([getMedia(id), getMediaSiblings(id)]);

	return json({ media, next, previous } as SingleImageData);
};
