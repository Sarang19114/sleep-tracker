'use client';
import React from "react";
import { WavyBackground } from "@/components/ui/wavy-background";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { db } from '../firebase';
import { collection, query, limit, getDocs } from 'firebase/firestore';
import { getRecommendation } from '../gemini';

export default function UserData() {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [duration, setDuration] = useState('');
  const [durationError, setDurationError] = useState('');
  const [recommendation, setRecommendation] = useState(''); // State for recommendation

  // Fetch sensor data every 60 seconds
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErrorMessage('');
      try {
        const q = query(collection(db, 'sleepData1'), limit(100));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => {
          const docData = doc.data();
          return {
            id: doc.id,
            timestamp: docData.timestamp,
            temperature: docData.temperature || 0,
            humidity: docData.humidity || 0,
            sound: docData.mic_value || 0,
            light: docData.light === 0 ? 100 : 0, // Light sensor conversion
            heartRate: docData.heart_rate || 0,
          };
        });

        // Sort data by timestamp in descending order
        const sortedData = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        setSensorData(sortedData);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
        setErrorMessage('Failed to load sensor data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    // Fetch data immediately
    fetchData();

    // Set interval to fetch data every 60 seconds
    const intervalId = setInterval(fetchData, 60000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Handle duration input from user
  const handleDurationInput = (e) => {
    const inputDuration = e.target.value;
    if (!isNaN(inputDuration) && inputDuration > 0) {
      setDuration(inputDuration);
      setDurationError('');
    } else {
      setDurationError('Please enter a valid duration (positive number)');
    }
  };

  // Fetch recommendation based on sensor data
  const handleGetRecommendation = async () => {
    if (sensorData.length === 0) {
      setRecommendation('No sensor data available to generate recommendations.');
      return;
    }

    try {
      const recommendationResult = await getRecommendation(sensorData);
      setRecommendation(recommendationResult);
    } catch (error) {
      console.error('Error fetching recommendation:', error);
      setRecommendation('Failed to get recommendation. Please try again later.');
    }
  };

  return (
    
    <div className="max-w-4xl mx-auto p-6">
      <WavyBackground className="max-w-4xl mx-auto pb-40">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800 dark:text-gray-100">Your Sensor Data</h1>

      {/* Duration input */}
      <div className="mb-4">
        <label className="block mb-2 text-lg text-blue-700 font-semibold">Enter Duration (in hours):</label>
        <input
          type="number"
          value={duration}
          onChange={handleDurationInput}
          className={`p-2 border ${durationError ? 'border-red-500' : 'border-gray-300'} rounded`}
          placeholder="Duration in hours"
        />
        {durationError && <p className="text-red-500">{durationError}</p>}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Latest Sensor Data</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center">Loading latest sensor data...</p>
          ) : errorMessage ? (
            <p className="text-center text-red-500">{errorMessage}</p>
          ) : sensorData.length > 0 ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Temperature</TableHead>
                    <TableHead>Humidity</TableHead>
                    <TableHead>Sound</TableHead>
                    <TableHead>Light</TableHead>
                    <TableHead>Heart Rate</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sensorData.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{entry.temperature}°C</TableCell>
                      <TableCell>{entry.humidity}%</TableCell>
                      <TableCell>{entry.sound} dB</TableCell>
                      <TableCell>{entry.light} lux</TableCell>
                      <TableCell>{entry.heartRate} bpm</TableCell>
                      <TableCell>{entry.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Button to fetch recommendation */}
              <div className="mt-4">
                <Button className="bg-blue-500" onClick={handleGetRecommendation}>
                  Get Recommendation
                </Button>
              </div>

              {/* Display the recommendation */}
              {recommendation && (
                <div className="mt-4 p-4 border border-gray-300 rounded">
                  <h2 className="text-xl font-semibold">Personalized Recommendation:</h2>
                  <p dangerouslySetInnerHTML={{ __html: recommendation }} /> {/* Render HTML safely */}
                </div>
              )}
            </>
          ) : (
            <p className="text-center">No sensor data available</p>
          )}
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-between">
        <Button className="bg-blue-500" asChild variant="outline">
          <Link href="/">Previous: Home</Link>
        </Button>
        <Button className="bg-blue-700" asChild>
          <Link href="/recommendations">Next: Chat BOT</Link>
        </Button>
      </div>
      </WavyBackground>
    </div>
  );
}
