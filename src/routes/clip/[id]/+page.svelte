<script lang="ts">
	import { page } from '$app/stores';
	import type { RealtimeChannel } from '@supabase/supabase-js';
	import { onDestroy, onMount } from 'svelte';
	import { session } from '../../../lib/auth/SessionStore';
	import { supabase } from '../../../lib/auth/SupabaseClient';

	let clipboardId: string;
	let content = '';
	let iAmUpdating = false;
	/** Does the clipboard already exist? */
	let existingClipboard = false;
	let channel: RealtimeChannel | undefined;

	onMount(() => {
		clipboardId = $page.params.id;
		getClipboard();
	});

	onDestroy(() => {
		if (channel) channel.unsubscribe();
	});

	async function getClipboard() {
		const row = await supabase
			.from('clipboard')
			.select('name, content')
			.eq('name', clipboardId)
			.single();

		if (row.data) {
			content = row.data.content;
			existingClipboard = true;
			startListening();
		}
	}

	function startListening() {
		console.log('Start listening');
		//Start listening
		//todo add filter here
		channel = supabase
			.channel('schema-db-changes')
			.on(
				'postgres_changes',
				{ event: 'UPDATE', schema: 'public', table: 'clipboard' },
				handleUpdate
			)
			.subscribe();
	}

	let debounceId: ReturnType<typeof setTimeout>;
	async function storeData() {
		clearTimeout(debounceId);

		debounceId = setTimeout(async () => {
			iAmUpdating = true;

			if (!existingClipboard) {
				createClipboard();
				return;
			}
			await supabase.from('clipboard').update({ content: content }).eq('name', clipboardId);
		}, 300);
	}

	async function createClipboard() {
		const response = await supabase.from('clipboard').insert({
			name: clipboardId,
			user_id: $session?.user.id || '',
			content: content
		});

		if (!response.error) {
			existingClipboard = true;
			getClipboard();
		}
	}

	function handleUpdate(payload: any) {
		console.log('updating', payload);
		if (iAmUpdating) {
			iAmUpdating = false;
			return;
		} else {
			content = payload.new.content;
		}
	}

	function copy() {
		navigator.clipboard.writeText(content);
	}

	async function paste() {
		content = await navigator.clipboard.readText();
	}
</script>

<div class="container border-4 border-black bg-white p-6 text-center">
	<h1 class="mb-6 flex justify-between gap-4 font-extrabold">
		<div class="text-4xl">
			Clipboard <div class="inline-block">{clipboardId}</div>
		</div>
		<div>
			<button
				type="button"
				on:click={() => copy()}
				class="border-2 border-yellow-400 bg-black px-6 py-3 font-bold text-yellow-400
               transition-colors hover:bg-yellow-400 hover:text-black"
			>
				COPY
			</button>
			<button
				type="button"
				on:click={() => paste()}
				class="border-2 border-yellow-400 bg-black px-6 py-3 font-bold text-yellow-400
             transition-colors hover:bg-yellow-400 hover:text-black"
			>
				PASTE
			</button>
		</div>
	</h1>
	<textarea
		bind:value={content}
		on:keyup={storeData}
		class="w-full resize-none border-2 border-black p-4 font-mono text-black"
		placeholder="Start typing here..."
	></textarea>
</div>

<style lang="postcss">
	textarea {
		height: 80vh;
	}
</style>
