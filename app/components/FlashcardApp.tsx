'use client';

import React, { useState } from 'react';
import FlashcardCreator from './FlashcardCreator';
import FlashcardViewer from './FlashcardViewer';
import ProgressTracker from './ProgressTracker';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  isImage: boolean;
}

export default function FlashcardApp() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const addFlashcard = (newCard: Omit<Flashcard, 'id'>) => {
    setFlashcards([...flashcards, { ...newCard, id: Date.now().toString() }]);
  };

  const shuffleCards = () => {
    setFlashcards([...flashcards].sort(() => Math.random() - 0.5));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-100 to-purple-100 text-gray-900'} transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className={`text-5xl font-bold mb-12 text-center ${isDarkMode ? 'text-white' : 'gradient-text'}`}>
          Flashcard Master
        </h1>
        <div className={`bg-white shadow-2xl rounded-lg p-8 mb-12 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-3xl font-semibold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-indigo-600'}`}>
            Create a New Flashcard
          </h2>
          <FlashcardCreator addFlashcard={addFlashcard} isDarkMode={isDarkMode} />
        </div>
        <FlashcardViewer
          flashcards={flashcards}
          currentCardIndex={currentCardIndex}
          setCurrentCardIndex={setCurrentCardIndex}
          isQuizMode={isQuizMode}
          isDarkMode={isDarkMode}
        />
        <ProgressTracker
          totalCards={flashcards.length}
          currentCardIndex={currentCardIndex}
          isDarkMode={isDarkMode} // Added isDarkMode prop
        />
        <div className="mt-12 flex justify-center space-x-6">
          <button
            onClick={() => setIsQuizMode(!isQuizMode)}
            className="custom-button bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-full font-semibold"
          >
            {isQuizMode ? 'Exit Quiz Mode' : 'Enter Quiz Mode'}
          </button>
          <button
            onClick={shuffleCards}
            className="custom-button bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-full font-semibold"
          >
            Shuffle Cards
          </button>
          <button
            onClick={toggleDarkMode}
            className="custom-button bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold"
          >
            Toggle Dark Mode
          </button>
        </div>
      </div>
    </div>
  );
}