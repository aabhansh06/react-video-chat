import React from 'react';
import { PhoneIcon, PhoneXMarkIcon } from '@heroicons/react/24/solid';

const CallControls = ({ 
  receivingCall, 
  callAccepted, 
  calling, 
  onAnswer, 
  onEndCall 
}) => {
  if (!(calling || receivingCall || callAccepted)) return null;

  return (
    <div className="mt-8 flex justify-center space-x-4">
      {receivingCall && !callAccepted && (
        <button
          onClick={onAnswer}
          className="flex items-center rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          <PhoneIcon className="mr-2 h-5 w-5" />
          Answer Call
        </button>
      )}
      {(calling || callAccepted) && (
        <button
          onClick={onEndCall}
          className="flex items-center rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          <PhoneXMarkIcon className="mr-2 h-5 w-5" />
          End Call
        </button>
      )}
    </div>
  );
};

export default CallControls;
