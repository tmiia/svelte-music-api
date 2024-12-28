<script lang="ts">
	import { styles } from './Info.css';
	import { twJoin } from 'tailwind-merge';
	import { audioManager } from '$lib/Store/AudioManager.svelte';
	import BlankImage from '$lib/icons/blankImage.svelte';

	interface InfoProps {
		classes?: string;
	}
	let { classes = '' }: InfoProps = $props();

	const { container, cover, textContainer, title, artist } = styles();

	const songTitle = $derived(audioManager.currentTrack?.title ?? 'Select a song by');
	const artistName = $derived(audioManager.currentTrack?.artist.name ?? 'Any artist');
</script>

<figure class={twJoin(classes, container())}>
	{#if audioManager.currentTrack}
		<img
			class={cover()}
			src={audioManager.currentTrack.album.cover_small}
			alt="Cover image of the {audioManager.currentTrack.album.title} album"
		/>
	{:else}
		<BlankImage />
	{/if}

	<figcaption class={textContainer()}>
		<h3 class={title()}>{songTitle}</h3>
		<strong class={artist()}>{artistName}</strong>
	</figcaption>
</figure>
