import type { PageServerLoad } from './$types';

import { getProfileMedia } from '$lib/api';

export const load: PageServerLoad = async ({}) => {
	const data = await getProfileMedia(283527326, {
		cursor: undefined
	});

	return data;
};
