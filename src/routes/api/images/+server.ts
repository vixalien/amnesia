import type { ImageMedium } from '$lib/api/vsco/types';
import type { RequestHandler } from './$types';

import { json } from '@sveltejs/kit';
import { getProfileMedia } from '$lib/api';
import { AMNESIA_SITE_ID } from '$env/static/private';
import { getCached, setCached } from '$lib/cache';

const CACHE_KEY = ['images', 'profile'];
const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour

export const GET: RequestHandler = async () => {
	let cursor: string | undefined = undefined;
	let media: ImageMedium['image'][] = [];

	try {
		do {
			const data = await getProfileMedia(Number(AMNESIA_SITE_ID), {
				cursor
			});

			media.push(...data.media.map((item) => item.image));

			cursor = data.next_cursor;
		} while (false);

		const sortedMedia = media.toSorted((a, b) => b.capture_date_ms - a.capture_date_ms);

		await setCached(CACHE_KEY, sortedMedia, CACHE_TTL_MS);

		return json(sortedMedia);
	} catch (error) {
		console.error('Error fetching images from API, trying cache:', error);

		const cachedMedia = await getCached<ImageMedium['image'][]>(CACHE_KEY);

		if (cachedMedia) {
			return json(cachedMedia);
		}

		throw error;
	}
};
