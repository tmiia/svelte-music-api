<script lang="ts">
	import { styles } from './Previous.css';
	import { twJoin } from 'tailwind-merge';
	import { audioManager } from '$lib/Store/AudioManager.svelte';
	import Previous from '$lib/icons/previous.svelte';

	interface PreviousProps {
		classes?: string;
	}
	let { classes = '' }: PreviousProps = $props();
	let isDisabled = $state(true);

	const { btn } = styles();

	/**
	 * Check if there is track in the audioManager history list and update the state of `isDisabled`.
	 */
	$effect(() => {
		isDisabled = audioManager.queueTrack.length === 0;
	});

	/**
	 * Play the previous track.
	 */
	const onclick = () => {
		audioManager.playPrevTrack();
	};
</script>

<button {onclick} class={twJoin(btn(), classes)} disabled={isDisabled}>
	<span class="sr-only">Play previous track</span>
	<Previous />
</button>
