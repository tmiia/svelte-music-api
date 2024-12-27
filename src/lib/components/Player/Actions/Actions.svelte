<script lang="ts">
	import { styles } from './Actions.css';
	import { twJoin } from 'tailwind-merge';
	import Play from '../Buttons/Play.svelte';
	import Next from '../Buttons/Next.svelte';
	import Previous from '../Buttons/Previous.svelte';

	interface ActionsProps {
		classes?: string;
	}
	let { classes = '' }: ActionsProps = $props();

	const { container } = styles();
</script>

<menu class={twJoin(classes, container())}>
	<li><Previous /></li>
	<li><Play /></li>
	<li><Next /></li>
</menu>
