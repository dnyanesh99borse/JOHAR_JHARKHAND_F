# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from app.llm import get_answer

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class Query(BaseModel):
#     query: str

# @app.post("/chat")
# async def chat(query: Query):
#     try:
#         answer = get_answer(query.query)
#         return {"answer": answer}
#     except Exception as e:
#         return {"answer": "⚠️ Server busy or offline. Try again later."}



from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.llm import get_answer

app = FastAPI()

# Allow all CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint (to test if server is alive)
@app.get("/")
async def root():
    return {"message": "✅ FastAPI server is running!"}

# Input model
class Query(BaseModel):
    query: str

# Chat endpoint
@app.post("/chat")
async def chat(query: Query):
    try:
        answer = get_answer(query.query)
        return {"answer": answer}
    except Exception:
        return {"answer": "⚠️ Server busy or offline. Try again later."}
