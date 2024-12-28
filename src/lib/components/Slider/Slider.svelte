<script lang="ts">
	import { styles } from './Slider.css';

	interface SliderProps {
		children: () => any;
	}
	let { children }: SliderProps = $props();

	const { slider, sliderItems } = styles();
</script>

<div class={slider()}>
	<div class={sliderItems()}>
		{@render children?.()}
	</div>
</div>
