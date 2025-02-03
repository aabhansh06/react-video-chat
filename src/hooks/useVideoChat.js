import { useState, useEffect, useRef } from 'react';
import Peer from 'simple-peer';
import { socket } from '../config/socket';

export const useVideoChat = (stream) => {
  const [users, setUsers] = useState([]);
  const [calling, setCalling] = useState(false);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [connected, setConnected] = useState(socket.connected);
  const connectionRef = useRef();
  const remoteVideoRef = useRef();

  useEffect(() => {
    // Socket connection handlers
    const onConnect = () => {
      console.log('Connected to server');
      setConnected(true);
    };

    const onDisconnect = () => {
      console.log('Disconnected from server');
      setConnected(false);
      setUsers([]);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    // Video chat event handlers
    socket.on('users', (users) => {
      setUsers(users);
    });

    socket.on('callIncoming', ({ from, name, signal }) => {
      setReceivingCall(true);
      setCaller(from);
      setCallerSignal(signal);
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      setCalling(false);
      if (connectionRef.current) {
        connectionRef.current.signal(signal);
      }
    });

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('users');
      socket.off('callIncoming');
      socket.off('callAccepted');
      if (connectionRef.current) {
        connectionRef.current.destroy();
      }
    };
  }, []);

  const callUser = (userId) => {
    if (!connected) {
      console.error('Not connected to server');
      return;
    }

    setCalling(true);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (data) => {
      socket.emit('callUser', {
        to: userId,
        signal: data,
        from: socket.id,
      });
    });

    peer.on('stream', (remoteStream) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    if (!connected) {
      console.error('Not connected to server');
      return;
    }

    setCallAccepted(true);
    setReceivingCall(false);

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: caller });
    });

    peer.on('stream', (remoteStream) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const endCall = () => {
    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
    setCallAccepted(false);
    setReceivingCall(false);
    setCalling(false);
  };

  return {
    users,
    calling,
    receivingCall,
    callAccepted,
    connected,
    remoteVideoRef,
    callUser,
    answerCall,
    endCall,
  };
};
