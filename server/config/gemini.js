const { GoogleGenAI } = require("@google/genai");
const config = require("./config");

let geminiClient = null;

if (config.geminiApiKey && config.geminiApiKey.trim() !== "" && !config.geminiApiKey.startsWith("placeholder")) {
  try {
    geminiClient = new GoogleGenAI({ apiKey: config.geminiApiKey });
    console.log("[AI Service] Google Gemini Client initialized successfully with GEMINI_API_KEY.");
  } catch (err) {
    console.warn("[AI Service Warning] Failed to initialize Google Gemini client:", err.message);
    geminiClient = null;
  }
} else {
  console.log("[AI Service] No valid GEMINI_API_KEY detected. ResumeAI will operate in Intelligent Hybrid Fallback Mode.");
}

const getGeminiClient = () => geminiClient;
const isGeminiAvailable = () => Boolean(geminiClient);

/**
 * Call Gemini model safely and return raw text
 */
const generateGeminiText = async ({ prompt, systemInstruction, temperature = 0.7, model = "gemini-2.5-flash" }) => {
  if (!geminiClient) {
    throw new Error("Gemini client is not initialized or GEMINI_API_KEY is missing.");
  }

  const response = await geminiClient.models.generateContent({
    model,
    contents: prompt,
    config: {
      temperature,
      systemInstruction: systemInstruction || undefined,
    },
  });

  return response.text || "";
};

module.exports = {
  getGeminiClient,
  isGeminiAvailable,
  generateGeminiText,
};

