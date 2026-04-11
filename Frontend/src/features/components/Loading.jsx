import React from 'react'

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      
      <div className="flex flex-col items-center space-y-6">
        
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>

        {/* Title */}
        <h2 className="text-white text-xl font-semibold tracking-wide">
          Loading...
        </h2>

        {/* Subtext */}
        <p className="text-gray-400 text-sm">
          Please wait while we prepare your dashboard
        </p>

      </div>
    </div>
  );
}

export default Loading
