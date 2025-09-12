from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.llm import get_answer

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    query: str

@app.post("/chat")
async def chat(query: Query):
    try:
        answer = get_answer(query.query)
        return {"answer": answer}
    except Exception as e:
        return {"answer": "⚠️ Server busy or offline. Try again later."}
