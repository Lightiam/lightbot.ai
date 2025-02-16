from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict
from .models import Message, Conversation
import uuid

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage
conversations: Dict[str, Conversation] = {}

@app.get("/healthz")
async def health_check():
    return {"status": "ok"}

@app.post("/api/chat")
async def chat(message: Message):
    conversation_id = str(uuid.uuid4())
    if conversation_id not in conversations:
        conversations[conversation_id] = Conversation(id=conversation_id)
    
    conversation = conversations[conversation_id]
    conversation.messages.append(message)
    
    # Simple bot response
    bot_message = Message(
        content="Thank you for your message. Our AI assistant will respond shortly.",
        sender="bot",
        state=message.state
    )
    conversation.messages.append(bot_message)
    
    return bot_message

@app.get("/api/conversations/{conversation_id}")
async def get_conversation(conversation_id: str) -> Conversation:
    if conversation_id not in conversations:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return conversations[conversation_id]

@app.get("/api/conversations")
async def list_conversations() -> List[Conversation]:
    return list(conversations.values())
