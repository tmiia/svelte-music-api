<script lang="ts">
	import { tv } from 'tailwind-variants';
	import { twJoin } from 'tailwind-merge';
  
	const styles = tv({
		slots: {
			container:
				'relative md:min-w-[150px] md:min-h-[190px] md:max-w-[150px] md:max-h-[190px] rounded-3xl overflow-hidden',
			cover: 'w-full h-full',
			info: 'absolute z-50 bottom-0 left-0 p-6 flex gap-1 items-center justify-between w-full text-white',
			artistInfo: 'flex flex-col gap-0.25',
			artistName: 'font-thin text-sm opacity-85',
			artistFan: 'font-semibold text-xl',
			layer: 'absolute z-10 top-0 left-0 w-full h-full bg-slate-900 opacity-45'
		}
	});

	let { artist, classes = '' } = $props();
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
