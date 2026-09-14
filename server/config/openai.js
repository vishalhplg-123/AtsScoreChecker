const { OpenAI } = require('openai');
const config = require('./config');

let openaiClient = null;

if (config.openaiApiKey && config.openaiApiKey.trim() !== '' && !config.openaiApiKey.startsWith('sk-placeholder')) {
  openaiClient = new OpenAI({
    apiKey: config.openaiApiKey,
  });
  console.log('[AI Service] OpenAI Client initialized with API key.');
} else {
  console.log('[AI Service] No valid OPENAI_API_KEY detected. ResumeAI will operate in Intelligent Hybrid Fallback Mode.');
}

const getOpenAIClient = () => openaiClient;

module.exports = {
  getOpenAIClient,
  isOpenAIAvailable: () => !!openaiClient,
};
