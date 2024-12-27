<script lang="ts">
  import { styles } from './Info.css';
	import { twJoin } from 'tailwind-merge';
  import { audioManager } from '$lib/components/AudioManager/AudioManager.svelte';
	import BlankImage from '$lib/icons/blankImage.svelte';

  interface InfoProps {
		classes?: string;
	}
	let { classes = '' }: InfoProps = $props();
  
	const { container, cover, textContainer, title, artist } = styles();
</script>

<figure class={twJoin( classes, container() )}>
  {#if audioManager.currentTrack}
    <img class={cover()} src={audioManager.currentTrack.album.cover_small} alt="Cover image of the {audioManager.currentTrack.album.title} album" />
    {:else}
      <BlankImage />
  {/if}
  <figcaption class={textContainer()}>
    {#if audioManager.currentTrack}
      <h3 class={title()}>{audioManager.currentTrack.title}</h3>
      <strong class={artist()}>{audioManager.currentTrack.artist.name}</strong>
      {:else}
      <h3 class={title()}>Select a song by</h3>
      <strong class={artist()}>Any artist</strong>
    {/if}
  </figcaption>
</figure>
