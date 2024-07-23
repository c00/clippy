<script lang="ts">
	import { LoginState } from './LoginState';
	import { loginState } from './SessionStore';
</script>

{#if $loginState === LoginState.UNKNOWN}
	<div class="flex h-full items-center justify-center">Hold on...</div>
{:else if $loginState === LoginState.LOGGED_IN}
	<slot />
{:else}
	<slot name="nologin">You are not logged in.</slot>
{/if}
