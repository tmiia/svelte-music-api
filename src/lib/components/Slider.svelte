<script lang="ts">
	import { tv } from 'tailwind-variants';
	import TrackCard from './TrackCard.svelte';

	const styles = tv({
		slots: {
			slider: 'w-full overflow-scroll',
			sliderItems: 'w-fit flex gap-6 shrink-0'
		}
	});

	let { children } = $props();
	const { slider, sliderItems } = styles();
</script>

<div class={slider()}>
	<div class={sliderItems()}>
    {@render children?.()}
	</div>
</div>
