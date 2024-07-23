<script lang="ts">
	import AuthGuard from '../../lib/auth/AuthGuard.svelte';
</script>

<AuthGuard>
	<slot></slot>
</AuthGuard>
