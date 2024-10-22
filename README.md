# Sleep Tracker & Wellness Recommendation System

## Project Overview

This project, built for a hackathon, is a **Next.js** application that tracks various health and environmental parameters to provide personalized sleep and wellness recommendations. The system uses **NodeMCU ESP8266** connected to sensors that gather **light, sound, temperature, humidity, and heart rate** data. This data is sent to the Next.js backend and processed using the **Gemini API**, which provides personalized recommendations. The project also features a **Gemini Chatbot** for interactive user support and a **video call** feature that allows users to connect with doctors for further consultation.

---

## Features

### 1. **NodeMCU ESP8266 Integration**
- The ESP8266 is connected to several sensors:
  - **Light Sensor**: Tracks the ambient light levels.
  - **Sound Sensor**: Monitors noise levels in the user's environment.
  - **Temperature & Humidity Sensor**: Provides environmental conditions that affect sleep.
  - **Heart Rate Sensor**: Measures the user’s heart rate during sleep.

### 2. **Real-time Data Transfer**
- The data from the sensors is sent to the **Next.js** application via API routes.
- The ESP8266 communicates wirelessly through Wi-Fi and publishes sensor data using **MQTT**.

### 3. **Personalized Recommendations via Gemini API**
- Once the data is received by the Next.js backend, it is processed and sent to the **Gemini API**, which generates personalized recommendations to improve sleep quality based on the sensor data.
- Recommendations include sleep environment adjustments, health tips, and advice for improving sleep patterns.

### 4. **Gemini Chatbot**
- A chatbot powered by the **Gemini API** allows users to ask questions about sleep, wellness, and recommendations.
- The chatbot is interactive and provides personalized responses based on user queries and their tracked data.

### 5. **Video Call with Doctors**
- Users can consult with doctors using a **WebRTC-based video call** feature.
- The video call is implemented using **ZEGOCLOUD** or **Peer.js** with **Socket.IO** for peer-to-peer communication.
- This allows for real-time health consultations, directly within the app.

### 6. **Additional Features**
- A clean and responsive UI built with **Tailwind CSS**.
- **User-friendly navigation** and **data visualization** for sensor data.
- Integrated authentication to keep user data secure.

---

## Installation Guide

### Prerequisites
- **Node.js** and **npm** installed.
- A **Firebase** account (for storing user data if used).
- **Gemini API** credentials.
- ESP8266 with sensors connected and configured.

### Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repo/sleep-tracker.git
   cd sleep-tracker

2. **Install Dependencies:**
   ```bash
   Copy code
   npm install

3. **Set up Environment Variables: Create a .env.local file in the root of the project and configure the following:**
   ```bash
   Copy code
   GEMINI_API_KEY=your_gemini_api_key
   FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id

4. **Start the Development Server:**
   ```bash
   Copy code
   npm run dev
   Your application will run locally at http://localhost:3000.

# Configure NodeMCU ESP8266:

Flash the ESP8266 with the required code to connect the sensors and send data to the Next.js API.
Use MQTT to publish sensor data to your server or directly via API endpoints.

## How It Works

1. **Sensor Data Collection**:  
   The ESP8266 gathers data from the connected sensors and sends it to the Next.js server.

2. **Data Processing & Storage**:  
   The data is stored in Firebase Firestore or any other database solution.

3. **Gemini API Integration**:  
   The stored data is sent to the Gemini API, which analyzes the user's sleep patterns and environmental conditions to provide personalized recommendations.

4. **Chatbot & Video Call**:  
   Users can interact with the Gemini Chatbot for additional support or consult a doctor through the video call feature if further assistance is required.

---

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Next.js API Routes, Firebase Firestore
- **Sensors & Hardware**: NodeMCU ESP8266, MQTT
- **API**: Gemini API for sleep recommendations
- **Video Call**: WebRTC, Peer.js, Socket.IO

---

## Future Improvements

- Add support for more sensors to track additional environmental factors.
- Improve the UI/UX of the application, especially the chatbot and video call interfaces.
- Integrate machine learning to further personalize recommendations based on historical data.

---

## Team

- **Sarang Rastogi**
- **Ruqayya Shah**
- **Yash**
- **Akshat**
- **Janvi**

---
