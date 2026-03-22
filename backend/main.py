from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import tempfile
import json
from pypdf import PdfReader
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()
os.environ.pop("GOOGLE_API_KEY", None)
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI(title="Adethix API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeTextRequest(BaseModel):
    text: str

SYSTEM_PROMPT = """
You are an expert copywriter and AI bias detection system. 
Analyze the provided marketing content and detect any bias (gender, cultural, socio-economic, stereotypes, tone) or potentially harmful language.
Output ONLY strict JSON in the exact structure below, without markdown blocks, without backticks:
{
  "bias_score": 0,
  "issues": [
    {
      "type": "string",
      "text": "string text from original",
      "explanation": "string describing the issue"
    }
  ],
  "suggested_rewrite": "string of the completely rewritten inclusive text"
}
"""

async def analyze_with_ai(text: str) -> dict:
    if not text.strip():
        raise HTTPException(status_code=400, detail="Text is empty")
    
    try:
        response = await client.aio.models.generate_content(
            model="gemini-2.5-flash",
            contents=[SYSTEM_PROMPT, text],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                temperature=0.2,
            ),
        )
        content = response.text
        return json.loads(content)
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        raise HTTPException(status_code=500, detail="Failed to analyze text")

@app.post("/analyze-text")
async def analyze_text(request: AnalyzeTextRequest):
    return await analyze_with_ai(request.text)

@app.post("/analyze-pdf")
async def analyze_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    try:
        # Save uploaded file to a temporary location
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            content = await file.read()
            tmp.write(content)
            tmp_path = tmp.name

        # Extract text using pypdf
        reader = PdfReader(tmp_path)
        extracted_text = ""
        for page in reader.pages:
            extracted_text += page.extract_text() + "\n"
        
        # Cleanup temp file
        os.remove(tmp_path)

        if not extracted_text.strip():
            raise HTTPException(status_code=400, detail="No readable text found in PDF")

        return await analyze_with_ai(extracted_text)
    except Exception as e:
        print(f"Error processing PDF: {e}")
        raise HTTPException(status_code=500, detail="Failed to process PDF")
