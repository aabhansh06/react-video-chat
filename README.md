# React Video Chat

https://github.com/user-attachments/assets/2ce7490a-1f4c-42a4-b042-604ee4036c95

A real-time video chat application built with React, Socket.IO, and WebRTC.

## Features

- Real-time video chat
- Multiple camera support (including Iriun Webcam)
- User presence detection
- Modern UI with Tailwind CSS
- Peer-to-peer connection using WebRTC

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Modern web browser with WebRTC support

## Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/react-video-chat.git
cd react-video-chat
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
node server/index.js
```

4. In a new terminal, start the React development server:
```bash
npm run dev
```

## Using with Iriun Webcam

1. Install Iriun Webcam:
   - Download PC client from https://iriun.com/
   - Install mobile app from Play Store/App Store

2. Connect:
   - Run Iriun on your PC
   - Open the app on your phone
   - Select Iriun Webcam from the camera dropdown in the app

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SERVER_URL=http://localhost:8000
```

## License

MIT
