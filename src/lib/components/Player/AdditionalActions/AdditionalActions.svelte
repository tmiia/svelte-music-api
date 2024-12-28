<script lang="ts">
	import { styles } from './AdditionalActions.css';
	import { twJoin } from 'tailwind-merge';
	import { audioManager } from '$lib/components/Store/AudioManager.svelte';
	import ListQueue from '$lib/icons/listQueue.svelte';

	interface AdditionalActionsProps {
		classes?: string;
	}
	let { classes = '' }: AdditionalActionsProps = $props();

	const { container, listBtn, dot } = styles();
</script>

<menu class={twJoin(classes, container())}>
	<li class={listBtn()}>
		{#if audioManager.queueTrack.length > 0}
			<span class={dot()}>{audioManager.queueTrack.length}</span>
		{/if}
		<ListQueue />
	</li>
</menu>
