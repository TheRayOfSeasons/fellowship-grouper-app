<script lang="ts">
	import type { Participant } from './data';
	import ShapeIcon from './ShapeIcon.svelte';
	import { colorTheme } from './theme';

	let { participant }: { participant: Participant } = $props();
	const theme = $derived(colorTheme[participant.color]);
</script>

<article
	class="mx-auto w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-stone-200"
	aria-label="Card for {participant.name}"
>
	<header class="flex items-center justify-between px-6 py-3 {theme.band} {theme.bandText}">
		<span class="text-xs font-semibold tracking-[0.2em] uppercase">Fellowship Card</span>
		<span class="text-xs font-semibold tracking-[0.2em] uppercase">{participant.color}</span>
	</header>

	<div class="px-6 pt-6 pb-2 text-center">
		<p class="text-xs font-medium tracking-widest text-stone-400 uppercase">Name</p>
		<h2 class="mt-1 text-2xl font-semibold text-stone-900 text-balance">{participant.name}</h2>
	</div>

	<div class="flex flex-col items-center py-4">
		<p class="text-xs font-medium tracking-widest text-stone-400 uppercase">Number</p>
		<p class="text-[8rem] leading-none font-bold tabular-nums text-stone-900 sm:text-[10rem]">
			{participant.number}
		</p>
	</div>

	<dl class="grid grid-cols-2 gap-3 border-t border-stone-100 px-6 py-5">
		<div class="flex items-center gap-3 rounded-xl px-3 py-2 ring-1 {theme.chip}">
			<span
				class="size-8 shrink-0 rounded-full ring-1 ring-black/10"
				style="background-color: {theme.fill}"
				aria-hidden="true"
			></span>
			<div>
				<dt class="text-[0.65rem] font-medium tracking-widest uppercase opacity-70">Color</dt>
				<dd class="font-semibold">{participant.color}</dd>
			</div>
		</div>
		<div class="flex items-center gap-3 rounded-xl px-3 py-2 ring-1 {theme.chip}">
			<ShapeIcon shape={participant.shape} fill={theme.fill} size={32} />
			<div>
				<dt class="text-[0.65rem] font-medium tracking-widest uppercase opacity-70">Shape</dt>
				<dd class="font-semibold">{participant.shape}</dd>
			</div>
		</div>
	</dl>
</article>
