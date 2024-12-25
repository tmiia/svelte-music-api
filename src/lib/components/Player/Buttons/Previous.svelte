<script lang="ts">
	import Previous from '$lib/icons/previous.svelte';
	import { twJoin } from 'tailwind-merge';
	import { tv } from 'tailwind-variants';
  import { audioManager } from '$lib/components/AudioManager/AudioManager.svelte';

	const styles = tv({
		slots: {
			btn: 'flex items-center justify-center hover:rounded-full hover:bg-transparentBlack/10 p-2 transition-all duration-300 disabled:cursor-no-drop'
		}
	});

	let isDisabled = $state(true);

	$effect(() => {
		isDisabled = audioManager.history.length === 0;
	});

	const onclick = () => {
		audioManager.playHistoryTrack();
	};

	let { classes = '' } = $props();
	const { btn } = styles();
</script>

<button {onclick} class={twJoin(btn(), classes)} disabled={isDisabled}>
	<span class="sr-only"> Play next track </span>
	<Previous />
</button>
