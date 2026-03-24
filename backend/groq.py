from dotenv import load_dotenv
import os

load_dotenv()
api_key =os.getenv("GROQ_API")
print(api_key)



