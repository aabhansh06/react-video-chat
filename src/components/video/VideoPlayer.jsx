import React from 'react';

const VideoPlayer = ({ stream, username, muted = false }) => {
  const videoRef = React.useRef();

  React.useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="relative rounded-lg bg-black">
      <video
        playsInline
        muted={muted}
        ref={videoRef}
        autoPlay
        className="h-full w-full rounded-lg"
      />
      {username && (
        <span className="absolute bottom-4 left-4 text-white">
          {username}
        </span>
      )}
    </div>
  );
};

export default VideoPlayer;
