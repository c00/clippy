<script lang="ts">
	import { goto } from '$app/navigation';
	import { customAlphabet } from 'nanoid';
	import { onMount } from 'svelte';

	onMount(() => {
		const nanoid = customAlphabet('abcdefghijkmnpqrstuvwxyz23456789');
		goto(`/clip/${nanoid(6)}`);
	});
</script>

Nothing here.
