'use client';

import React, { useState } from 'react';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  isImage: boolean;
}

interface FlashcardViewerProps {
  flashcards: Flashcard[];
  currentCardIndex: number;
  setCurrentCardIndex: (index: number) => void;
  isQuizMode: boolean;
  isDarkMode: boolean;
}

export default function FlashcardViewer({
  flashcards,
  currentCardIndex,
  setCurrentCardIndex,
  isQuizMode,
  isDarkMode,
}: FlashcardViewerProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentCardIndex((currentCardIndex + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentCardIndex((currentCardIndex - 1 + flashcards.length) % flashcards.length);
  };

  if (flashcards.length === 0) {
    return <div className="text-center my-8">No flashcards available. Create some to get started!</div>;
  }

  const currentCard = flashcards[currentCardIndex];

  return (
    <div className="mb-8 flex flex-col items-center">
      <div
        className={`flashcard relative border rounded-lg p-6 mb-4 cursor-pointer w-full max-w-2xl shadow-2xl transition-transform ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
        } ${isFlipped ? 'flipped' : ''}`}
        style={{ height: '300px' }}
        onClick={handleFlip}
      >
        <div className="flashcard-front absolute inset-0 flex items-center justify-center p-6 overflow-auto">
          <div className={`text-center ${isDarkMode ? 'text-white' : ''}`}>
            <h2 className="text-2xl font-bold mb-4">Question:</h2>
            {currentCard.isImage ? (
              <img
                src={currentCard.question}
                alt="Question"
                className="max-w-full h-auto mx-auto max-h-64 object-contain"
              />
            ) : (
              <p className="text-xl break-words whitespace-pre-wrap">{currentCard.question}</p>
            )}
          </div>
        </div>
        <div className="flashcard-back absolute inset-0 flex items-center justify-center p-6 overflow-auto">
          <div className={`text-center ${isDarkMode ? 'text-white' : ''}`}>
            <h2 className="text-2xl font-bold mb-4">Answer:</h2>
            {currentCard.isImage ? (
              <img
                src={currentCard.answer}
                alt="Answer"
                className="max-w-full h-auto mx-auto max-h-64 object-contain"
              />
            ) : (
              <p className="text-xl break-words whitespace-pre-wrap">{currentCard.answer}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full max-w-2xl">
        <button
          onClick={handlePrevious}
          className="custom-button bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="custom-button bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}