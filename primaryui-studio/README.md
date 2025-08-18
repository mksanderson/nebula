# PrimaryUI Studio

Prototype of PrimaryUI Studio with server proxy for OpenRouter, Angular AI assist component, and an Nx generator for building components from intents or recipes.

## Setup

```
cd server
npm install
npm start
```

Set `OPENROUTER_API_KEY` in `.env.local` or environment before running.

### Generate a component

```
npx nx g @primaryui/plugin:component --intent=path/to/intent.yaml
```
