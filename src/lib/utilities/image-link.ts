import type { ImageMedium } from '$lib/api/vsco/types';

export function imageLink(image: ImageMedium['image'], width: number) {
	const url = new URL('https://' + image.responsive_url);
	url.searchParams.set('w', width.toString());

	return url.toString();
}

export function imageName(image: ImageMedium['image']) {
	return basename(image.responsive_url);
}

function basename(path: string) {
	return path.split('/').pop() || '';
}

const VIEWPORTS = [320, 640, 750, 828, 1080, 1280, 1668, 2048, 2560];

export function imageSrcset(image: ImageMedium['image']) {
	return [...VIEWPORTS, image.width]
		.map((width) => `${imageLink(image, width)} ${width}w`)
		.join(', ');
}

export function getImageSize(viewportSize: number) {
	return VIEWPORTS.find((size) => size >= viewportSize) || VIEWPORTS[VIEWPORTS.length - 1];
}
