# Repository Guidelines

## Project Structure & Module Organization
This is a Vite React portfolio app. The main application lives in `src/App.jsx`, with global styling in `src/app.css` and `src/index.css`. Navigation is isolated under `src/navbar/`. Static images and fonts are stored in `src/assets/images/` and `src/assets/fonts/`; public Vite assets belong in `public/`. The app entry point is `src/main.jsx`, and build tooling is configured through `vite.config.js` and `eslint.config.js`.

There is no dedicated `tests/` directory yet. Add tests near the feature they cover or introduce a clear `src/__tests__/` structure if test coverage is added.

## Build, Test, and Development Commands
- `npm run dev`: starts the Vite development server for local preview.
- `npm run build`: creates a production build in `dist/`.
- `npm run lint`: runs ESLint across the repository.
- `npm run preview`: serves the production build locally after `npm run build`.

Run `npm run lint` and `npm run build` before opening a pull request.

## Coding Style & Naming Conventions
Use modern React with functional components and hooks. Keep component names in PascalCase, for example `Navbar`, and use camelCase for variables, refs, and state values. Prefer descriptive CSS class names that match the section or component they style, such as `about-story-card`.

Match the existing style: 4-space indentation in JSX and CSS, semicolons in JavaScript, single quotes for imports, and concise comments only where they clarify non-obvious behavior. Keep shared theme values in `src/index.css` CSS variables when possible.

## Testing Guidelines
No automated test framework is configured at this time. For now, validate changes with `npm run lint` and `npm run build`, then manually check the affected UI in desktop and mobile viewports. If adding tests later, prefer React Testing Library with Vitest and use names like `ComponentName.test.jsx`.

## Commit & Pull Request Guidelines
The current history uses short, plain commit messages such as `first commit` and `config changes`. Continue using concise, imperative summaries, for example `refine about section` or `fix navbar scroll styling`.

Pull requests should include a short description, screenshots or screen recordings for visual changes, and the commands run for verification. Mention any new assets added, especially images or fonts, and link related issues when available.

## Agent-Specific Instructions
Do not overwrite user edits. Keep changes scoped to the requested feature, avoid unrelated refactors, and do not start local development servers unless explicitly asked.
