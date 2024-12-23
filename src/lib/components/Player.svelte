<script lang="ts">
	import { onMount } from "svelte";

  let audio: HTMLAudioElement | null = $state(null)

  onMount(()=> {
    if (audio == null) {
      return;
    }

    audio.addEventListener('ended', ()=> {
      tracklist.isPlaying = false
      if (tracklist.queueTrack.length > 0) {
        tracklist.playQueueTrack()
      }
    })

    audio.addEventListener('pause', ()=> {
      tracklist.isPlaying = false
    })

    audio.addEventListener('play', ()=> {
      tracklist.isPlaying = true
    })
  })

  $effect(() => {
    if (tracklist.isPlaying) {
      audio?.play()
    }
    else {
      audio?.pause()
    }
  })

  const url = () => {
    if (tracklist.currentTrack) {
        return tracklist.currentTrack.preview
    }
    else {
      return ""
    }
  }

  let { tracklist } = $props();
</script>

<section style="color: white;">
  <span>tracks to play : {tracklist.queueTrack.length}</span>
	{#if tracklist.currentTrack}
		<h3>{tracklist.currentTrack.title}</h3>
  {/if}
		<audio controls autoplay src={url()} bind:this={audio}></audio>
</section>
