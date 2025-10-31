import type { ImageMedium } from '$lib/api/vsco/types';
import type { RequestHandler } from './$types';

import { json } from '@sveltejs/kit';
import { getProfileMedia } from '$lib/api';
import { AMNESIA_SITE_ID } from '$env/static/private';

export const GET: RequestHandler = async () => {
	let cursor: string | undefined = undefined;
	let media: ImageMedium['image'][] = [];

	do {
		const data = await getProfileMedia(Number(AMNESIA_SITE_ID), {
			cursor
		});

		media.push(...data.media.map((item) => item.image));

		cursor = data.next_cursor;
	} while (cursor);

	return json(media);
};
