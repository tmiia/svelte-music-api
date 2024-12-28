<script lang="ts">
  import { styles } from './TrackCard.css';
	import { twJoin } from 'tailwind-merge';
  import type { Track } from '../Store/AudioManager.svelte';
	import PlayButton from './PlayButton/PlayButton.svelte';
	import QueueButton from './QueueButton/QueueButton.svelte';

  interface TrackCardProps {
		track: Track,
		classes?: string;
	}

	let { track, classes = '' } : TrackCardProps = $props();
	const { container, cover, info, artist, trackTitle, playBtn, queueBtn } = styles();
</script>

<figure class={twJoin(container(), classes)} aria-labelledby={`song-${track.id}`}>
	<PlayButton {track} classes={playBtn()} />
	<QueueButton {track} classes={queueBtn()} />

	<img
		src={track.album.cover_big}
		alt="Cover image of the {track.album.title} album"
		class={cover()}
	/>

	<figcaption class={info()}>
		<h2 id={`song-${track.id}`} class={trackTitle()}>{track.title}</h2>
		<strong class={artist()}>{track.artist.name}</strong>
	</figcaption>
</figure>
