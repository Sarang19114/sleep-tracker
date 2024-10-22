import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function getAnalyze(data) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  let prompt;
  if (data.type === 'dream_analysis') {
    prompt = `Analyze the following dream and provide insights into its potential meanings and symbolism:
    
    Dream: ${data.content}
    
    Please provide a detailed analysis in 3-4 paragraphs, covering the following aspects:
    1. Main symbols and their potential meanings
    2. Emotions present in the dream and what they might represent
    3. Possible connections to the dreamer's waking life
    4. Any advice or reflection based on the dream analysis`;
  }

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // Make sure response.text() is called correctly
    const responseText = await response.text();
    
    // Replace **text** with <strong>text</strong> and add a line break before bold text
    const parsedText = responseText.replace(/\*\*(.*?)\*\*/g, '<br /><strong>$1</strong>');
    
    return parsedText;
  } catch (error) {
    console.error("Error analyzing dream:", error);
    return "Sorry, we couldn't analyze the dream due to content safety concerns. Please try again with different input.";
  }
}
