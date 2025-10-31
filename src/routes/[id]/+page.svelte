<script lang="ts">
	import { smartNavigate } from '$lib/actions/smart-navigate.js';

	import IconButton from '$lib/components/icon-button.svelte';
	import Media from '$lib/components/media.svelte';
	import ShareButton from '$lib/components/share-button.svelte';

	import LeftIcon from '$lib/assets/icon-left.svg';
	import RightIcon from '$lib/assets/icon-right.svg';
	import CloseIcon from '$lib/assets/icon-close.svg';

	import { imageBackground } from '$lib/utilities/image-background.js';
	import { keyboardNavigate } from '$lib/actions/keyboard-navigate.js';

	const { data } = $props();
</script>

<svelte:window use:keyboardNavigate={{ next: data.next?._id, previous: data.previous?._id }} />

<article
	class="relative flex h-screen w-screen items-center justify-center"
	style:background-color={imageBackground(data.media)}
>
	<div class={'h-full w-auto'}>
		<Media image={data.media} />
	</div>
	<a class="absolute inset-0 z-10 cursor-zoom-out" aria-label="Close" href="/" use:smartNavigate
	></a>

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
