import React, { useState, useEffect } from 'react';
import { socket } from './config/socket';
import { useVideoChat } from './hooks/useVideoChat';
import VideoPlayer from './components/video/VideoPlayer';
import CallControls from './components/video/CallControls';
import UsersList from './components/video/UsersList';
import LoginForm from './components/auth/LoginForm';
import CameraSelect from './components/video/CameraSelect';

export default function App() {
  const [stream, setStream] = useState(null);
  const [username, setUsername] = useState('');
  const [selectedCamera, setSelectedCamera] = useState('');

  const {
    users,
    calling,
    receivingCall,
    callAccepted,
    connected,
    remoteVideoRef,
    callUser,
    answerCall,
    endCall,
  } = useVideoChat(stream);

  const startVideo = async (deviceId = null) => {
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const constraints = {
        video: deviceId ? { deviceId: { exact: deviceId } } : true,
        audio: true
      };

      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(newStream);
    } catch (err) {
      console.error('Error accessing media devices:', err);
    }
  };

  useEffect(() => {
    startVideo();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCameraChange = (deviceId) => {
    setSelectedCamera(deviceId);
    startVideo(deviceId);
  };

  const handleJoin = () => {
    if (username.trim()) {
      socket.emit('join', username);
    }
  };

  if (!username) {
    return (
      <LoginForm
        username={username}
        onUsernameChange={setUsername}
        onJoin={handleJoin}
      />
    );
  }

  if (!connected) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-4 text-xl font-bold text-yellow-600">Connecting to server...</h2>
          <p className="text-gray-600">Please wait while we establish connection.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-6xl">
        <CameraSelect onDeviceChange={handleCameraChange} />
        
        <div className="mb-8 grid grid-cols-2 gap-8">
          <VideoPlayer
            stream={stream}
            username={`${username} (You)`}
            muted={true}
          />
          <VideoPlayer
            stream={callAccepted ? remoteVideoRef.current?.srcObject : null}
            username={callAccepted ? "Remote User" : null}
          />
        </div>

        <UsersList
          users={users.filter(user => user.username !== username)}
          onCallUser={callUser}
          calling={calling}
          callAccepted={callAccepted}
        />

        <CallControls
          receivingCall={receivingCall}
          callAccepted={callAccepted}
          calling={calling}
          onAnswer={answerCall}
          onEndCall={endCall}
        />
      </div>
    </div>
  );
}