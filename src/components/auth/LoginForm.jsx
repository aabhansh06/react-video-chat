import React from 'react';

const LoginForm = ({ username, onUsernameChange, onJoin }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold">Join Video Chat</h1>
        <input
          type="text"
          placeholder="Enter your name"
          className="mb-4 w-full rounded border p-2"
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onJoin()}
        />
        <button
          onClick={onJoin}
          className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
