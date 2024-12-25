<script lang="ts">
	import Play from '$lib/icons/play.svelte';
	import { twJoin } from 'tailwind-merge';
	import { tv } from 'tailwind-variants';
  import { tracklist } from '$lib/components/Tracklist/Tracklist.svelte';

	const styles = tv({
		slots: {
			btn: 'rounded-full bg-transparentBlack/35 p-3 flex items-center justify-center hover:bg-transparentBlack/30 transition-color duration-300 disabled:cursor-no-drop'
		}
	});

	let playIcon = $state(false);
	let isDisabled = $state(true);

	$effect(() => {
		playIcon = tracklist.isPlaying;
	});

  $effect(() => {
		isDisabled = tracklist.currentTrack === null;
	});

	const onclick = () => {
		tracklist.togglePlayPause();
	};

	let { classes = '' } = $props();
	const { btn } = styles();
</script>

<button {onclick} class={twJoin(btn(), classes)} disabled={isDisabled}>
	<span class="sr-only"> Play or pause the current track </span>
	<Play isPlaying={playIcon} />
</button>
