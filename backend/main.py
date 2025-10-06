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











# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.staticfiles import StaticFiles
# from pydantic import BaseModel
# from app.llm import get_answer
# import os

# app = FastAPI()

# # Allow all CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Path to frontend build
# FRONTEND_PATH = os.path.join(os.path.dirname(__file__), "frontend_dist")

# # Serve entire frontend build
# # app.mount("/", StaticFiles(directory=FRONTEND_PATH, html=True), name="frontend")

# # Input model
# class Query(BaseModel):
#     query: str

# # Chat endpoint
# @app.post("/chat")
# async def chat(query: Query):
#     try:
#         answer = get_answer(query.query)
#         return {"answer": answer}
#     except Exception as e:
#         print(f"Chat endpoint error: {e}")
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

# Input model
class Query(BaseModel):
    query: str

# Chat endpoint
@app.post("/chat")
async def chat(query: Query):
    try:
        answer = get_answer(query.query)
        return {"answer": answer}
    except Exception as e:
        print(f"Chat endpoint error: {e}")
        return {"answer": "⚠️ Server busy or offline. Try again later."}
