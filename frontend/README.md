# SAGE Next.js surface

This is the production frontend boundary for SAGE. It uses the Next.js App Router, React 19, strict TypeScript, a local-only interaction model, and security headers in `next.config.ts`.

## Run

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`.

## Product boundary

The frontend owns intent explanation, user approval, privacy policy state, Focus Shield, and Context Capsule export. Sensor capture, model execution, encrypted episode storage, and the action broker belong in the local Windows service described in `../docs/ARCHITECTURE.md`.
