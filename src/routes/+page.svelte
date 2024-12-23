<script lang="ts">
	import ArtistCard from '$lib/components/ArtistCard.svelte';
	import Slider from '$lib/components/Slider.svelte';
	import TrackCard from '$lib/components/TrackCard.svelte';
	import { tv } from 'tailwind-variants';
	import { Tracklist } from '$lib/components/Tracklist/Tracklist.svelte';
	import Player from '$lib/components/Player.svelte';

	const styles = tv({
		slots: {
			section: 'text-white p-4 flex flex-col gap-4'
		}
	});

	let { data }: any = $props();
	const { section } = styles();

	const tracks = data.playlist.tracks.data;

	function artistsByFans(artists: any[]) {
		const sortedArtists = artists.sort(
			(a: { nb_fan: number }, b: { nb_fan: number }) => b.nb_fan - a.nb_fan
		);
		return sortedArtists;
	}

  $inspect(data)

	const tracklist = new Tracklist();
	const artists = artistsByFans(data.artists);
</script>

<section class={section()}>
	<h1>{data.playlist.title} • PLAYLIST</h1>
</section>

<section class={section()}>
	<Slider>
		{#each tracks as track}
			<TrackCard {tracklist} {track} classes="flex-1" />
		{/each}
	</Slider>
</section>

<section class={section()}>
	<h2>Popular Artist</h2>
	<Slider>
		{#each artists as artist}
			<ArtistCard {artist} />
		{/each}
	</Slider>
</section>

<Player {tracklist} />
