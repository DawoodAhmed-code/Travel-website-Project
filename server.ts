import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with required httpOptions User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Gemini Chat Endpoint for Travel Consultation
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    // Build chat contents from history
    const contents: any[] = [];
    if (Array.isArray(history)) {
      for (const turn of history) {
        if (turn.role === 'user' || turn.role === 'model') {
          contents.push({
            role: turn.role,
            parts: [{ text: turn.text }],
          });
        }
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: `You are Traver AI, an expert, enthusiastic, and reliable northern Pakistan tour advisor and itinerary planner for Traver Pakistan (Traver.pk).
You specialize in trip planning across:
- Hunza Valley & Upper Gojal (Attabad Lake, Passu Cones, Baltit & Altit Forts, Khunjerab Pass China Border)
- Skardu & Baltistan (Shangrila Lake, Deosai National Park, Katpana Cold Desert, Shigar Fort, Basho Valley)
- Fairy Meadows & Nanga Parbat Base Camp (Raikot Bridge 4x4 Jeep trail, Beyal Camp, Killer Mountain view)
- Swat Valley & Malam Jabba Ski Resort (Kalam Valley, Mahodand Lake, Ushu Forest, White Palace)
- Naran, Kaghan & Lake Saiful Muluk (Babusar Top, Lulusar Lake, Shogran & Siri Paye)
- Neelum Valley & Arang Kel (Azad Kashmir, Sharda Peeth ruins, Kutton Waterfall)
- Lahore Walled City & Mughal Heritage Trail (Badshahi Mosque, Lahore Fort, Wagah Border)

Core Guidelines:
1. Provide practical, inspiring advice on road conditions, best seasonal timing (spring blossoms in March-April, summer green meadows in June-August, autumn golden foliage in October, winter snow in Dec-Feb), altitude acclimatization, packing essentials, and delicious local food (Chapshuro, Mamtu, Balti Trout, Karahi).
2. When relevant, mention estimated prices in PKR (Hunza 7D ~PKR 75k, Skardu 8D ~PKR 92k, Fairy Meadows 6D ~PKR 65k, Swat 5D ~PKR 42k, Naran 4D ~PKR 38k, Neelum 5D ~PKR 45k, Lahore 3D ~PKR 25k).
3. Remind users that they can browse tour packages and book instantly via our WhatsApp desk on the website.
4. Keep responses warmly conversational, well-structured with clear bullet points, and concise.`,
      },
    });

    const reply = response.text || "I'm here to help you plan your unforgettable adventure in Pakistan!";
    res.json({ reply });
  } catch (error: any) {
    console.error('Gemini Chat error:', error);
    res.status(500).json({
      error: error?.message || 'Failed to generate response from Gemini AI',
    });
  }
});

// Gemini Destination Itinerary & Cost Planning Endpoint
app.post('/api/plan-itinerary', async (req, res) => {
  try {
    const { origin, destination, days, travelStyle, travellers, interests } = req.body;

    const prompt = `Create a detailed ${days || 5}-day travel plan and cost estimation for traveling from ${origin || 'Islamabad'} to ${destination || 'Hunza Valley'} in Pakistan.
Party size: ${travellers || 2} persons. Travel style: ${travelStyle || 'Standard'}.
Special interests: ${interests || 'Scenic photography, family sightseeing, cultural heritage, mountain walks'}.

Please provide:
1. "overview": A 2-sentence summary of the route, total estimated driving distance in km, and best road route (e.g. Karakoram Highway, Hazara Motorway, Swat Express).
2. "dailyPlan": An array of day-by-day plans from Day 1 to Day ${days || 5}. For each day include:
   - "day": number
   - "title": descriptive title (e.g. "Islamabad to Naran & Kunhar River")
   - "activities": list of 3-4 key stops, activities, and scenic viewpoints
   - "mealTip": authentic local dish to try
   - "stay": recommended town / hotel category for overnight rest
3. "costEstimate": itemized PKR budget for:
   - "transport": estimated fuel/transit/rental cost in PKR
   - "accommodation": estimated hotel stays in PKR
   - "food": estimated meals in PKR
   - "jeepsAndActivities": 4x4 offroad jeeps/lake boating in PKR
   - "totalPKR": total sum in PKR
   - "perPersonPKR": cost per person in PKR
4. "travelTips": 3 practical road & packing advisories (e.g., altitude, CNIC/passport checks, cash ATM availability).

Return the response in clear, valid JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        systemInstruction: 'You are Traver Pakistan\'s master itinerary planner and mountain logistics specialist. Always calculate realistic Pakistani Rupee (PKR) pricing and accurate mountain travel routes.',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Itinerary generation error:', error);
    res.status(500).json({
      error: error?.message || 'Failed to generate itinerary with AI',
    });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
