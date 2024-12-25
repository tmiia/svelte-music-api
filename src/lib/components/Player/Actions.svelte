<script lang="ts">
	import { tv } from 'tailwind-variants';
	import { twJoin } from 'tailwind-merge';
	import Play from './Buttons/Play.svelte';
	import Next from './Buttons/Next.svelte';
	import Previous from './Buttons/Previous.svelte';

	const styles = tv({
		slots: {
			container: 'flex items-center gap-x-2'
		}
	});

	let { classes = '' } = $props();
	const { container } = styles();
</script>

<menu class={twJoin(classes, container())}>
	<li><Previous /></li>
	<li><Play /></li>
	<li><Next /></li>
</menu>
