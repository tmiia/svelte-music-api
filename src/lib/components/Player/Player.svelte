<script lang="ts">
	import { tv } from 'tailwind-variants';
	import { onMount } from 'svelte';
  import { audioManager } from '$lib/components/AudioManager/AudioManager.svelte';
	import Timeline from '$lib/components/Player/Timeline.svelte';
	import Actions from './Actions.svelte';
	import AdditionalActions from './AdditionalActions.svelte';
	import Info from './Info.svelte';

	let audio: HTMLAudioElement | null = $state(null);

	const styles = tv({
		slots: {
			container:
				'z-50 fixed bottom-0 left-0 bg-slate-950/95 w-full py-2 px-4 grid grid-cols-6 gap-x-2 lg:grid-cols-8 lg:gap-x-3 items-center text-white',
			playerInfo: 'col-span-2',
			playerTimeline: 'w-full',
			main: 'col-span-3 col-start-3 lg:col-span-4 flex flex-col lg:flex-row items-center space-y-2 lg:space-x-4 w-full',
			additionalActions: 'col-span-1 col-start-6 lg:col-span-2 lg:col-start-7 flex gap-x-2',
			audioPlayer: 'hidden'
		}
	});

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
