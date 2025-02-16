from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from uuid import uuid4

class Message(BaseModel):
    content: str
    sender: str
    timestamp: Optional[str] = Field(default_factory=lambda: datetime.utcnow().isoformat())
    state: Optional[str] = "initial"

class Conversation(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    messages: List[Message] = []
    current_state: str = "initial"
