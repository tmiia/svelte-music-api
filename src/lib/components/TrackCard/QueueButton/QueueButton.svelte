<script lang="ts">
	import { styles } from './QueueButton.css';
	import { twJoin } from 'tailwind-merge';
	import { audioManager, type Track } from '$lib/Store/AudioManager.svelte';
	import Queue from '$lib/icons/queue.svelte';

	interface QueueProps {
		track: Track;
		classes?: string;
	}
	let { track, classes = '' }: QueueProps = $props();

	const { btn } = styles();

	/**
	 * Add the track to the store Queue list.
	 */
	const onclick = () => {
		audioManager.addTrackToQueue(track);
	};
</script>

<button {onclick} class={twJoin(btn(), classes)}>
	<span class="sr-only">Add the track to the queue</span>
	<Queue />
</button>
