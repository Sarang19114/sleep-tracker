import { NextResponse } from 'next/server';
import { db } from '@/app/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(request) {
  try {
    // Parse incoming JSON data from Arduino
    const data = await request.json();
    
    // Log the data to the console (for testing purposes)
    console.log("Received data:", data);
    
    // Save the data to Firestore
    await addDoc(collection(db, 'sleepData1'), data); // Replace 'yourCollectionName' with the actual collection name

    return NextResponse.json({ message: "Data received and stored successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error processing data:", error);
    return NextResponse.json({ message: "Failed to process data" }, { status: 500 });
  }
}

