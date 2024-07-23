<script lang="ts">
	import AuthGuard from '../lib/auth/AuthGuard.svelte';
	import { supabase } from '../lib/auth/SupabaseClient';

	let email: string;
	let pass: string;

	function login() {
		supabase.auth.signInWithPassword({
			email,
			password: pass
		});
	}
</script>

<div class="w-96 border-4 border-black bg-white p-8 text-center">
	<h1 class="mb-6 text-4xl font-extrabold">Clippy</h1>

	<AuthGuard>
		<p class="mb-8 text-lg">Logged In!</p>
		<a
			href="/clip"
			class="border-2 border-yellow-400 bg-black px-6 py-3 font-bold text-yellow-400
             transition-colors hover:bg-yellow-400 hover:text-black"
		>
			To clipboard
		</a>

		<div slot="nologin">
			<p class="mb-8 text-lg">Please login to continue.</p>
			<form on:submit|preventDefault={login}>
				<div class="mb-4">
					<input
						bind:value={email}
						type="email"
						placeholder="Email"
						class="w-full border-2 border-black p-2 text-black"
					/>
				</div>
				<div class="mb-4">
					<input
						bind:value={pass}
						type="password"
						placeholder="Password"
						class="w-full border-2 border-black p-2 text-black"
					/>
				</div>
				<button
					type="submit"
					class="border-2 border-yellow-400 bg-black px-6 py-3 font-bold text-yellow-400
                   transition-colors hover:bg-yellow-400 hover:text-black"
				>
					Login
				</button>
			</form>
		</div>
	</AuthGuard>
</div>
