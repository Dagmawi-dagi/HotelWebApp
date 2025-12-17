import { GoogleGenAI } from '@google/genai'
import { ROOMS, EVENTS, FACILITIES, ATTRACTIONS } from '../assets/constants'

let chatSession = null

const roomInfo = ROOMS.map(r =>
  `- ${r.name} (${r.category}): $${r.price}/night. ${r.description} Capacity: ${r.capacity}.`
).join('\n')

const eventInfo = EVENTS.map(e =>
  `- ${e.title} (${e.category}): ${e.date} at ${e.time}. Located at ${e.location}. ${e.description} Cost: ${e.price}.`
).join('\n')

const facilityInfo = FACILITIES.map(f =>
  `- ${f.title} (${f.subtitle}): ${f.description}. Features: ${f.features.join(', ')}. ${f.hours || ''}`
).join('\n')

const attractionInfo = ATTRACTIONS.map(a =>
  `- ${a.name} (${a.type}): ${a.description}. Distance: ${a.distance}.`
).join('\n')

const SYSTEM_INSTRUCTION = `
You are Dagi, the dedicated AI Concierge for the Lumina Grand Hotel.
The hotel is a 5-star luxury resort in Zermatt, Swiss Alps.

Rooms:
${roomInfo}

Facilities:
${facilityInfo}

Attractions:
${attractionInfo}

Events:
${eventInfo}

Tone: Sophisticated, polite, warm.
Keep responses under 80 words unless asked for details.
Never request credit card info.
`

export function getGeminiChat() {
  if (chatSession) return chatSession

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY

  const ai = new GoogleGenAI({ apiKey })

  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7
    }
  })

  return chatSession
}

export async function sendMessageToGemini(message) {
  const chat = getGeminiChat()
  const result = await chat.sendMessageStream({ message })

  async function* streamText() {
    for await (const chunk of result) {
      if (chunk.text) yield chunk.text
    }
  }

  return streamText()
}
