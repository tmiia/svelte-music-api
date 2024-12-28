<script lang="ts">
	import { styles } from './Slider.css';

	interface SliderProps {
		children: () => any;
	}
	let { children }: SliderProps = $props();

	const { slider, sliderItems } = styles();
</script>

<ul class={slider()}>
	<li class={sliderItems()}>
		{@render children?.()}
	</li>
</ul>
