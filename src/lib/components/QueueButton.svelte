<script lang="ts">
	import Play from '$lib/icons/play.svelte';
	import Queue from '$lib/icons/queue.svelte';
	import { twJoin } from 'tailwind-merge';
	import { tv } from 'tailwind-variants';

	const styles = tv({
		slots: {
			btn: 'p-3 pl-3.5 flex items-center justify-center opacity-85 hover:scale-90 transition-transform duration-300'
		}
	});

	let { tracklist, track, classes = '' } = $props();
	const { btn } = styles();
</script>

<button
	onclick={() => {
		tracklist.addTrackToQueue(track);
	}}
	class={twJoin(btn(), classes)}
>
	<span class="sr-only"> Add the track to the queue </span>
	<Queue />
</button>
