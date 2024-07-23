import type { Session } from '@supabase/supabase-js';
import { writable } from 'svelte/store';
import { LoginState } from './LoginState';
import { supabase } from './SupabaseClient';

export const session = writable<Session | null>();
export const loginState = writable<LoginState>(LoginState.UNKNOWN);

supabase.auth.onAuthStateChange((_, sbSession) => {
	if (!sbSession) {
		session.set(null);
		loginState.set(LoginState.NOT_LOGGED_IN);
	} else {
		session.set(sbSession);
		loginState.set(LoginState.LOGGED_IN);
	}
});

(async () => {
	const result = await supabase.auth.getSession();
	if (result.data.session) {
		session.set(result.data.session);
	}
})();
