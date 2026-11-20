<script lang="ts">
	import type { Participant } from './data';

	let {
		participants,
		selected = $bindable()
	}: { participants: readonly Participant[]; selected: Participant | null } = $props();

	const groups = [
		{ label: 'Boys', gender: 'Boy' },
		{ label: 'Girls', gender: 'Girl' }
	] as const;

	let query = $state('');
	let open = $state(false);
	let active = $state(-1);
	// Only filter once the user types; reopening after a pick shows the full list.
	let typed = $state(false);
	let input: HTMLInputElement;

	const normalize = (s: string) =>
		s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

	const filtered = $derived.by(() => {
		const q = typed ? normalize(query.trim()) : '';
		return groups
			.map((g) => ({
				...g,
				items: participants
					.filter((p) => p.gender === g.gender && (!q || normalize(p.name).includes(q)))
					.toSorted((a, b) => a.name.localeCompare(b.name))
			}))
			.filter((g) => g.items.length > 0);
	});

	const flat = $derived(filtered.flatMap((g) => g.items));

	function choose(p: Participant) {
		selected = p;
		query = p.name;
		typed = false;
		open = false;
		active = -1;
		input.blur();
	}

	function onInput() {
		typed = true;
		open = true;
		active = 0;
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (!open) open = true;
			active = Math.min(active + 1, flat.length - 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			active = Math.max(active - 1, 0);
		} else if (e.key === 'Enter') {
			if (open && flat[active]) {
				e.preventDefault();
				choose(flat[active]);
			}
		} else if (e.key === 'Escape') {
			close();
		}
	}

	function openList() {
		typed = false;
		open = true;
		active = selected ? flat.indexOf(selected) : -1;
	}

	function close() {
		open = false;
		typed = false;
		query = selected?.name ?? '';
	}

	function onFocus() {
		input.select();
		openList();
	}

	$effect(() => {
		if (open && active >= 0) {
			document.getElementById(`opt-${active}`)?.scrollIntoView({ block: 'nearest' });
		}
	});
</script>

<div class="relative">
	<label for="participant" class="mb-2 block text-sm font-medium text-stone-700">Participant</label>
	<div class="relative">
		<input
			bind:this={input}
			bind:value={query}
			id="participant"
			type="text"
			role="combobox"
			autocomplete="off"
			spellcheck="false"
			placeholder="Search or choose a name…"
			aria-autocomplete="list"
			aria-controls="participant-listbox"
			aria-expanded={open}
			aria-activedescendant={open && active >= 0 ? `opt-${active}` : undefined}
			class="w-full rounded-xl border border-stone-300 bg-white py-3 pr-10 pl-4 text-base text-stone-900 shadow-sm outline-none placeholder:text-stone-400 focus:border-stone-500 focus:ring-4 focus:ring-stone-200"
			oninput={onInput}
			onkeydown={onKeydown}
			onfocus={onFocus}
			onblur={close}
			onclick={() => !open && openList()}
		/>
		<svg
			class="pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2 text-stone-400"
			viewBox="0 0 20 20"
			fill="currentColor"
			aria-hidden="true"
		>
			<path
				fill-rule="evenodd"
				d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
				clip-rule="evenodd"
			/>
		</svg>
	</div>

	{#if open}
		<ul
			id="participant-listbox"
			role="listbox"
			aria-label="Participants"
			class="absolute z-10 mt-2 max-h-80 w-full overflow-y-auto rounded-xl border border-stone-200 bg-white py-1 shadow-lg"
		>
			{#each filtered as group (group.label)}
				<li role="presentation" class="px-4 pt-3 pb-1 text-xs font-semibold tracking-widest text-stone-400 uppercase">
					{group.label}
				</li>
				{#each group.items as p (p.name)}
					{@const i = flat.indexOf(p)}
					<li
						id="opt-{i}"
						role="option"
						aria-selected={selected === p}
						class="cursor-pointer px-4 py-2.5 text-stone-800 {i === active
							? 'bg-stone-100'
							: ''} {selected === p ? 'font-semibold' : ''}"
						onmousedown={(e) => {
							e.preventDefault();
							choose(p);
						}}
						onmousemove={() => (active = i)}
					>
						{p.name}
					</li>
				{/each}
			{:else}
				<li class="px-4 py-3 text-sm text-stone-500">No participants match “{query}”.</li>
			{/each}
		</ul>
	{/if}
</div>
