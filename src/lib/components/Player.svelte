<script lang="ts">
	import { tv } from 'tailwind-variants';
	import { onMount } from 'svelte';

	let audio: HTMLAudioElement | null = $state(null);

	const styles = tv({
		slots: {
			container:
				'z-50 fixed bottom-0 left-0 bg-slate-950/95 w-full py-2 px-4 grid grid-cols-8 gap-x-3 items-center text-white',
			playerInfo: 'col-span-2',
			playerActions: 'col-span-1 flex gap-x-2 col-start-3',
			playerTimeline: 'col-span-3 col-start-4 h-[5px]',
			additonalActions: 'col-span-2 flex gap-x-2 col-start-7',
			audioPlayer: 'hidden'
		}
	});

	onMount(() => {
    updateRange()
		if (audio != null || audio != undefined) {

      audio.addEventListener('ended', () => {
        tracklist.isPlaying = false;
        if (tracklist.queueTrack.length > 0) {
          tracklist.playQueueTrack();
        }
      });

      audio.addEventListener('pause', () => {
        tracklist.isPlaying = false;
      });

      audio.addEventListener('play', () => {
        tracklist.isPlaying = true;
      });

      audio.addEventListener('timeupdate', ()=> {
        if (audio && input) {
          if (audio.duration == 0 || audio.duration == undefined) {
            input.value =  '0';
            input.style.setProperty('--progress', `0%`);
          }
          else {
            const progress = (audio.currentTime / audio.duration) * 100;
            input.value =  progress.toString();
            input.style.setProperty('--progress', `${progress}%`);
          }
        }
      })
    }
	});

	$effect(() => {
		if (tracklist.isPlaying) {
      audio?.play();
		} else {
			audio?.pause();
		}
	});

	const url = () => {
		if (tracklist.currentTrack) {
			return tracklist.currentTrack.preview;
		} else {
			return '';
		}
	};

  let input: HTMLInputElement;
  function updateRange() {
    input.addEventListener('input', ()=>{
      let progress = `${(parseInt(input.value) / parseInt(input.max)) * 100}%`;
      input.style.setProperty('--progress', progress);

      if (audio) {
        const newTime = (parseInt(input.value) / 100) * audio.duration;
        audio.currentTime = newTime;
      }
    })
  }


	let { tracklist } = $props();
	const { container, playerInfo, playerActions, playerTimeline, additonalActions, audioPlayer } =
		styles();
</script>

<section class={container()}>
	<figure class={playerInfo()}>
		<!-- {#if tracklist.currentTrack}
      <img src={tracklist.album.cover_small} alt="Cover image of the {tracklist.album.title} album" />
    {/if} -->
		<figcaption>
			{#if tracklist.currentTrack}
				<h3>{tracklist.currentTrack.title}</h3>
				<strong>{tracklist.currentTrack.artist.name}</strong>
			{/if}
		</figcaption>
	</figure>

	<menu class={playerActions()}>
		<li><button type="button">Previous</button></li>
		<li><button type="button">Play</button></li>
		<li><button type="button">Next</button></li>
	</menu>

	<audio controls autoplay src={url()} bind:this={audio} class={audioPlayer()}></audio>

	<input
		type="range"
		min="0"
		max="100"
		value="0"
    step="1"
		id="js_duration_slider"
		class={playerTimeline()}
    bind:this={input}
	/>

	<menu class={additonalActions()}>
		<li>{tracklist.queueTrack.length}</li>
		<li>List of queue</li>
	</menu>
</section>

<style>
	input[type='range'] {
		-webkit-appearance: none;
		appearance: none;
		cursor: pointer;
    background: linear-gradient(to right, #3664d7 0%, #48249c var(--progress), #9b9b9b19 var(--progress), #9b9b9b19 100%);
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
