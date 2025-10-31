import type { ImageMedium } from '$lib/api/vsco/types';

export function imageBackground(image: ImageMedium['image']) {
	return '#' + (image.image_meta.file_hash || image._id).slice(-6);
}
