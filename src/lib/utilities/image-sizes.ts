export function imageSizes(
	minColWidth: number,
	maxWidth: number,
	gap: number = 8,
	padding: number = gap
): string {
	const sizeRules: string[] = [];
	const availableWidth = maxWidth - padding;

	// Calculate how many columns fit at max width
	const maxCols = Math.floor((availableWidth + gap) / (minColWidth + gap));

	// Generate breakpoints by working backwards from max columns
	for (let cols = maxCols; cols > 1; cols--) {
		// Calculate the viewport width where it drops from cols to cols-1
		const breakpoint = cols * minColWidth + (cols - 1) * gap + padding;

		// Calculate actual image width accounting for gaps
		// (100vw - padding - gaps) / cols
		const imageCalc = `(100vw - ${padding}px - ${(cols - 1) * gap}px) / ${cols}`;

		sizeRules.push(`(min-width: ${breakpoint}px) calc(${imageCalc})`);
	}

	// Single column fallback (100vw minus padding)
	sizeRules.push(`calc(100vw - ${padding}px)`);

	return sizeRules.join(', ');
}
