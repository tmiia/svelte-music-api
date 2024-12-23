<script lang="ts">
	import Play from '$lib/icons/play.svelte';
	import { twJoin } from 'tailwind-merge';
	import { tv } from 'tailwind-variants';

	const styles = tv({
		slots: {
			btn: 'rounded-full bg-transparentBlack p-3 pl-3.5 flex items-center justify-center hover:scale-90 transition-transform duration-300'
		}
	});

	function playPreview(track: Record<string, any>) {
		tracklist.setCurrentTrack(track);
    tracklist.isPlaying = true;
	}

  function isTrackPlaying() {
    if (tracklist.currentTrack) {
      return track.id === tracklist.currentTrack.id
    }
    else {
      return false
    }
  }

	let { tracklist, track, classes } = $props();
	const { btn } = styles();
</script>

<button
	onclick={() => playPreview(track)}
	aria-label="play the track"
	class={twJoin(btn(), classes)}
>
	<span class="sr-only"> Play the track </span>
	<Play isPlaying={isTrackPlaying()} />
</button>
