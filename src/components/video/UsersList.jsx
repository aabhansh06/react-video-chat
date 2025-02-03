import React from 'react';
import { VideoCameraIcon } from '@heroicons/react/24/solid';

const UsersList = ({ users, onCallUser, calling, callAccepted }) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-bold">Online Users</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.username}
            className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
          >
            <span>{user.username}</span>
            <button
              onClick={() => onCallUser(user.id)}
              disabled={calling || callAccepted}
              className="rounded bg-green-500 p-2 text-white hover:bg-green-600 disabled:opacity-50"
            >
              <VideoCameraIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
