from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import json
from datetime import datetime

app = FastAPI()

# CORS configuration - DO NOT MODIFY
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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

@app.get("/")
async def root():
    return {"status": "ok", "message": "Bot API is running"}

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
