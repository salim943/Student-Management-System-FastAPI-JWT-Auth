from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from . import auth, crud, models, schemas
from .database import engine, SessionLocal, get_db
from sqlalchemy.orm import Session
from .auth.routes import router as auth_router
from .auth.utils import get_current_user  

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Consider restricting this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Auth router
app.include_router(auth_router)

# Root route
@app.get("/")
def root():
    return {"message": "Welcome to the User Auth API"}

# GET /todos (authenticated)
@app.get("/todos", response_model=list[schemas.TodoRead])
def get_my_todos(
    current_user: schemas.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return crud.get_todos_by_user(db, user_id=current_user.id)

# POST /todos (authenticated)
@app.post("/todos", response_model=schemas.TodoRead)
def create_todo(
    todo: schemas.TodoCreate,
    current_user: schemas.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return crud.create_user_todo(db, user_id=current_user.id, todo=todo)
