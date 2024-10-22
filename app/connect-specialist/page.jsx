'use client'

import { useState } from 'react'
import Link from 'next/link'
import VideoCall from './VideoCall'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating room ID

export default function ConnectSpecialist() {
  const [isCallStarted, setIsCallStarted] = useState(false)
  const [role, setRole] = useState(null)
  const [roomId, setRoomId] = useState(null)

  const startCall = (userRole) => {
    setRole(userRole)
    const newRoomId = uuidv4(); // Generate a new room ID
    setRoomId(newRoomId);
    setIsCallStarted(true)
  }

  if (isCallStarted) {
    return <VideoCall roomId={roomId} endCall={() => setIsCallStarted(false)} />
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-700 dark:text-gray-100">Connect with a Sleep Specialist</h1>
      <Card>
        <CardHeader>
          <CardTitle>Start a Video Call</CardTitle>
          <CardDescription>
            Our team of sleep specialists is here to help you improve your sleep quality. 
            Start a video call with one of our experts for personalized advice.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center space-x-4">
            <Button onClick={() => startCall('user')} variant="default">
              Join as User
            </Button>
            <Button onClick={() => startCall('doctor')} variant="outline">
              Join as Doctor
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="mt-8 flex justify-between">
        <Button className="bg-blue-400" asChild variant="ghost">
          <Link href="/recommendations">Previous: Recommendations</Link>
        </Button>
        <Button className="bg-blue-700" asChild>
          <Link href="/about">Next: About Us</Link>
        </Button>
      </div>
    </div>
  )
}
