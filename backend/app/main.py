from fastapi import FastAPI
from app.routes import hello

app = FastAPI(
    title="My First API",
    description="Learning FastAPI step by step",
    version="1.0.0"
)

app.include_router(hello.router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Hello! Your FastAPI server is running!", "docs": "/docs"}