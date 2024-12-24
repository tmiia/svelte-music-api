<script lang="ts">
	import { onMount } from 'svelte';

	let input: HTMLInputElement;

	onMount(() => {
		updateRange();

		if (audio != null || audio != undefined) {
			audio.addEventListener('timeupdate', () => {
				if (audio && input) {
					if (audio.duration == 0 || audio.duration == undefined) {
						input.value = '0';
						input.style.setProperty('--progress', `0%`);
					} else {
						const progress = (audio.currentTime / audio.duration) * 100;
						input.value = progress.toString();
						input.style.setProperty('--progress', `${progress}%`);
					}
				}
			});
		}
	});

	const updateRange = () => {
		input.addEventListener('input', () => {
			let progress = `${(parseInt(input.value) / parseInt(input.max)) * 100}%`;
			input.style.setProperty('--progress', progress);

			if (audio) {
				const newTime = (parseInt(input.value) / 100) * audio.duration;
				audio.currentTime = newTime;
			}
		});
	};

	let { audio, classes = '' } = $props();
</script>

<input
	type="range"
	min="0"
	max="100"
	value="0"
	step="1"
	id="js_duration_slider"
	class={classes}
	bind:this={input}
/>

<style>
	input[type='range'] {
		-webkit-appearance: none;
		appearance: none;
		cursor: pointer;
		background: linear-gradient(
			to right,
			#3664d7 0%,
			#48249c var(--progress),
			#9b9b9b19 var(--progress),
			#9b9b9b19 100%
		);
		border-radius: 50px;
		height: 0.15rem;
	}

	input[type='range']::-webkit-slider-runnable-track {
		background: #dedede1a;
		height: 0.15rem;
		border-radius: 50px;
	}

	input[type='range']::-moz-range-track {
		height: 0.15rem;
		background: #9b9b9b13;
		border-radius: 50px;
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		margin-top: 0px;
		transform: translateY(-25%);
		background-color: #ffffff;
		height: 0.25rem;
		width: 0.25rem;
		border-radius: 50px;
		border: 0.5px solid #6636d7;
		opacity: 0;
	}

	input[type='range']::-moz-range-thumb {
		border: 0.5px solid #6636d7;
		border-radius: 50px;
		background-color: #ffffff;
		height: 0.25rem;
		width: 0.25rem;
		visibility: hidden;
	}

	input[type='range']:hover::-moz-range-thumb {
		visibility: visible;
	}
</style>
