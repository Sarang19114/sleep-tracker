import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function getRecommendation(sleepData1) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Act as a professional sleep consultant and provide a personalized, structured sleep recommendation based on the following data:\n${JSON.stringify(sleepData1)}\nThe data includes Timestamp, Ambient Noise, Heart Rate, Humidity, Temperature (°C), and Light Sensor (0 for light or 1 for no light). Focus on optimizing the user's sleep routine by analyzing this data and suggesting specific actions to improve their sleep quality. Offer advice on how to adjust their bedtime routine, reduce restlessness, and create a sleep-friendly environment by managing factors such as light, noise, and temperature. Ensure your recommendation is clear, actionable, and directly tailored to the user's data, aiming to enhance their overall sleep consistency. In 10-12 Lines`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  
  // Make sure response.text() is called correctly
  const responseText = await response.text();
  
  // Replace **text** with <strong>text</strong> and add a line break before bold text
  const parsedText = responseText.replace(/\*\*(.*?)\*\*/g, '<br /><strong>$1</strong>');
  
  return parsedText;
}

export async function startChat() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const chat = model.startChat({
    history: [{ role: "user", parts: [{ text: "Hello, I'm looking for tips to improve." }] }],
  });
  return chat;
}

export async function sendMessage(chat, userMessage) {
  const result = await chat.sendMessage(userMessage);
  const response = await result.response;
  
  // Make sure response.text() is called correctly
  const responseText = await response.text();
  
  // Replace **text** with <strong>text</strong> and add a line break before bold text
  const parsedText = responseText.replace(/\*\*(.*?)\*\*/g, '<br /><strong>$1</strong>');
  
  return parsedText;
}
