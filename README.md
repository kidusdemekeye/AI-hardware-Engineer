# AI Hardware Engineer

An AI-powered web app that designs physical projects end-to-end.

## Quick Start

1. Create `.env.local` with your Claude API key:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local and add your CLAUDE_API_KEY
   ```

2. Run dev server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:3000

## Features

- **Upload projects** - Describe what you want to build with text and images
- **AI Q&A** - Claude asks clarifying questions like a real engineer
- **Complete specs** - Get parts lists, CAD code, wiring diagrams, assembly instructions
- **3D viewer** - See custom parts rendered in 3D
- **Real parts** - Web search finds actual components with real prices

## Tech Stack

- **Frontend:** Next.js 15, React, TypeScript, TailwindCSS
- **Backend:** Next.js API routes, Claude API (Sonnet 5.5)
- **Tools:** Web search, openscad-wasm, three.js, MuJoCo WASM (phase 2)

## Development

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm start        # Run production build
npm run lint     # Run ESLint
```

## Deployment

Push to GitHub and deploy to Vercel:

1. `git push origin main`
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import this GitHub repo
4. Add `CLAUDE_API_KEY` as environment variable
5. Deploy

## Architecture

**MVP Flow:**
1. User uploads project description + images
2. Claude asks clarifying questions
3. User answers questions
4. Claude generates design JSON with:
   - Parts list (with real links/prices from web search)
   - OpenSCAD code (compiled to STL in browser, viewed in 3D)
   - Wiring diagrams (ASCII + code)
   - Assembly instructions (step-by-step)
5. User can download all deliverables

**Phase 2:** Physics simulation (MuJoCo WASM) to validate designs
