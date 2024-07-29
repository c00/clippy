# Clipboard

Remote clipboard.

```bash
npx supabase gen types typescript --project-id vmtkqlghfrbjcpwlepel > src/lib/database.types.ts
```

Create a `.env` file:

```
PUBLIC_SUPABASE_URL=yoursupabaseurlhere
PUBLIC_SUPABASE_ANON_KEY=youranonkeyhere
PRIVATE_SUPABASE_ADMIN_KEY=youadminkeyhere
```

Create a table in supabase like this:

![Table layout](https://github.com/c00/clippy/blob/main/static/table.png?raw=true)

Row level security:

![Row Level Security Policy](https://github.com/c00/clippy/blob/main/static/rls.png?raw=true)

## todos

- [ ] Add file support
