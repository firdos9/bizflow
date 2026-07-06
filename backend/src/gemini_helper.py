import os
import time
from pathlib import Path
from dotenv import load_dotenv
from google import genai
from google.genai.errors import APIError

# Safely pinpoint the exact path to backend/.env 
# (Goes up 2 levels from backend/src/gemini_helper.py to backend/, then looks for .env)
env_path = Path(__file__).resolve().parent.parent / '.env'
load_dotenv(dotenv_path=env_path)

# Pull the keys out of the system environment variables we just saved
API_KEYS = [
    os.getenv("GEMINI_KEY_ONE"),
    os.getenv("GEMINI_KEY_TWO")
]

current_key_index = 0

def get_gemini_client():
    """Initializes the client with the currently active API key."""
    global current_key_index
    key = API_KEYS[current_key_index]
    if not key:
        raise ValueError(f"❌ API Key at index {current_key_index} is missing! Check your backend/.env file.")
    return genai.Client(api_key=key)

def rotate_key():
    """Switches to the next available API key in the list."""
    global current_key_index
    current_key_index = (current_key_index + 1) % len(API_KEYS)
    print(f"\n🔄 Rate limit hit! Rotating to API Key Pool #{current_key_index + 1}...")

def ask_gemini(prompt, model="gemini-2.5-flash"):
    """Sends a prompt to Gemini with automatic 429 key-rotation logic."""
    attempts = 0
    max_attempts = len(API_KEYS) * 2  # Try each key twice in case it's a short 60-second limit

    while attempts < max_attempts:
        try:
            client = get_gemini_client()
            
            response = client.models.generate_content(
                model=model,
                contents=prompt,
            )
            return response.text

        except APIError as e:
            # Check if the error code is 429 (Rate Limit Exceeded / Resource Exhausted)
            if e.code == 429:
                rotate_key()
                attempts += 1
                time.sleep(2)  # Short pause before trying the next key
                continue
            else:
                # If it's a different error (like 400 bad request), throw it normally
                raise e
                
    raise Exception("❌ All API keys have exhausted their limits for now!")

# --- Temporary Test Block ---
if __name__ == "__main__":
    print("Testing connection to Gemini...")
    try:
        reply = ask_gemini("Say: Connection test successful!")
        print(f"\n🤖 Response: {reply}")
    except Exception as e:
        print(f"\nError running test: {e}")