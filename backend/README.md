# ThesisTrack Backend API

Backend server untuk menangani OpenAI dan ZEP API calls dengan aman.

## Setup Lokal

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Setup environment variables

Buat file `.env` di folder `backend/`:

```bash
cp .env.example .env
```

Edit `.env` dan masukkan API keys Anda:

```env
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxx
ZEP_API_KEY=z_xxxxxxxxxxxxxxxxxxxxx
PORT=3001
```

### 3. Jalankan dev server

```bash
npm run dev
```

Server akan running di `http://localhost:3001`

## API Endpoints

### 1. Parse Progress Update
**POST** `/api/parse-progress`

Parse natural language progress update menjadi structured data.

**Request:**
```json
{
  "userInput": "Hari ini sudah selesai OCR extraction...",
  "iglpisComponents": [...]
}
```

**Response:**
```json
{
  "component_updates": [
    {
      "component_id": "4.2",
      "status": "testing",
      "note": "..."
    }
  ],
  "create_jurnal": {
    "title": "...",
    "body": "..."
  },
  "summary": "..."
}
```

### 2. Chat with LLM
**POST** `/api/chat`

Chat untuk insights & suggestions tentang progress.

**Request:**
```json
{
  "userMessage": "...",
  "conversationHistory": [...]
}
```

**Response:**
```json
{
  "reply": "..."
}
```

### 3. Add Message to Memory
**POST** `/api/memory/add`

Simpan message ke ZEP memory.

**Request:**
```json
{
  "sessionId": "...",
  "role": "user",
  "content": "...",
  "metadata": {}
}
```

### 4. Get Session Memory
**GET** `/api/memory/session/:sessionId`

Retrieve session memory dari ZEP.

### 5. Save Progress Context
**POST** `/api/memory/context`

Simpan progress context summary ke ZEP.

**Request:**
```json
{
  "sessionId": "...",
  "componentUpdates": [...],
  "summary": "..."
}
```

### 6. Health Check
**GET** `/api/health`

Check jika server running.

## Deploy ke Vercel

### 1. Push code ke GitHub

```bash
git add .
git commit -m "feat: Add backend API"
git push
```

### 2. Connect Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login dan deploy
vercel
```

### 3. Set environment variables di Vercel dashboard

Buka Vercel project settings → Environment Variables:

- `OPENAI_API_KEY` = your_openai_key
- `ZEP_API_KEY` = your_zep_key

### 4. Redeploy

Setelah set env vars, deployment akan otomatis terjalankan.

## Architecture

```
Frontend (GitHub Pages / Vercel)
    ↓ HTTP API calls
Backend (Vercel Serverless)
    ↓
OpenAI API + ZEP Memory
```

## Benefits

- ✅ API keys aman di backend (tidak expose di frontend)
- ✅ CORS handled secara proper
- ✅ Rate limiting & error handling lebih baik
- ✅ Bisa deploy ke Vercel, Railway, Heroku, dll
- ✅ Frontend tetap bisa di-host di GitHub Pages
