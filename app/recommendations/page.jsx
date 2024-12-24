'use client';
import React from "react";
import { WavyBackground } from "@/components/ui/wavy-background";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from '../firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { getRecommendation, startChat, sendMessage } from '../gemini';

export default function Recommendations() {
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chat, setChat] = useState(null);
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    const fetchRecommendation = async () => {
      setLoading(true);
      setError(null);
      try {
        const q = query(collection(db, 'sleepData1'), orderBy('date', 'desc'), limit(100));
        const querySnapshot = await getDocs(q);
        console.log("Query snapshot:", querySnapshot.docs);
  
        const sleepData1 = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        console.log("Fetched sleep data:", sleepData1);
  
        if (sleepData1.length > 0) {
          const personalizedRecommendation = await getRecommendation(sleepData1);
          setRecommendation(personalizedRecommendation);
        } else {
          setRecommendation('No sleep data available to generate recommendations.');
        }
  
        // Start the chat after fetching the recommendation
        const chatInstance = await startChat();
        setChat(chatInstance);
      } catch (error) {
        console.error('Error fetching recommendation:', error);
        setError('Unable to fetch recommendation at this time. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchRecommendation();
  }, []);
  

  const parseTextForHTML = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<br /><strong>$1</strong>');
  };

  const handleSendMessage = async () => {
    if (messageCount < 5 && userMessage.trim()) {
      const responseText = await sendMessage(chat, userMessage);
      
      // Parse the response text for HTML
      const parsedResponseText = parseTextForHTML(responseText);
      
      setMessages(prev => [
        ...prev,
        { role: 'user', text: userMessage },
        { role: 'bot', text: parsedResponseText }
      ]);
      
      setUserMessage('');
      setMessageCount(prev => prev + 1);
    }
  };

  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40">
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800 dark:text-gray-100">Mental Health Bot</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Chat with the Bot</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 overflow-y-auto border border-gray-300 p-4 rounded-lg">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`font-semibold ${msg.role === 'user' ? 'text-blue-500' : 'text-gray-700'}`}>{msg.role === 'user' ? 'You' : 'Bot'}:</span>
                <span dangerouslySetInnerHTML={{ __html: msg.text }} />
              </div>
            ))}
          </div>
          <div className="mt-4 flex">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              className="border border-gray-300 p-2 rounded flex-1"
              placeholder="Type your message..."
            />
            <Button onClick={handleSendMessage} className="ml-2" disabled={messageCount >= 5}>Send</Button>
          </div>
          {messageCount >= 5 && <p className="text-red-500 mt-2">You have reached the message limit.</p>}
        </CardContent>
      </Card>

      <div className="flex justify-between mt-8">
        <Button className="bg-blue-500" asChild variant="outline">
          <Link href="/userdata">Previous: Sensor Data</Link>
        </Button>
        <Button className="bg-blue-700" asChild>
          <Link href="/">Next: Home</Link>
        </Button>
      </div>
    </div>
    </WavyBackground>
  );
}
