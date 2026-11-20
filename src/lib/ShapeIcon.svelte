<script lang="ts">
	import type { Shape } from './data';

	let { shape, fill, size = 48 }: { shape: Shape; fill: string; size?: number } = $props();
</script>

<svg
	viewBox="0 0 100 100"
	width={size}
	height={size}
	role="img"
	aria-label={shape}
	class="shrink-0"
>
	<g {fill} stroke="rgb(0 0 0 / 0.12)" stroke-width="2" stroke-linejoin="round">
		{#if shape === 'Circle'}
			<circle cx="50" cy="50" r="42" />
		{:else if shape === 'Triangle'}
			<polygon points="50,8 94,88 6,88" />
		{:else if shape === 'Square'}
			<rect x="10" y="10" width="80" height="80" rx="4" />
		{:else if shape === 'Star'}
			<polygon
				points="50,5 61.8,36.2 95,37.6 68.9,58.3 77.9,90.4 50,72 22.1,90.4 31.1,58.3 5,37.6 38.2,36.2"
			/>
		{:else if shape === 'Diamond'}
			<polygon points="50,4 92,50 50,96 8,50" />
		{/if}
	</g>
</svg>
