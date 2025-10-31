import type { SingleImageData } from '$lib/types';
import type { PageLoad } from './$types';

import { getImage } from '$lib/utilities/storage';

export const load: PageLoad = async ({ fetch, params }) => {
	if (typeof window !== 'undefined') {
		const result = getImage(params.id);
		if (result) {
			return result;
		}
	}

	const response = await fetch(`/api/image?id=${params.id}`);
	const result = (await response.json()) as SingleImageData;

	return result;
};
