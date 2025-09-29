import os

# -----------------------------
# Groq / OpenRouter API config
# -----------------------------
# Ideally, store your API key in .env and load with os.getenv
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "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")
GROQ_API_BASE = "https://api.groq.com/openai/v1"

# Compatibility with OpenAI-style code
OPENAI_API_KEY = GROQ_API_KEY
OPENAI_API_BASE = GROQ_API_BASE

# -----------------------------
# Model settings
# -----------------------------
MODEL_ID = "openai/gpt-oss-20b"
MAX_TOKENS = 512
TEMPERATURE = 0.7

# -----------------------------
# RAG / Retrieval settings (optional)
# -----------------------------
MIN_SIMILARITY = 0.70
TOP_K = 3

# -----------------------------
# System prompt & fallback
# -----------------------------
SYSTEM_PROMPT = """
You are a professional AI assistant specialized ONLY in Jharkhand's culture, tourism, and eco-tourism.
Rules for answering:

- Keep responses short, sweet, and engaging (1-3 sentences max).
- Avoid *, #, -- or raw markdown.
- Include emojis when appropriate.
- If the user asks anything unrelated to Jharkhand, respond with:
  "Sorry, I cannot answer that directly, but Jharkhand has amazing cultural sites, waterfalls, and forests! 🌿🏞️"
- Respond in a conversational, human-like style.
- Use proper formatting with short paragraphs.
"""

FALLBACK_MESSAGE_BUSY = "⚠️ Sorry, the server is busy due to too many requests. Please wait a few seconds and try again."
FALLBACK_MESSAGE_UNAVAILABLE = "⚠️ Sorry, the AI service is temporarily unavailable. Please try again later."
