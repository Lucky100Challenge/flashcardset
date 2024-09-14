import React from 'react';

interface ProgressTrackerProps {
  totalCards: number;
  currentCardIndex: number;
  isDarkMode: boolean; // Added isDarkMode prop
}

export default function ProgressTracker({ totalCards, currentCardIndex, isDarkMode }: ProgressTrackerProps) {
  const progress = totalCards > 0 ? ((currentCardIndex + 1) / totalCards) * 100 : 0;

  return (
    <div className="mb-4">
      <div className="bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className={`text-center mt-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {currentCardIndex + 1} / {totalCards} cards reviewed
      </p>
    </div>
  );
}