<script lang="ts">
	import { tv } from 'tailwind-variants';
	import { twJoin } from 'tailwind-merge';
  import { tracklist } from '$lib/components/Tracklist/Tracklist.svelte';
	import ListQueue from '$lib/icons/listQueue.svelte';

	const styles = tv({
		slots: {
			container: 'flex items-center justify-end gap-x-2',
      listBtn: 'relative',
      dot: 'absolute -right-2 -top-2 p-0.5 px-1.5 text-xs font-light bg-violet-800/65 rounded-full'
		}
	});


	let { classes = '' } = $props();
	const { container, listBtn, dot } = styles();
</script>

<menu class={twJoin(classes, container())}>
  <li class={listBtn()}>
    {#if tracklist.queueTrack.length > 0}
      <span class={dot()}>{tracklist.queueTrack.length}</span>
    {/if}
    <ListQueue />
  </li>
</menu>
