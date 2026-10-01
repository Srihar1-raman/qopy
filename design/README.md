# Share preview authoring

`share-preview.html` is an authoring-only 1200×630 composition, available through the local Vite development server at `/design/share-preview.html`. It is not a production page or build entry.

- `share-preview-frame.svg` preserves the original card's static logo, headline, underline, background and requirements badge.
- `share-preview.tsx` reuses the existing `HeroDemo` component without changing the website hero. The authoring page positions it on the right and hides its interactive controls.
- The static PNG is captured at animation time 4700 ms, when the text selection is complete.
- The MP4 captures the same composition at 24 fps for 12 seconds, seeking the component's CSS animations to `(4700 + frame * 1000 / 24) % 12000`. Only the right-hand demo changes.
- Encode H.264 with `yuv420p`, no audio, and `+faststart`. Keep the current media under 1 MB. Inspect selection, copied and pasted frames, and verify the left half is pixel-identical throughout the source frames.

Publish new versioned PNG/MP4 filenames when changing the composition. Update metadata, `_headers`, the exact Worker path allowlist and Wrangler `run_worker_first` routes together. Retain older versioned media so cached previews still resolve. Run the Worker range tests and verify the new endpoint's actual 206 bytes after deployment.

`share-card.svg` remains the original v1 static card source.
