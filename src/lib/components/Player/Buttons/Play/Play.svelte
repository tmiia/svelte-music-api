<script lang="ts">
	import { styles } from './Play.css';
	import { twJoin } from 'tailwind-merge';
	import { audioManager } from '$lib/Store/AudioManager.svelte';
	import Play from '$lib/icons/play.svelte';

	interface PlayProps {
		classes?: string;
	}
	let { classes = '' }: PlayProps = $props();
	let playIcon = $state(false);
	let isDisabled = $state(true);

	const { btn } = styles();

	/**
	 * Synchronizes the play/pause icon with the `audioManager.isPlaying` store.
	 */
	$effect(() => {
		playIcon = audioManager.isPlaying;
	});

	/**
	 * Check if there is a currentTrack and update the state of `isDisabled`.
	 */
	$effect(() => {
		isDisabled = audioManager.currentTrack === null;
	});

	/**
	 * Play or pause the current track.
	 */
	const onclick = () => {
		audioManager.togglePlayPause();
	};
</script>

<button {onclick} class={twJoin(btn(), classes)} disabled={isDisabled}>
	<span class="sr-only">Play or pause the current track</span>
	<Play isPlaying={playIcon} />
</button>
