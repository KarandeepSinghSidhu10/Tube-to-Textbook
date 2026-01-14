
import React, { useState } from 'react';
import type { Flashcard } from '../types';
import { CardsIcon } from './icons';

interface FlashcardsProps {
    flashcards: Flashcard[];
}

const Flashcards: React.FC<FlashcardsProps> = ({ flashcards }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleNext = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % flashcards.length);
        }, 150);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
        }, 150);
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    if (flashcards.length === 0) return null;

    const currentCard = flashcards[currentIndex];

    return (
        <div className="mt-8">
            <h2 className="text-3xl font-bold text-white border-b-2 border-cyan-500 pb-2 mb-6 flex items-center gap-2">
                <CardsIcon className="w-8 h-8 text-cyan-400" />
                Quick Revision Cards
            </h2>
            
            <div className="flex flex-col items-center">
                {/* 3D Card Container */}
                <div 
                    className="group w-full max-w-2xl h-64 [perspective:1000px] cursor-pointer"
                    onClick={handleFlip}
                >
                    <div 
                        className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${
                            isFlipped ? '[transform:rotateY(180deg)]' : ''
                        }`}
                    >
                        {/* Front Face */}
                        <div className="absolute w-full h-full backface-hidden [backface-visibility:hidden]">
                            <div className="w-full h-full bg-slate-800 border-2 border-cyan-700 rounded-xl shadow-lg shadow-cyan-900/20 flex flex-col items-center justify-center p-8 text-center hover:border-cyan-500 transition-colors">
                                <p className="text-sm text-cyan-400 font-bold uppercase tracking-wider mb-4">Term / Concept</p>
                                <p className="text-2xl font-bold text-white">{currentCard.front}</p>
                                <p className="absolute bottom-4 text-xs text-slate-500">Click to flip</p>
                            </div>
                        </div>

                        {/* Back Face */}
                        <div className="absolute w-full h-full backface-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]">
                            <div className="w-full h-full bg-cyan-900/30 border-2 border-cyan-600 rounded-xl shadow-lg flex flex-col items-center justify-center p-8 text-center">
                                <p className="text-sm text-cyan-300 font-bold uppercase tracking-wider mb-4">Definition</p>
                                <p className="text-lg text-slate-100 leading-relaxed">{currentCard.back}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-6 mt-6">
                    <button 
                        onClick={handlePrev}
                        className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 transition-colors"
                        aria-label="Previous card"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    
                    <span className="text-slate-400 font-medium font-mono">
                        {currentIndex + 1} / {flashcards.length}
                    </span>

                    <button 
                        onClick={handleNext}
                        className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 transition-colors"
                        aria-label="Next card"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Flashcards;
