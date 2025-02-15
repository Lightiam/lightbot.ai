from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import json

app = FastAPI()

# Disable CORS. Do not remove this for full-stack development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# In-memory storage
conversations = []

class Message(BaseModel):
    content: str
    sender: str
    timestamp: Optional[str] = None

class Conversation(BaseModel):
    id: str
    messages: List[Message]

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}

@app.post("/api/chat")
async def chat(message: Message):
    message.timestamp = datetime.now().isoformat()
    # Store message in memory
    conversations.append(message.dict())
    # Return bot response
    return {
        "content": "Thank you for your message. Our AI assistant will respond shortly.",
        "sender": "bot",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/conversations")
async def get_conversations():
    return conversations
