from fastapi import FastAPI
from app.routes import hello

# Create the FastAPI application
app = FastAPI(
    title="My First API",
    description="Learning FastAPI step by step",
    version="1.0.0"
)

# Include our routes
app.include_router(hello.router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Hello! Your FastAPI server is running!", "docs": "/docs"}