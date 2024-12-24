'use client';
import Link from 'next/link'
import React from "react";
import { WavyBackground } from "@/components/ui/wavy-background";

export default function Home() {
  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40">
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-8 text-blue-800">
        Welcome to <span className="text-indigo-600">Sleep</span>Tracker
      </h1>
      <p className="text-xl mb-12 text-blue-800">
        Monitor your sleep patterns and improve your overall well-being.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {/* Existing Cards */}
        <Link
          href="/user-data"
          className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
        >
          <div className="text-blue-600 mb-4">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">View Your Data</h2>
          <p className="text-gray-600">Check your sleep statistics and patterns.</p>
        </Link>

        <Link
          href="/recommendations"
          className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
        >
          <div className="text-indigo-600 mb-4">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Get Recommendations</h2>
          <p className="text-gray-600">Receive personalized sleep advice.</p>
        </Link>

        <Link
          href="/connect-specialist"
          className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
        >
          <div className="text-green-600 mb-4">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Connect with a Specialist</h2>
          <p className="text-gray-600">Schedule a video call with a sleep expert.</p>
        </Link>

        {/* New Cards */}
        <Link
          href="/relaxation"
          className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
        >
          <div className="text-purple-600 mb-4">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19V6l10 7-10 6z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Relaxation Tunes</h2>
          <p className="text-gray-600">Listen to soothing sounds to relax.</p>
        </Link>

        <Link
          href="/dream-analyze"
          className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
        >
          <div className="text-yellow-600 mb-4">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6l4 2"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Dream Analysis</h2>
          <p className="text-gray-600">Interpret and analyze your dreams.</p>
        </Link>
      </div>

      <div className="mb-12">
        <Link
          href="/user-data"
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 text-3xl rounded-xl focus:outline-none focus:shadow-outline"
        >
          Start Tracking Your Sleep
        </Link>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Understanding Sleep Factors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Existing content */}
          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Temperature</h3>
            <p className="text-gray-600 mb-2">
              The ideal bedroom temperature for sleep is between 60-67°F (15.6-19.4°C). Temperature affects your body's internal 'sleep clock' and its ability to regulate sleep.
            </p>
            <a
              href="https://www.sleepfoundation.org/bedroom-environment/best-temperature-for-sleep"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Learn more
            </a>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Sound</h3>
            <p className="text-gray-600 mb-2">
              Noise levels above 40 decibels can disturb sleep. Consistent background noise or white noise around 30-40 dB may help mask disruptive sounds.
            </p>
            <a
              href="https://www.sleepfoundation.org/noise-and-sleep"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Learn more
            </a>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Light</h3>
            <p className="text-gray-600 mb-2">
              Exposure to light suppresses the production of melatonin, a sleep-promoting hormone. Aim for a dark bedroom (less than 5 lux) for optimal sleep.
            </p>
            <a
              href="https://www.sleepfoundation.org/bedroom-environment/light-and-sleep"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </div>
    </WavyBackground>
  );
}
