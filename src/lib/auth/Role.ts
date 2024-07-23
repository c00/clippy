export enum Role {
	/** Can update menu urls and slugs */
	SUPER_ADMIN = 'super-admin',

	/** Can create venues and menus */
	ADMIN = 'admin',

	/** Can assign menus and change menus */
	EDITOR = 'editor',
}
