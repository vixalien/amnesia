import type { MediaSiblings, ProfileMedia, SingleMedia } from '../types';

import { request } from '../util/request';

export interface Pagination {
	limit?: number;
	cursor?: string;
}

export function getProfileMedia(site_id: number, pagination: Pagination = {}) {
	const { limit = 20, cursor = '' } = pagination;

	return request<ProfileMedia>(`3.0/medias/profile`, {
		query: {
			site_id: site_id.toString(),
			limit: limit.toString(),
			cursor: cursor
		}
	});
}

export function getMedia(id: string) {
	return request<SingleMedia>(`2.0/medias/${id}`);
}

export function getMediaSiblings(id: string) {
	return request<MediaSiblings>(`2.0/medias/${id}/siblings`);
}
