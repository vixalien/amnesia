import type { Profile } from '../types';

import { request } from '../util/request';

/**
 * Get the profile information of a user
 * @param username the username of the profile to get
 * @returns
 */
export function getProfile(username: string) {
	return request<Profile>(`2.0/sites`, {
		query: {
			subdomain: username,
			include_sub_status: 'true'
		}
	});
}
