import type { ImageMedium } from './api/vsco/types';

export interface SingleImageData {
	media: ImageMedium['image'];
	previous?: ImageMedium['image'];
	next?: ImageMedium['image'];
}
