'use client';

import React, { useState } from 'react';

interface FlashcardCreatorProps {
  addFlashcard: (card: { question: string; answer: string; isImage: boolean }) => void;
  isDarkMode: boolean;
}

export default function FlashcardCreator({ addFlashcard, isDarkMode }: FlashcardCreatorProps) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isImage, setIsImage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question && answer) {
      addFlashcard({ question, answer, isImage });
      setQuestion('');
      setAnswer('');
      setIsImage(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-4">
        <label htmlFor="question" className="block mb-2">
          Question:
        </label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : ''}`}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="answer" className="block mb-2">
          Answer:
        </label>
        <input
          type="text"
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : ''}`}
          required
        />
      </div>
      <div className="mb-4">    
        <label className={`flex items-center ${isDarkMode ? 'text-white' : ''}`}>
          <input
            type="checkbox"
            checked={isImage}
            onChange={() => setIsImage(!isImage)}
            className="mr-2"
          />
          Is this an image-based card?
        </label>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
        Add Flashcard
      </button>
    </form>
  );
}