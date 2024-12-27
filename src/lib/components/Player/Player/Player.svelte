<script lang="ts">
	import { styles } from './Player.css';
	import { onMount } from 'svelte';
  import { audioManager } from '$lib/components/AudioManager/AudioManager.svelte';
	import Timeline from '$lib/components/Player/Timeline/Timeline.svelte';
	import Actions from '../Actions/Actions.svelte';
	import AdditionalActions from '../AdditionalActions/AdditionalActions.svelte';
	import Info from '../Info/Info.svelte';

	let audio: HTMLAudioElement | null = $state(null);

  onMount(() => {
		if (audio) {
			const handleEnded = () => {
				audioManager.isPlaying = false;
				if (audioManager.queueTrack.length > 0) {
					audioManager.playQueueTrack();
				}
			};

			const handlePause = () => { audioManager.isPlaying = false; };
			const handlePlay = () => { audioManager.isPlaying = true; };

			audio.addEventListener('ended', handleEnded);
			audio.addEventListener('pause', handlePause);
			audio.addEventListener('play', handlePlay);

			return () => {
				audio?.removeEventListener('ended', handleEnded);
				audio?.removeEventListener('pause', handlePause);
				audio?.removeEventListener('play', handlePlay);
			};
		}
	});

	$effect(() => {
		audioManager.isPlaying ? audio?.play() : audio?.pause();
	});

	const { container, playerInfo, main, playerTimeline, additionalActions, audioPlayer } =
		styles();
</script>

<section class={container()}>
	<Info classes={playerInfo()} />
  <div class={main()}>
    <Actions />
    <audio controls autoplay src={audioManager.currentTrack?.preview ?? ''} bind:this={audio} class={audioPlayer()}></audio>
    <Timeline {audio} classes={playerTimeline()} />
  </div>
  <AdditionalActions classes={additionalActions()} />
</section>
