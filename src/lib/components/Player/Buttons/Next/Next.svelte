<script lang="ts">
	import { styles } from './Next.css';
	import { twJoin } from 'tailwind-merge';
	import { audioManager } from '$lib/components/AudioManager/AudioManager.svelte';
	import Next from '$lib/icons/next.svelte';

	interface NextProps {
		classes?: string;
	}
	let { classes = '' }: NextProps = $props();
	let isDisabled = $state(true);

  const { btn } = styles();

  /**
	 * Check if there is track in the audioManager queue list and update the state of `isDisabled`.
	 */
	$effect(() => {
		isDisabled = audioManager.queueTrack.length === 0;
	});

  /**
	 * Play the next track in the queue.
	 */
	const onclick = () => {
		audioManager.playQueueTrack();
	};
</script>

<button {onclick} class={twJoin(btn(), classes)} disabled={isDisabled}>
	<span class="sr-only">Play next track</span>
	<Next />
</button>
