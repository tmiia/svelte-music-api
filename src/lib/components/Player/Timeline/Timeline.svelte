<script lang="ts">
	import { onMount } from 'svelte';

	/**
	 * Props interface for the AudioTimeline component
	 */
	interface AudioTimelineProps {
		audio: HTMLAudioElement;
		classes?: string;
	}

	let { audio, classes = '' }: AudioTimelineProps = $props();
	let input: HTMLInputElement;

	/**
	 * Handles audio timeupdate events
	 */
	const handleTimeUpdate = () => {
		if (!audio || !input) return;

		const progress = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
		updateProgressUI(progress);
	};

	/**
	 * Updates the UI to reflect the current audio progress
	 * @param {number} progress - The current progress percentage (0-100)
	 */
	const updateProgressUI = (progress: number) => {
		if (!input) return;
		input.value = progress.toString();
		input.style.setProperty('--progress', `${progress}%`);
	};

	/**
	 * Handles input range changes
	 */
	const handleInputChange = () => {
		if (!input || !audio) return;

		const progress = (Number(input.value) / Number(input.max)) * 100;
		updateProgressUI(progress);

		const newTime = (progress / 100) * audio.duration;
		audio.currentTime = newTime;
	};

	/**
	 * Sets up event listeners and cleanup on component mount
	 */
	onMount(() => {
		if (!audio || !input) return;

		input.addEventListener('input', handleInputChange);
		audio.addEventListener('timeupdate', handleTimeUpdate);

		return () => {
			input.removeEventListener('input', handleInputChange);
			audio.removeEventListener('timeupdate', handleTimeUpdate);
		};
	});
</script>

<input
	type="range"
	min="0"
	max="100"
	value="0"
	aria-valuemin="0"
	aria-valuemax="100"
	step="1"
	id="js_duration_slider"
	aria-label="Audio Progress"
	class={classes}
	bind:this={input}
/>

<style>
	#js_duration_slider {
		--thumb-size: 0.25rem;
		--track-height: 0.15rem;
		--primary-color: #3664d7;
		--secondary-color: #48249c;
		--track-bg: #9b9b9b19;
		--radius: 50px;

		-webkit-appearance: none;
		appearance: none;
		cursor: pointer;
		background: linear-gradient(
			to right,
			var(--primary-color) 0%,
			var(--secondary-color) var(--progress),
			var(--track-bg) var(--progress),
			var(--track-bg) 100%
		);
		border-radius: var(--radius);
		height: var(--track-height);
	}

	#js_duration_slider::-webkit-slider-runnable-track {
		background: #dedede1a;
		height: var(--track-height);
		border-radius: var(--radius);
	}

	#js_duration_slider::-moz-range-track {
		height: var(--track-height);
		background: #9b9b9b13;
		border-radius: var(--radius);
	}

	#js_duration_slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		margin-top: 0px;
		transform: translateY(-25%);
		background-color: #ffffff;
		height: var(--thumb-size);
		width: var(--thumb-size);
		border-radius: var(--radius);
		border: 0.5px solid var(--primary-color);
		opacity: 0;
	}

	#js_duration_slider::-moz-range-thumb {
		border: 0.5px solid var(--primary-color);
		border-radius: var(--radius);
		background-color: #ffffff;
		height: var(--thumb-size);
		width: var(--thumb-size);
		visibility: hidden;
	}

	#js_duration_slider:hover::-moz-range-thumb {
		visibility: visible;
	}
</style>
