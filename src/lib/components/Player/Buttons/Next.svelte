<script lang="ts">
	import Next from '$lib/icons/next.svelte';
	import { twJoin } from 'tailwind-merge';
	import { tv } from 'tailwind-variants';
  import { tracklist } from '$lib/components/Tracklist/Tracklist.svelte';

	const styles = tv({
		slots: {
			btn: 'flex items-center justify-center hover:rounded-full hover:bg-transparentBlack/10 p-2 transition-all duration-300 disabled:cursor-no-drop'
		}
	});

	let isDisabled = $state(true);

	$effect(() => {
		isDisabled = tracklist.queueTrack.length === 0;
	});

	const onclick = () => {
		tracklist.playQueueTrack();
	};

	let { classes = '' } = $props();
	const { btn } = styles();
</script>

<button {onclick} class={twJoin(btn(), classes)} disabled={isDisabled}>
	<span class="sr-only"> Play next track </span>
	<Next />
</button>
