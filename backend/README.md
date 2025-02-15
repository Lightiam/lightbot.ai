# Bot Backend API

FastAPI-based backend for the bot application.

## Setup

```bash
pip install -r requirements.txt
```

## Development

```bash
uvicorn app.main:app --reload
```

## Endpoints

- GET / - Health check
- POST /api/chat - Send a message
- GET /api/conversations - Get conversation history
