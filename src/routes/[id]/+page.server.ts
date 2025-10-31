import type { PageServerLoad } from './$types';

import { error } from '@sveltejs/kit';
import { getMedia, getMediaSiblings } from '$lib/api';

export const load: PageServerLoad = async ({ params }) => {
	const [{ media }, { next, previous }] = await Promise.all([
		getMedia(params.id),
		getMediaSiblings(params.id)
	]);

	return { media, next, previous };
};
