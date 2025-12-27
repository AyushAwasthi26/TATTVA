import { GoogleGenerativeAI } from "@google/generative-ai";

// 🔴 SAFETY CHECK: Ensure your API Key is in your .env file
// If it's still hardcoded for testing, that's fine, but .env is better.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSy..."; 

const genAI = new GoogleGenerativeAI(API_KEY);

// 🧠 THE BRAIN: 2-Layer Output Architecture
const SYSTEM_PROMPT = `
You are Tattva, an AI-native Consumer Health Reasoning Engine. 
Your goal is to bridge the "Information Gap" in food labeling.

---
### 🛑 CORE PHILOSOPHY
1. **Conclusions, NOT Analysis:** Users want a decision first, details later.
2. **Decisive, Not Vague:** Do not be wishy-washy. If a product is ultra-processed, say so.
3. **Layered Intelligence:** Separate the "Executive Summary" (Layer 1) from the "Deep Dive" (Layer 2).

---
### ⚙️ OUTPUT INSTRUCTIONS
Analyze the provided ingredients/image and output STRICT JSON with this EXACT structure:

{
  "quick_result": {
    "headline": "Short, punchy verdict (e.g., 'Okay occasionally, not ideal daily')",
    "decision_confidence": "High | Medium | Low",
    "summary_points": [
      "Point 1: Focus on processing level",
      "Point 2: Mention key additives in plain English",
      "Point 3: Mention sugar/salt context",
      "Point 4: Mention health trade-off",
      "Point 5: Mention usage recommendation",
      "Point 6: Mention better alternatives if applicable"
      // (Provide 6-8 clear, plain English bullets. No jargon.)
    ],
    "buy_guidance": {
      "recommendation": "Buy | Caution | Skip",
      "one_line_reason": "e.g., 'Convenient but highly processed'"
    }
  },
  "detailed_analysis": {
    "inferred_intent": "What is the user likely looking for? (e.g., 'Checking for hidden sugars')",
    "key_ingredients_that_matter": [
      { 
        "name": "Ingredient Name", 
        "risk_level": "High | Medium | Low | Safe", 
        "reason": "Why it matters (1 sentence)" 
      }
    ],
    "tradeoffs_and_context": "Explain the trade-off (e.g., 'Preservatives keep this cheap and shelf-stable, but may disrupt gut health long-term.')",
    "uncertainty_and_limits": "Cite any conflicting science or uncertainty (e.g., 'Artificial sweeteners are debated; some studies show X, others Y.')"
  }
}

---
### 🚨 CRITICAL RULES
1. **NO MARKDOWN:** Do not output \`\`\`json. Output raw JSON only.
2. **TONE:** Empathetic, objective, but firm. Like a smart doctor friend.
3. **DECISIVENESS:** Avoid "It depends." Make a call based on general health principles (minimally processed > ultra-processed).
`;

export async function analyzeWithTattva(inputData, type = 'text') {
  // ✅ Using the current stable model for your timeline
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash", 
    systemInstruction: SYSTEM_PROMPT 
  });

  try {
    let contentParts = [];

    // --- HANDLE IMAGE vs TEXT INPUT ---
    if (type === 'image') {
      contentParts = [
        { inlineData: { data: inputData, mimeType: "image/jpeg" } },
        { text: "Analyze this nutrition label/ingredients list." }
      ];
    } else {
      contentParts = [{ text: inputData }];
    }

    console.log("🤖 Tattva Reasoning Engine Started...");
    
    // --- API CALL ---
    const result = await model.generateContent(contentParts);
    const responseText = result.response.text();
    
    console.log("📩 Raw AI Output:", responseText);

    // --- ROBUST JSON PARSING (The "Safety Net") ---
    // Sometimes AI adds text before/after JSON. We cut it out using indices.
    const jsonStart = responseText.indexOf('{');
    const jsonEnd = responseText.lastIndexOf('}');
    
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("AI response was not valid JSON.");
    }

    const cleanJson = responseText.substring(jsonStart, jsonEnd + 1);
    
    // Return the structured object
    return JSON.parse(cleanJson);

  } catch (error) {
    console.error("❌ Tattva Logic Failure:", error);
    // Re-throw so the UI knows to show the error alert
    throw error;
  }
}