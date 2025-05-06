from sqlalchemy import Column, Integer, String, ForeignKey, Date, Boolean, Text, Enum
from sqlalchemy.orm import relationship
from .database import Base
import enum

class GenderEnum(str, enum.Enum):
    male = "male"
    female = "female"
    other = "other"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True)
    password = Column(String(255), nullable=False)
    name = Column(String(255))
    age = Column(Integer)
    todos = relationship("Todo", back_populates="owner")

class Todo(Base):
    __tablename__ = "todos"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True)
    description = Column(String(255))
    # Foreign Key to User
    user_id = Column(Integer, ForeignKey("users.id"))  # Ensure this exists

    owner = relationship("User", back_populates="todos")
    # Student-related fields
    gender = Column(Enum(GenderEnum), default=GenderEnum.other)
    date_of_birth = Column(Date)
    phone_number = Column(String(15))
    address = Column(Text)
    enrollment_date = Column(Date)
    course = Column(String(100))
    gpa = Column(String(5))  # or use Float/Decimal if you prefer precision
    is_active = Column(Boolean, default=True)