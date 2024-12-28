<script lang="ts">
	import { styles } from './PlayButton.css';
	import { twJoin } from 'tailwind-merge';
	import { audioManager, type Track } from '$lib/components/Store/AudioManager.svelte';
	import Play from '$lib/icons/play.svelte';

	interface PlayProps {
		track: Track;
		classes?: string;
	}
	let { track, classes }: PlayProps = $props();
	let playIcon = $state(false);

	const { btn } = styles();

	/**
	 * Play or pause the track.
	 */
	const playPreview = (track: Track) => {
		if (isTrackPlaying()) {
			audioManager.togglePlayPause();
		} else {
			audioManager.setCurrentTrack(track);
		}
	};

	/**
	 * Check if the track is the currentTrack loaded or playing.
	 */
	const isTrackPlaying = () => {
		return audioManager.currentTrack?.id === track.id && audioManager.isPlaying;
	};

	/**
	 * Synchronizes the play/pause icon with the `audioManager.isPlaying` store.
	 */
	$effect(() => {
		playIcon = isTrackPlaying();
	});
</script>

<button onclick={() => playPreview(track)} class={twJoin(btn(), classes)}>
	<span class="sr-only">Play the track</span>
	<Play isPlaying={playIcon} />
</button>
