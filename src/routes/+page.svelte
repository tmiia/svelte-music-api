<script lang="ts">
	import ArtistCard from '$lib/components/ArtistCard/ArtistCard.svelte';
	import Slider from '$lib/components/Slider/Slider.svelte';
	import TrackCard from '$lib/components/TrackCard/TrackCard.svelte';
	import { tv } from 'tailwind-variants';
	
	const styles = tv({
		slots: {
			section: 'text-white p-4 flex flex-col gap-4'
		}
	});

	let { data }: any = $props();
	const { section } = styles();

	const tracks = data.playlist.tracks.data;

	const artistsByFans = (artists: any[]) => {
		const sortedArtists = artists.sort(
			(a: { nb_fan: number }, b: { nb_fan: number }) => b.nb_fan - a.nb_fan
		);
		return sortedArtists;
	};

	$inspect(data);

	const artists = artistsByFans(data.artists);
</script>

<section class={section()}>
	<Slider>
		{#each tracks as track}
			<TrackCard {track} classes="flex-1" />
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
