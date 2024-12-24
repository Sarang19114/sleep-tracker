"use client";
import React from "react";
import { WavyBackground } from "@/components/ui/wavy-background";

export default function About() {
  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">
        About <span className="text-indigo-600">SleepTracker</span>
      </h1>
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <p className="mb-6 text-gray-700 leading-relaxed">
          Welcome to SleepTracker, your dedicated partner in achieving restful and rejuvenating sleep. We understand that quality sleep is a cornerstone of good health and well-being, and our mission is to empower you with the tools and insights necessary to transform your sleep patterns.
        </p>
        <p className="mb-6 text-gray-700 leading-relaxed">
          At SleepTracker, we harness the latest advancements in technology and artificial intelligence to provide personalized sleep insights tailored to your unique needs. Whether you're struggling with sleep quality, looking to optimize your sleep schedule, or seeking guidance from experts, we’re here to support you every step of the way.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-indigo-600">Why Choose SleepTracker?</h2>
        <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
          <li>🔍 <strong>Comprehensive Sleep Analysis:</strong> Gain deep insights into your sleep patterns with detailed reports that track your progress over time.</li>
          <li>🤖 <strong>AI-Driven Recommendations:</strong> Receive tailored suggestions designed to enhance your sleep quality and overall well-being.</li>
          <li>👩‍⚕️ <strong>Access to Sleep Specialists:</strong> Connect directly with experienced sleep experts via Google Meet for personalized advice and support.</li>
          <li>📱 <strong>User-Friendly Experience:</strong> Navigate our intuitive platform effortlessly, making tracking your sleep a seamless part of your daily routine.</li>
          <li>🎶 <strong>Relaxation Tunes:</strong> Enjoy a curated selection of calming music and sounds designed to promote relaxation and improve your sleep environment.</li>
          <li>💭 <strong>Dream Analysis:</strong> Explore the meanings behind your dreams with our professional dream analysis feature, helping you understand the emotions and symbols that may impact your waking life.</li>
        </ul>
        <p className="mb-6 text-gray-700 leading-relaxed">
          Our commitment goes beyond just monitoring sleep; we strive to create a community where individuals can learn, share, and grow together. We believe that informed choices lead to better sleep, and better sleep leads to a happier, healthier life.
        </p>
        <p className="text-gray-700 font-semibold">
          Join us on the journey to discover the restorative power of sleep, enjoy soothing tunes, and delve into the intriguing world of dreams. Embrace a healthier lifestyle today!
        </p>
      </div>
    </div>
    </WavyBackground>
  );
}
