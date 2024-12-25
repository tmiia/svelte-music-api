<script lang="ts">
	import { tv } from 'tailwind-variants';
	import { twJoin } from 'tailwind-merge';
	import PlayButton from './PlayButton.svelte';
	import QueueButton from './QueueButton.svelte';

	const styles = tv({
		slots: {
			container:
				'relative min-w-[18rem] lg:min-w-[22rem] rounded-3xl overflow-hidden after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-slate-900 after:opacity-45',
			cover: 'w-full h-full aspect-[7/8] object-cover',
			info: 'absolute z-50 bottom-0 left-0 p-6 flex gap-1 items-center justify-between w-full text-white',
			artist: 'font-thin text-sm opacity-85',
			trackTitle: 'font-semibold text-xl',
			playBtn: 'absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
			queueBtn: 'absolute z-10 top-[1rem] right-[1rem]'
		}
	});

	let { track, classes = '' } = $props();
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
