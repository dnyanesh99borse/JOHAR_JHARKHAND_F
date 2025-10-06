import os
import requests

# Fallback messages
FALLBACK_MESSAGE_BUSY = "⚠️ Server busy. Try again later."
FALLBACK_MESSAGE_UNAVAILABLE = "⚠️ Server offline. Try again later."

# Read settings from environment variables
OPENAI_API_KEY = os.getenv("GROQ_API_KEY")  # Set this when running Docker
OPENAI_API_BASE = os.getenv("OPENAI_API_BASE", "https://api.groq.com/openai/v1")  # default base URL
MODEL_ID = os.getenv("MODEL_ID", "gpt-4")
SYSTEM_PROMPT = os.getenv("SYSTEM_PROMPT", "You are a helpful assistant.")
MAX_TOKENS = int(os.getenv("MAX_TOKENS", "500"))
TEMPERATURE = float(os.getenv("TEMPERATURE", "0.7"))

class LLMError(Exception):
    """Custom exception for LLM failures."""
    pass

def call_llm(prompt: str, max_tokens: int = MAX_TOKENS, temperature: float = TEMPERATURE) -> str:
    """
    Calls the LLM API with the given prompt.
    Raises LLMError if request fails.
    """
    if not OPENAI_API_KEY:
        raise LLMError("API key not set in environment variables.")

    url = f"{OPENAI_API_BASE}/chat/completions"
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": MODEL_ID,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt}
        ],
        "temperature": temperature,
        "max_tokens": max_tokens
    }

    try:
        response = requests.post(url, headers=headers, json=payload, timeout=60)
        response.raise_for_status()
        data = response.json()
        return data["choices"][0]["message"]["content"].strip()
    except requests.exceptions.HTTPError as e:
        if response.status_code == 429:
            raise LLMError(FALLBACK_MESSAGE_BUSY)
        raise LLMError(f"HTTP error: {e}")
    except requests.exceptions.RequestException:
        raise LLMError(FALLBACK_MESSAGE_UNAVAILABLE)
    except (KeyError, IndexError) as e:
        raise LLMError(f"Unexpected response format: {e}")

def get_answer(query: str) -> str:
    """
    Returns a clean, bot-like answer.
    Uses fallback messages if LLM fails.
    """
    prompt = f"User question: {query}"
    try:
        return call_llm(prompt)
    except LLMError as e:
        print("LLM Error:", e)
        return str(e)
