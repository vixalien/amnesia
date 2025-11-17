<script lang="ts">
	import { swipeable } from '@react2svelte/swipeable';
	import type { SwipeEventData } from '@react2svelte/swipeable';

	import { goto } from '$app/navigation';

	import { keyboardNavigate } from '$lib/actions/keyboard-navigate.js';
	import { smartNavigate } from '$lib/actions/smart-navigate.js';

	import IconButton from '$lib/components/icon-button.svelte';
	import ShareButton from '$lib/components/share-button.svelte';

	import LeftIcon from '$lib/assets/icon-left.svg';
	import RightIcon from '$lib/assets/icon-right.svg';
	import CloseIcon from '$lib/assets/icon-close.svg';

	import { goBackTo } from '$lib/stores/navigation.js';

	import { imageBackground } from '$lib/utilities/image-background.js';
	import { getImageSize, imageLink, imageSrcset } from '$lib/utilities/image-link.js';
	import { onMount } from 'svelte';

	const { data } = $props();

	let translateX = $state(0);
	let translateY = $state(0);
	let scale = $state(1);
	let isDone = $state(false);

	function handleSwiping(e: CustomEvent<SwipeEventData>) {
		translateX = e.detail.deltaX;
		translateY = e.detail.deltaY;
		isDone = false;

		// Calculate distance and scale
		const distance = Math.sqrt(e.detail.absX ** 2 + e.detail.absY ** 2);
		const maxDistance = 30; // Max distance before minimum scale
		const maxScaleReduction = 0.1; // Scale down to 0.7 at max distance

		scale = Math.max(0.7, 1 - (distance / maxDistance) * maxScaleReduction);
	}

	function handleSwipeEnd() {
		isDone = true;
		translateX = 0;
		translateY = 0;
		scale = 1;
	}

	function goNext() {
		if (data.next?._id) {
			goto(`/${data.next._id}`);
		}
	}

	function goPrevious() {
		if (data.previous?._id) {
			goto(`/${data.previous._id}`);
		}
	}

	function goHome() {
		goBackTo('/');
	}

	function preloadImage(src: string) {
		const link = document.createElement('link');
		link.rel = 'preload';
		link.as = 'image';
		link.crossOrigin = 'anonymous';
		link.href = src;
		link.referrerPolicy = 'no-referrer';
		document.head.appendChild(link);
	}

	onMount(() => {
		if (data.next) {
			preloadImage(imageLink(data.next, getImageSize(screen.width)));
		}

		if (data.previous) {
			preloadImage(imageLink(data.previous, getImageSize(screen.width)));
		}
	});
</script>

<svelte:window use:keyboardNavigate={{ next: data.next?._id, previous: data.previous?._id }} />

<svelte:head>
	<title>{data.media.description ? `${data.media.description} - ` : ``}vixalien's memories</title>
</svelte:head>

<article
	class="relative flex h-screen w-screen items-center justify-center"
	style:background-color={imageBackground(data.media)}
>
	<img
		loading="lazy"
		alt={data.media.description}
		width={data.media.width}
		height={data.media.height}
		class="size-auto max-h-full max-w-full"
		style:background-color="gray"
		style:transition={isDone ? 'transform 0.4s ease-out' : 'transform 0.1s ease-out'}
		style:transform="translate({translateX}px, {translateY}px) scale({scale})"
		style:view-transition-name={`image-${data.media._id}`}
		srcset={imageSrcset(data.media)}
		src={imageLink(data.media, data.media.width)}
		sizes="200vw"
		decoding="sync"
	/>
	<a
		class="absolute inset-0 z-10 cursor-zoom-out"
		aria-label="Close"
		href="/"
		style:view-transition-name="no"
		use:smartNavigate
		use:swipeable
		on:swiping={handleSwiping}
		on:swiped={handleSwipeEnd}
		on:swipeddown={(e) => {
			handleSwipeEnd();
			goHome();
		}}
		on:swipedright={(e) => {
			handleSwipeEnd();
			goPrevious();
		}}
		on:swipedleft={(e) => {
			handleSwipeEnd();
			goNext();
		}}
	>
	</a>

	{#if data.previous}
		<a
			class="absolute top-0 bottom-0 left-0 z-20 flex w-20 cursor-pointer items-center justify-center"
			href={`/${data.previous._id}`}
		>
			<IconButton
				icon={LeftIcon}
				label="Previous"
				viewTransitionName={`image-${data.previous._id}`}
			/>
		</a>
	{/if}

	{#if data.next}
		<a
			class="absolute top-0 right-0 bottom-0 z-20 flex w-20 cursor-pointer items-center justify-center"
			href={`/${data.next._id}`}
		>
			<IconButton icon={RightIcon} label="Next" viewTransitionName={`image-${data.next._id}`} />
		</a>
	{/if}

	<div class="absolute top-0 right-0 z-20 me-4 mt-4 flex flex-wrap items-center gap-4">
		{#if data.media.description}
			<span
				class="rounded-2xl bg-[#c8c8c840] px-3 py-1 pt-1.5 text-black backdrop-blur-lg"
				style:view-transition-name="image-description"
			>
				{data.media.description}
			</span>
		{/if}

		<span
			class="rounded-2xl bg-[#c8c8c840] px-3 py-1 pt-1.5 text-black tabular-nums backdrop-blur-lg"
			style:view-transition-name="image-capture-date"
		>
			<time datetime={new Date(data.media.capture_date_ms).toISOString()}
				>{new Date(data.media.capture_date_ms).toLocaleDateString()}</time
			>
		</span>

		<ShareButton />

		<a href="/" use:smartNavigate style:view-transition-name="image-close">
			<IconButton icon={CloseIcon} label="Close" />
		</a>
	</div>
</article>
