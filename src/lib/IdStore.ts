import { customAlphabet } from 'nanoid';
import { writable } from 'svelte/store';

const nanoid = customAlphabet('abcdefghijkmnpqrstuvwxyz23456789');
const gotten = localStorage.getItem('CLIPBOARD_ID') || nanoid(6);

export const clipboardId = writable<string>(gotten);

clipboardId.subscribe((v) => {
	localStorage.setItem('CLIPBOARD_ID', v);
});
