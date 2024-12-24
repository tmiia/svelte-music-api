<script lang="ts">
	import Previous from '$lib/icons/previous.svelte';
	import { twJoin } from 'tailwind-merge';
	import { tv } from 'tailwind-variants';

	const styles = tv({
		slots: {
			btn: 'flex items-center justify-center hover:rounded-full hover:bg-transparentBlack/10 p-2 transition-all duration-300 disabled:cursor-no-drop'
		}
	});

	let isDisabled = $state(true);

	$effect(() => {
		isDisabled = tracklist.history.length === 0;
	});

	const onclick = () => {
		tracklist.playHistoryTrack();
	};

	let { tracklist, classes = '' } = $props();
	const { btn } = styles();
</script>

<button {onclick} class={twJoin(btn(), classes)} disabled={isDisabled}>
	<span class="sr-only"> Play next track </span>
	<Previous />
</button>
