# Adethix - AI Marketing Bias Detection MVP 🚀

Adethix is an AI-powered MVP that analyzes marketing content (ads, captions, product descriptions) and detects biased or potentially harmful language. It provides a risk score, highlighted flags, explanations, and dynamic, inclusive rewrites.

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- Python 3.9+
- Gemini API Key

### Backend Setup (FastAPI)
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Create a virtual environment and map dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
3. Set your Gemini key:
   Rename `.env.example` to `.env` and add your strict API key:
   ```
   GEMINI_API_KEY=your_real_key_here
   ```
4. Start the backend:
   ```bash
   uvicorn main:app --reload
   ```
   *The backend will run on http://localhost:8000*

### Frontend Setup (React + Vite)
1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
   *The frontend will run on http://localhost:5173*

## Test Inputs

Here are some test inputs you can use to verify Adethix's capabilities:

**Input 1: Strong Bias (Gender & Stereotypes)**
> *We are looking for a rockstar programmer who can code like a madman. You should be a coding ninja who lives for the daily grind. Don't worry about work-life balance, we work hard and play hard! Our ideal tech bro will man the servers all night if needed.*

**Input 2: Moderate Bias (Age & Tone)**
> *This exciting new skincare product is perfect for getting rid of those ugly, stubborn wrinkles and making you look young again. Older folks will finally look acceptable in public! Let's conquer aging once and for all.*

**Input 3: Very Low Bias (Clean)**
> *Our new project management tool is designed to help teams collaborate effectively, manage deliverables, and achieve outstanding results. It features an intuitive dashboard, robust integrations, and dedicated 24/7 customer support.*

**Input 4: Tone and Socio-Economic Bias**
> *Finally, a luxury vacation package that keeps the riff-raff out. If you're a high-net-worth individual who appreciates the finer things and can't stand budget travelers ruining your aesthetic, this exclusive resort is for you.*

**Input 5: Cultural and Gender Stereotypes**
> *This exciting cooking Masterclass is perfect for the stay-at-home mom wanting to surprise her hardworking husband. Learn to cook authentic, exotic dishes that will bring a touch of the Orient to your suburban kitchen!*

## Deployment

**Backend -> Render**
1. Create a Web Service on Render linked to this repo.
2. Root Directory: `backend`
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add `GEMINI_API_KEY` to Environment Variables.

**Frontend -> Vercel**
1. Import the repository in Vercel.
2. Framework Preset: `Vite`
3. Root Directory: `frontend`
4. (Optional) If your deployed backend URL is different from localhost, update `fetch` calls in `App.jsx` to use an environment variable (e.g., `import.meta.env.VITE_API_URL`).
