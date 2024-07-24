<script lang="ts">
	import { page } from '$app/stores';
	import type { RealtimeChannel } from '@supabase/supabase-js';
	import { onDestroy, onMount } from 'svelte';
	import { session } from '../../../lib/auth/SessionStore';
	import { supabase } from '../../../lib/auth/SupabaseClient';

	let clipboardId: string;
	let content = '';
	let prevContent = '-----notreallyathing-----';
	let iAmUpdating = false;
	/** Does the clipboard already exist? */
	let existingClipboard = false;
	let channel: RealtimeChannel | undefined;
	let imageData = '';
	let state: 'image' | 'content' = 'content';

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
			.select('name, content, image_data')
			.eq('name', clipboardId)
			.single();

		if (row.data) {
			content = row.data.content;
			imageData = row.data.image_data || '';
			prevContent = content;
			existingClipboard = true;
			startListening();
		}
	}

	function startListening() {
		console.log('Start listening');
		channel = supabase
			.channel('schema-db-changes')
			.on(
				'postgres_changes',
				{ event: 'UPDATE', schema: 'public', table: 'clipboard', filter: `name=eq.${clipboardId}` },
				handleUpdate
			)
			.subscribe();
	}

	let debounceId: ReturnType<typeof setTimeout>;
	async function storeData() {
		clearTimeout(debounceId);

		debounceId = setTimeout(async () => {
			if (prevContent === content) return;

			iAmUpdating = true;
			if (!existingClipboard) {
				createClipboard();
				return;
			}

			console.log('Updating remote');
			await supabase.from('clipboard').update({ content: content }).eq('name', clipboardId);
		}, 300);
	}

	async function updateImage() {
		console.log('Updating remote image data');
		await supabase.from('clipboard').update({ image_data: imageData }).eq('name', clipboardId);
	}

	async function createClipboard() {
		console.log('Creating remote');
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
		if (iAmUpdating) {
			iAmUpdating = false;
			return;
		}

		if (payload.errors) {
			console.log('Payload has errors', payload);
			return;
		}

		if (payload.new.content && content !== payload.new.content) {
			console.log('updating from remote', payload);
			content = payload.new.content;
			prevContent = content;
		}

		if (payload.new.image_data && imageData !== payload.new.image_data) {
			console.log('updating image from remote', payload);
			imageData = payload.new.image_data;
		}
	}

	function copy() {
		navigator.clipboard.writeText(content);
	}

	async function paste() {
		content = await navigator.clipboard.readText();
	}

	function handlePaste(e: ClipboardEvent) {
		if (!e.clipboardData) return;

		for (const i of e.clipboardData?.items) {
			if (!i.type.startsWith('image')) continue;
			//Deal with image
			const blob = i.getAsFile();
			if (!blob) continue;

			const reader = new FileReader();
			reader.onload = function (event) {
				const result = event.target?.result;
				if (typeof result === 'string') {
					imageData = result;
					state = 'image';
					updateImage();
				}
			};

			reader.readAsDataURL(blob);
		}
	}
</script>

<svelte:document on:paste={handlePaste} />

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

	<div>
		<button
			type="button"
			class:active={state === 'content'}
			on:click={() => (state = 'content')}
			class="tab"
		>
			CONTENT
		</button>
		<button
			type="button"
			class:active={state === 'image'}
			on:click={() => (state = 'image')}
			class="tab"
		>
			IMAGE
		</button>
	</div>

	{#if state === 'image'}
		<!-- content here -->
		<div class="flex justify-center">
			{#if imageData}
				<img class="border-2" src={imageData} alt="parsed content" />
			{/if}
		</div>
	{:else}
		<div>
			<textarea
				bind:value={content}
				on:keyup={storeData}
				class="w-full resize-none border-2 border-black p-4 font-mono text-black"
				placeholder="Start typing here..."
			></textarea>
		</div>
	{/if}
</div>

<style lang="postcss">
	textarea {
		height: 80vh;
	}

	.tab {
		@apply border-2 border-black px-6 py-3 font-bold text-black transition-colors hover:bg-yellow-400 hover:text-black;
	}

	.active {
		@apply bg-yellow-500;
	}
</style>
