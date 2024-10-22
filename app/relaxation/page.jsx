'use client'

import { useState, useRef } from 'react'
import { Play, Pause, Volume2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

const audioTracks = [
  { id: 1, title: 'Warm Autumn', src: '/assets/WarmA.mp3' },
  { id: 2, title: 'Calm Quest', src: '/assets/calm-quest.mp3' },
  { id: 3, title: 'Relaxing Piano', src: '/assets/night-P.mp3' },
  { id: 4, title: 'Bassy Piano', src: '/assets/BassyP.mp3' },
  { id: 5, title: 'Midnight Forest', src: '/assets/MidN.mp3' },
  { id: 6, title: 'LoFi', src: '/assets/Lofi.mp3' },
]

export default function RelaxationAudios() {
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  
  // Use useRef to keep track of the audio element
  const audioRef = useRef(null)

  const playAudio = (track) => {
    if (currentTrack && currentTrack.id === track.id) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    } else {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      setCurrentTrack(track)
      audioRef.current = new Audio(track.src)
      audioRef.current.volume = volume
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume[0])
    if (audioRef.current) {
      audioRef.current.volume = newVolume[0]
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800 dark:text-gray-100">Relaxation Audios</h1>
      <p className="text-lg text-center mb-8 text-blue-800 dark:text-gray-300">
        Listen to these soothing sounds to help you relax before sleep.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {audioTracks.map((track) => (
          <Card key={track.id}>
            <CardHeader>
              <CardTitle>{track.title}</CardTitle>
              <CardDescription>Click to play/pause</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => playAudio(track)} 
                variant="outline" 
                className="w-full h-24"
              >
                {currentTrack && currentTrack.id === track.id && isPlaying ? (
                  <Pause className="h-12 w-12" />
                ) : (
                  <Play className="h-12 w-12" />
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Volume Control</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <Volume2 className="h-6 w-6" />
          <Slider
            value={[volume]}
            onValueChange={handleVolumeChange}
            max={1}
            step={0.01}
            className="w-full"
          />
        </CardContent>
      </Card>
    </div>
  )
}
