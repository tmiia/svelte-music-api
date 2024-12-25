<script lang="ts">
	import { tv } from 'tailwind-variants';
	import { twJoin } from 'tailwind-merge';
  import { tracklist } from '$lib/components/Tracklist/Tracklist.svelte';
	import BlankImage from '$lib/icons/blankImage.svelte';

	const styles = tv({
		slots: {
			container: 'flex items-center gap-x-4',
      cover: 'rounded-xl',
      textContainer: 'overflow-hidden text-ellipsis whitespace-nowrap',
      title: 'font-medium text-base text-white/85',
      artist: 'font-light text-sm text-white/75'
		}
	});

	let { classes = '' } = $props();
	const { container, cover, textContainer, title, artist } = styles();
</script>

<figure class={twJoin( classes, container() )}>
  {#if tracklist.currentTrack}
    <img class={cover()} src={tracklist.currentTrack.album.cover_small} alt="Cover image of the {tracklist.currentTrack.album.title} album" />
    {:else}
      <BlankImage />
  {/if}
  <figcaption class={textContainer()}>
    {#if tracklist.currentTrack}
      <h3 class={title()}>{tracklist.currentTrack.title}</h3>
      <strong class={artist()}>{tracklist.currentTrack.artist.name}</strong>
      {:else}
      <h3 class={title()}>Select a song by</h3>
      <strong class={artist()}>Any artist</strong>
    {/if}
  </figcaption>
</figure>
