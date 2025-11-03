import type { PageLoad } from './$types';

import { getImages, hasImages, storeImages } from '$lib/utilities/storage';
import { findImage } from '$lib/utilities/image-data';
import { error } from '@sveltejs/kit';
import type { ImageMedium } from '$lib/api/vsco/types';

export const load: PageLoad = async ({ fetch, params }) => {
	if (typeof window !== 'undefined') {
		if (hasImages()) {
			return getImageFromCache(params.id);
		}
	}

	const response = await fetch('/api/images');
	const media = (await response.json()) as ImageMedium['image'][];

	storeImages(media);

	return getImageFromCache(params.id);
};

function getImageFromCache(id: string) {
	const image = findImage(getImages(), id);
	if (!image) {
		error(404, 'Image not found');
	}
	return image;
}
