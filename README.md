# Card Lookup for a Fellowship mixer

An organizer-only tool for looking up each participant's predetermined card (color, number, shape) at the singles mixer.

- **Assignment data:** `src/lib/data.ts` is the source of truth. Do not edit the assignments.
- **Validation:** `src/lib/validate.ts` runs when the page loads. If any check fails, the page shows an error and no cards.

```sh
pnpm install
pnpm dev      # local dev server
pnpm test     # validation unit tests
pnpm check    # type check
pnpm build    # static build (Vercel adapter)
```

Deploy by importing the repo into Vercel. No configuration or environment variables are needed.

## License

[MIT](LICENSE)
