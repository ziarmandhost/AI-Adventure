# AI-Adventures
Codebase for text novel game built using AI.

## Getting Started

### Prerequisites

- Open AI `/chat/completions` API
- OPen AI `/images/generations` API
- LokiJS (in memory Database)

### Dependencies

- npm@9.5.1
- nodejs@19.8.1
- electron@25.0.1

### Project structure
- `docs` - code documentation folder
- `src`
  - `assets` - contains images/fonts/queries and other media
  - `backend` - contains all "backend" code 
    - `modules` 
      - `AI.ts` - custom self-made library for making request to ChatGPT using official API
      - `Database.ts` - custom self-made abstraction on top of lokijs db
    - `auth.ts` - handlers of the auth events (register/login)
    - `story.ts` - handlers of the story events (new-story/continue-story/reset-story)
  - `screens` - contains all html files, representing screens of application
  - `scripts` - scripts attached to corresponding screen
  - `styles` - all css styles
    - `libs`
    - `pages`
    - `fonts.css` - all font definitions
    - `reset.css` - reset some browser predefined styles
  - `utils` - helper functions
  - `index.ts` - application entry point
  - `preload.ts` - bridge between backend and client (internal "API")

### Running locally
Download project, enter root folder in terminal and run commands:
```
npm install
```
Then create `.env` file in the root folder. Put here 2 values:
```dotenv
CHAT_GPT_API_KEY="OPEN_AI_API_KEY"
JWT_SECRET="YOUR_JWT_SECRET_VALUE"
```

To run app locally:
```
npm run start
```

To run build app locally to .exe file:
```
npm run package
```
