export interface BaseMedium {
	type: string;
}

export interface ImageMedium extends BaseMedium {
	type: string;
	image: {
		_id: string;
		grid_name: string;
		adaptive_base: string;
		site_id: number;
		site_profile_image_url: string;
		description: string;
		description_anchored: string;
		copyright_classes: Array<'reserved'>;
		capture_date: number;
		capture_date_ms: number;
		upload_date: number;
		last_updated: number;
		location_coords: null;
		has_location: false;
		feature_link: null;
		is_featured: false;
		is_video: false;
		perma_domain: string;
		perma_subdomain: string;
		permalink: string;
		share_link: string;
		responsive_url: string;
		show_location: 0 | 1;
		image_status: {
			code: 1;
			time: number;
		};
		image_meta: ImageMeta;
		height: number;
		width: number;
		tags?: Array<{
			text: string;
			slug: string;
		}>;
	};
}

export interface BaseMediaMeta {
	file_size: number;
	file_hash: string;
	copyright: string;
	software: string;
	extension: number;
}

export interface CameraImageMeta {
	aperture: number;
	flash_mode: string;
	iso: number;
	make: string;
	model: string;
	shutter_speed: string;
	white_balance: string;
	orientation: 0 | 1;
	flash_value: number;
}

/** CameraImageMeta is not always available */
export type ImageMeta = CameraImageMeta & Partial<BaseMediaMeta>;

export type Medium = ImageMedium;

export interface ProfileMedia {
	media: Medium[];
	next_cursor?: string;
	previous_cursor?: string;
}

export interface Profile {
	sites: Site[];
}

export interface Site {
	collection_share_link: string;
	description: string;
	domain: string;
	externalLink: string;
	externalLinkDisplayText: string;
	grid_album_id: string;
	has_grid: boolean;
	id: number;
	is_brand: boolean;
	internal_site: boolean;
	museum: boolean;
	name: string;
	password: null;
	profile_image: string;
	profile_image_id: string;
	recently_published: string;
	responsive_url: string;
	share_link: string;
	site_collection_id: string;
	status: 'published';
	subdomain: number;
	type: number;
	user_id: number;
	site_title: string;
	template: {
		name: number;
	};
	links: Record<string, never>;
}

export interface SingleMedia {
	media: ImageMedium['image'];
}

export interface MediaSiblings {
	previous?: ImageMedium['image'];
	next?: ImageMedium['image'];
}
