// app/connect-specialist/VideoCall.js

'use client'

import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { Mic, MicOff, Video, VideoOff, Phone, PhoneOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const socket = io('/api/socket'); // Point to your API route if needed

export default function VideoCall({ role, endCall }) {
  const [peer, setPeer] = useState(null);
  const [connected, setConnected] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [offerSignal, setOfferSignal] = useState(null);
  const [answerSignal, setAnswerSignal] = useState(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isLocalSpeaking, setIsLocalSpeaking] = useState(false);
  const [isRemoteSpeaking, setIsRemoteSpeaking] = useState(false);

  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const audioContextRef = useRef();
  const analyserRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        const newPeer = new Peer({
          initiator: role === 'user',
          trickle: false,
          stream: stream,
        });

        newPeer.on('signal', data => {
          if (role === 'user') {
            setOfferSignal(JSON.stringify(data));
            socket.emit('offer', { signal: data }); // Emit offer signal to socket
          } else {
            setAnswerSignal(JSON.stringify(data));
          }
        });

        newPeer.on('stream', stream => {
          setRemoteStream(stream);
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = stream;
          }
        });

        newPeer.on('connect', () => {
          setConnected(true);
        });

        setPeer(newPeer);

        // Set up audio analysis for speaking detection
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyserRef.current);

        const detectSpeaking = () => {
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
          setIsLocalSpeaking(average > 30); // Adjust threshold as needed
          requestAnimationFrame(detectSpeaking);
        };
        detectSpeaking();
      });

    socket.on('answer', data => {
      if (peer) {
        peer.signal(JSON.parse(data.signal)); // Signal the answer from the socket
      }
    });

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      if (peer) {
        peer.destroy();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [role]);

  const handleConnect = () => {
    if (role === 'user' && answerSignal) {
      peer.signal(JSON.parse(answerSignal));
    } else if (role === 'doctor' && offerSignal) {
      peer.signal(JSON.parse(offerSignal));
      socket.emit('join-room', 'your-room-id', offerSignal); // Emit join-room on socket
    }
  };

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsAudioEnabled(audioTrack.enabled);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoEnabled(videoTrack.enabled);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Video Call</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className={`overflow-hidden ${isLocalSpeaking ? 'ring-2 ring-green-500' : ''}`}>
          <CardHeader>
            <CardTitle>Local Video</CardTitle>
          </CardHeader>
          <CardContent className="p-0 aspect-video relative">
            <video 
              ref={localVideoRef} 
              autoPlay 
              muted 
              playsInline 
              className={`w-full h-full object-cover ${isVideoEnabled ? '' : 'hidden'}`} 
            />
            {!isVideoEnabled && (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <span className="text-white">Video Off</span>
              </div>
            )}
            <div className="absolute bottom-4 left-4 flex space-x-2">
              <Button variant="secondary" size="icon" onClick={toggleAudio}>
                {isAudioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4 text-red-500" />}
              </Button>
              <Button variant="secondary" size="icon" onClick={toggleVideo}>
                {isVideoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4 text-red-500" />}
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className={`overflow-hidden ${isRemoteSpeaking ? 'ring-2 ring-green-500' : ''}`}>
          <CardHeader>
            <CardTitle>Remote Video</CardTitle>
          </CardHeader>
          <CardContent className="p-0 aspect-video">
            <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-center space-x-4">
        <Button onClick={handleConnect} variant="default">
          <Phone className="mr-2 h-4 w-4" /> Connect
        </Button>
        <Button onClick={endCall} variant="destructive">
          <PhoneOff className="mr-2 h-4 w-4" /> End Call
        </Button>
      </div>
    </div>
  );
}
