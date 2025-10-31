<script lang="ts">
	interface Props extends Record<string, any> {
		icon: string;
		label: string;
	}

	const { icon, class: className, label, ...rest }: Props = $props();
</script>

<button
	class={`flex size-8 items-center justify-center rounded-2xl bg-[#c8c8c840] backdrop-blur-lg hover:bg-[#c8c8c880] ${className} cursor-pointer`}
	aria-label={label}
	{...rest}
>
	<img src={icon as any} alt={label} width={16} height={16} />
</button>
