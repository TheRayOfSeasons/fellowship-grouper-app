<script lang="ts">
	import { participants, type Participant } from '#lib/data.ts';
	import { validate } from '#lib/validate.ts';
	import ParticipantCard from '#lib/ParticipantCard.svelte';
	import ParticipantSelect from '#lib/ParticipantSelect.svelte';

	const errors = validate(participants);
	let selected = $state<Participant | null>(null);
</script>

<main class="mx-auto flex min-h-dvh max-w-xl flex-col gap-8 px-4 py-10 sm:py-16">
	<header class="text-center">
		<h1 class="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
			November 21 Fellowship
		</h1>
		<p class="mt-2 text-stone-500">Look up participant card assignments.</p>
	</header>

	{#if errors.length > 0}
		<section role="alert" class="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-900">
			<h2 class="font-semibold">Assignment data failed validation</h2>
			<p class="mt-1 text-sm">
				Cards are hidden until the data is corrected in <code>src/lib/data.ts</code>.
			</p>
			<ul class="mt-3 list-disc space-y-1 pl-5 text-sm">
				{#each errors as error}
					<li>{error}</li>
				{/each}
			</ul>
		</section>
	{:else}
		<ParticipantSelect {participants} bind:selected />

		<section aria-live="polite">
			{#if selected}
				<ParticipantCard participant={selected} />
			{:else}
				<div
					class="mx-auto flex max-w-sm items-center justify-center rounded-2xl border-2 border-dashed border-stone-300 px-6 py-24 text-center text-stone-500"
				>
					Select a participant to reveal their card.
				</div>
			{/if}
		</section>
	{/if}
</main>
