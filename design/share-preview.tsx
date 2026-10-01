import React from 'react';
import { createRoot } from 'react-dom/client';
import { HeroDemo } from '../src/components/HeroDemo';

// Authoring-only composition. Reuses the actual simulated hero unchanged.
createRoot(document.getElementById('preview-demo')!).render(<HeroDemo />);
