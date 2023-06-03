# ChatGPTNovel
Codebase for text novel game built using AI.

## Getting Started

### Prerequisites

- Open AI `/chat/completions` API
- OPen AI `/images/generations` API
- LokiJS (in memory Database)

### Dependencies

- turbo@1.9.3
- express@4.18.2
- electron@22.2.0

### Project structure
- `apps`
  - `game` - contains all codebase for desktop novel game
  - `server` - contains all codebase for backend side 
- `packages` 
  - `logger` - custom self-made library for logging messages in .txt file
  - `ai` - custom self-made library for making request to ChatGPT using official API
  - `in-memory-db` - custom self-made abstraction on top of lokijs db
- `docs` - code documentation folder
- `.eslintrc` - global project lint settings
- `pnpm-workspace.yaml` - monorepo workspace config
- `turbo.json` - monorepo config
- `README.md`

### Running locally
In the project root folder:
```
pnpm install
pnpm run start
```
