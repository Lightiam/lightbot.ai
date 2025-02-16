from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class Usage(Base):
    __tablename__ = "usages"

    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id"))
    type = Column(String)  # 'message' or 'conversation'
    count = Column(Integer, default=0)
    period_start = Column(DateTime)
    period_end = Column(DateTime)

    user = relationship("User", back_populates="usages")

    def __repr__(self):
        return f"<Usage(id={self.id}, user_id={self.user_id}, type={self.type}, count={self.count})>"
