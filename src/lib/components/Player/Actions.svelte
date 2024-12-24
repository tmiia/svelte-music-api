<script lang="ts">
	import { tv } from 'tailwind-variants';
	import { twJoin } from 'tailwind-merge';
	import Play from './Buttons/Play.svelte';

	let audio: HTMLAudioElement | null = $state(null);

	const styles = tv({
		slots: {
			container: 'flex items-center gap-x-2'
		}
	});

	let { tracklist, classes = '' } = $props();
	const { container } = styles();
</script>

<menu class={twJoin(classes, container())}>
	<li><button type="button">Previous</button></li>
	<li><Play {tracklist} /></li>
	<li><button type="button">Next</button></li>
</menu>
