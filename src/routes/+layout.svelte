<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
  import Player from '$lib/components/Player/Player.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<ParaglideJS {i18n}>
	{@render children()}
  <Player />
</ParaglideJS>
