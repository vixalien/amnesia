<script lang="ts">
	import IconButton from './icon-button.svelte';

	import ShareIcon from '$lib/assets/icon-share.svg';
	import { toast } from 'svelte-sonner';

	interface ShareProps {
		id?: string;
		title?: string;
	}

	const { id, title: passedTitle }: ShareProps = $props();

	async function handleShare(e: MouseEvent) {
		e.preventDefault();

		const url = id ? new URL(id, document.location.origin).href : document.location.href;
		const title = passedTitle ?? document.title ?? 'Share this image';

		if (navigator.share) {
			try {
				await navigator.share({
					title,
					url,
					text: "View this image from vixalien's memories"
				});
				return;
			} catch (err) {
				if (err instanceof Error && err.name === 'AbortError') {
					return;
				}
			}
		}

		try {
			await navigator.clipboard.writeText(url);
			toast('Copied to clipboard');
		} catch (err) {
			toast.error('Could not copy to clipboard. Please try again later.');
		}
	}
</script>

<IconButton
	icon={ShareIcon}
	label="Share"
	viewTransitionName="share"
	onclick={handleShare}
	style="z-index: 100;"
/>
