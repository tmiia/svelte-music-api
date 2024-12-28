<script lang="ts">
	import { styles } from './Player.css';
	import { onMount } from 'svelte';
	import { audioManager } from '$lib/components/AudioManager/AudioManager.svelte';
	import Timeline from '$lib/components/Player/Timeline/Timeline.svelte';
	import Actions from '../Actions/Actions.svelte';
	import AdditionalActions from '../AdditionalActions/AdditionalActions.svelte';
	import Info from '../Info/Info.svelte';

	let audio: HTMLAudioElement | null = $state(null);

	/**
	 * Handles the end of an audio track playback.
	 */
	const handleEnded = () => {
		audioManager.isPlaying = false;
		if (audioManager.queueTrack.length > 0) {
			audioManager.playQueueTrack();
		}
	};

	/**
	 * Updates the playback state to `false`.
	 */
	const handlePause = () => {
		audioManager.isPlaying = false;
	};

	/**
	 * Updates the playback state to `true`.
	 */
	const handlePlay = () => {
		audioManager.isPlaying = true;
	};

	/**
	 * Sets up event listeners and cleanup on component mount
	 */
	onMount(() => {
		if (!audio) return;

		audio.addEventListener('ended', handleEnded);
		audio.addEventListener('pause', handlePause);
		audio.addEventListener('play', handlePlay);

		return () => {
			audio?.removeEventListener('ended', handleEnded);
			audio?.removeEventListener('pause', handlePause);
			audio?.removeEventListener('play', handlePlay);
		};
	});

	/**
	 * Synchronizes the playback state of the AudioElement with the `audioManager` store.
	 */
	$effect(() => {
		audioManager.isPlaying ? audio?.play() : audio?.pause();
	});

	const { container, playerInfo, main, playerTimeline, additionalActions, audioPlayer } = styles();
</script>

<section class={container()}>
	<Info classes={playerInfo()} />
	<div class={main()}>
		<Actions />
		<audio
			controls
			autoplay
			src={audioManager.currentTrack?.preview ?? ''}
			bind:this={audio}
			class={audioPlayer()}
		></audio>
		<Timeline {audio} classes={playerTimeline()} />
	</div>
	<AdditionalActions classes={additionalActions()} />
</section>
