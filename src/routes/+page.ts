import type { PageLoad } from './$types';

import { getImages, hasImages, storeImages } from '$lib/utilities/storage';
import type { ImageMedium } from '$lib/api/vsco/types';

export const load: PageLoad = async ({ fetch }) => {
	if (typeof window !== 'undefined') {
		if (hasImages()) {
			return { media: getImages() };
		}
	}

	const response = await fetch('/api/images');
	const media = (await response.json()) as ImageMedium['image'][];

	if (typeof window !== 'undefined') {
		storeImages(media);
	}

	return { media };
};
