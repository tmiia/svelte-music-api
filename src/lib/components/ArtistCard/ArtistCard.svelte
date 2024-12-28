<script lang="ts">
	import { styles } from './ArtistCard.css';
	import { twJoin } from 'tailwind-merge';
	import type { Track } from '$lib/components/Store/AudioManager.svelte';

	interface ArtistCardProps {
		artist: Track['artist'];
		classes?: string;
	}
	let { artist, classes = '' }: ArtistCardProps = $props();

	const { container, cover, info, artistInfo, artistName, artistFan, layer } = styles();
</script>

<div class={twJoin(container(), classes)}>
	<img src={artist.picture_medium} alt="Picture of {artist.name}" class={cover()} />
	<div class={layer()}></div>
	<div class={info()}>
		<div class={artistInfo()}>
			<h2 class={artistName()}>{artist.name}</h2>
			<strong class={artistFan()}>{artist.nb_fan}</strong>
		</div>
	</div>
</div>
