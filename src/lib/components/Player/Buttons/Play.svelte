<script lang="ts">
	import Play from '$lib/icons/play.svelte';
	import { twJoin } from 'tailwind-merge';
	import { tv } from 'tailwind-variants';

	const styles = tv({
		slots: {
			btn: 'rounded-full bg-transparentBlack/35 p-3 flex items-center justify-center hover:bg-transparentBlack/30 transition-color duration-300'
		}
	});

	let playIcon = $state(false);

	$effect(() => {
		playIcon = tracklist.isPlaying;
	});

	const onclick = () => {
		tracklist.togglePlayPause();
	};

	let { tracklist, classes = '' } = $props();
	const { btn } = styles();
</script>

<button {onclick} class={twJoin(btn(), classes)}>
	<span class="sr-only"> Play or pause the current track </span>
	<Play isPlaying={playIcon} />
</button>
