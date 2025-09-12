import requests
from app.config import OPENAI_API_KEY, OPENAI_API_BASE, MODEL_ID, SYSTEM_PROMPT
from app.config import MAX_TOKENS, TEMPERATURE, FALLBACK_MESSAGE_BUSY, FALLBACK_MESSAGE_UNAVAILABLE

class LLMError(Exception):
    """Custom exception for LLM failures."""
    pass

def call_llm(prompt: str, max_tokens: int = MAX_TOKENS, temperature: float = TEMPERATURE) -> str:
    """
    Calls the LLM API with the given prompt.
    Raises LLMError if request fails.
    """
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
    except requests.exceptions.RequestException as e:
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
        # Print for debugging/logging
        print("LLM Error:", e)
        return str(e)
