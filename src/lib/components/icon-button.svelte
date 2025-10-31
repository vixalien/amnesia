<script lang="ts">
	interface Props extends Record<string, any> {
		icon: string;
		label: string;
		viewTransitionName?: string;
	}

	const { icon, class: className, label, viewTransitionName, ...rest }: Props = $props();
</script>

<button
	class={`flex size-8 items-center justify-center rounded-2xl bg-[#c8c8c840] backdrop-blur-lg hover:bg-[#c8c8c880] ${className} cursor-pointer`}
	aria-label={label}
	style:view-transition-name={viewTransitionName}
	{...rest}
>
	<img src={icon as any} alt={label} width={16} height={16} />
</button>
