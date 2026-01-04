# TypeScript Migration Plan

## Goal Description
Convert the existing Vanilla JS project to TypeScript. This involves setting up git, installing TypeScript, configuring it, and adding types to the existing `main.js` file.

## Proposed Changes
### Git
- Initialize git repository and make the first commit.

### Configuration
- [NEW] `tsconfig.json` - Standard Vite/TS configuration.
- [MODIFY] `package.json` - Add `typescript` and `vite-plugin-checker`.

### Codebase
- [RENAME] `src/main.js` -> `src/main.ts`
- [MODIFY] `index.html` - Update script source to `src/main.ts`
- [MODIFY] `src/main.ts` - Add type annotations:
    - Cast `game` to `HTMLCanvasElement`
    - Type `ctx` as `CanvasRenderingContext2D`
    - Type arguments for `point(x: number, y: number)`

## Verification Plan
### Automated Tests
- Run `npm run dev` to ensure Vite handles the `.ts` file correctly.
- Run `npx tsc --noEmit` to verify type safety.
