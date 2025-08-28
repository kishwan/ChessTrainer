from fastapi import APIRouter

router = APIRouter()

@router.get("/hello")
async def say_hello():
    return {"message": "Hello from FastAPI!"}

@router.get("/hello/{name}")
async def say_hello_to_person(name: str):
    return {"message": f"Hello, {name}!"}
