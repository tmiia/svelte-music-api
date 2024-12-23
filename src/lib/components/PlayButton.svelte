<script lang="ts">
	import Play from '$lib/icons/play.svelte';
	import { twJoin } from 'tailwind-merge';
	import { tv } from 'tailwind-variants';

	const styles = tv({
		slots: {
			btn: 'rounded-full bg-transparentBlack p-3 pl-3.5 flex items-center justify-center hover:scale-90 transition-transform duration-300'
		}
	});

	let playIcon = $state(false);

	function playPreview(track: Record<string, any>) {
		if (isTrackPlaying()) {
			tracklist.togglePlayPause();
		} else {
			tracklist.setCurrentTrack(track);
		}
	}

	function isTrackPlaying() {
		return tracklist.currentTrack?.id === track.id && tracklist.isPlaying;
	}

	$effect(() => {
		playIcon = isTrackPlaying();
	});

	let { tracklist, track, classes } = $props();
	const { btn } = styles();
</script>

<button
	onclick={() => playPreview(track)}
	aria-label="play the track"
	class={twJoin(btn(), classes)}
>
	<span class="sr-only"> Play the track </span>
	<Play isPlaying={playIcon} />
</button>
