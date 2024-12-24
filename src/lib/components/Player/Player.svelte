<script lang="ts">
	import { tv } from 'tailwind-variants';
	import { onMount } from 'svelte';
	import Timeline from '$lib/components/Player/Timeline.svelte';
	import Actions from './Actions.svelte';
	import AdditionalActions from './AdditionalActions.svelte';
	import Info from './Info.svelte';

	let audio: HTMLAudioElement | null = $state(null);

	const styles = tv({
		slots: {
			container:
				'z-50 fixed bottom-0 left-0 bg-slate-950/95 w-full py-2 px-4 grid grid-cols-8 gap-x-3 items-center text-white',
			playerInfo: 'col-span-2',
			playerActions: 'col-span-1 col-start-3',
			playerTimeline: 'col-span-3 col-start-4 h-[5px]',
			additonalActions: 'col-span-2 flex gap-x-2 col-start-7',
			audioPlayer: 'hidden'
		}
	});

	onMount(() => {
		if (audio != null || audio != undefined) {

      audio.addEventListener('ended', () => {
        tracklist.isPlaying = false;

        if (tracklist.queueTrack.length > 0) {
          tracklist.playQueueTrack();
        }
      });

      audio.addEventListener('pause', () => {
        tracklist.isPlaying = false;
      });

      audio.addEventListener('play', () => {
        tracklist.isPlaying = true;
      });
    }
	});

	$effect(() => {
		if (tracklist.isPlaying) {
      audio?.play();
		} else {
			audio?.pause();
		}
	});

	const url = () => {
		if (tracklist.currentTrack) {
			return tracklist.currentTrack.preview;
		} else {
			return '';
		}
	};

	let { tracklist } = $props();
	const { container, playerInfo, playerActions, playerTimeline, additonalActions, audioPlayer } =
		styles();
</script>

<section class={container()}>
	<Info {tracklist} classes={playerInfo()} />

  <Actions {tracklist} classes={playerActions()} />

	<audio controls autoplay src={url()} bind:this={audio} class={audioPlayer()}></audio>
  <Timeline {audio} classes={playerTimeline()} />

  <AdditionalActions {tracklist} classes={additonalActions()} />
</section>
