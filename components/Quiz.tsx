
import React, { useState } from 'react';
import type { QuizQuestion } from '../types';
import { CheckCircleIcon, XCircleIcon } from './icons';

interface QuizProps {
    questions: QuizQuestion[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
    const [answers, setAnswers] = useState<Record<number, string>>({});

    const handleAnswerChange = (questionIndex: number, answer: string) => {
        // Lock the answer once chosen by preventing changes.
        if (answers[questionIndex]) {
            return;
        }
        setAnswers({
            ...answers,
            [questionIndex]: answer,
        });
    };

    const getResultIcon = (index: number, option: string) => {
        // Don't show any icon if the question hasn't been answered yet.
        if (!answers[index]) return null;

        const isCorrect = questions[index].correctAnswer === option;
        const isSelected = answers[index] === option;

        // If this option is the correct answer, show a green check.
        if (isCorrect) {
            return <CheckCircleIcon className="w-5 h-5 text-green-400" />;
        }
        
        // If the user selected this option and it's wrong, show a red 'X'.
        if (isSelected && !isCorrect) {
            return <XCircleIcon className="w-5 h-5 text-red-400" />;
        }

        return null;
    };
    
    const getOptionClasses = (index: number, option: string) => {
        const baseClasses = 'flex items-center justify-between w-full p-4 rounded-lg transition-all duration-200';
        
        // Style for when the question has not been answered yet.
        if (!answers[index]) {
            return `${baseClasses} bg-slate-700 hover:bg-slate-600 cursor-pointer`;
        }

        // Styles for after the question has been answered.
        const isCorrect = questions[index].correctAnswer === option;
        const isSelected = answers[index] === option;
        
        if (isCorrect) {
            return `${baseClasses} bg-green-800/80 ring-2 ring-green-500 cursor-default`;
        }
        if (isSelected && !isCorrect) {
            return `${baseClasses} bg-red-800/80 ring-2 ring-red-500 cursor-default`;
        }
        return `${baseClasses} bg-slate-700/50 cursor-default`;
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-white border-b-2 border-cyan-500 pb-2 mb-6">Knowledge Check</h2>
            <div className="space-y-8">
                {questions.map((q, index) => (
                    <div key={index} className="bg-slate-900/50 p-6 rounded-lg border border-slate-700">
                        <p className="font-semibold text-lg mb-4">{index + 1}. {q.question}</p>
                        <div className="space-y-3">
                            {q.options.map((option, optionIndex) => (
                                <label key={optionIndex} className={getOptionClasses(index, option)}>
                                    <span className="flex items-center">
                                      <input
                                          type="radio"
                                          name={`question-${index}`}
                                          value={option}
                                          checked={answers[index] === option}
                                          onChange={() => handleAnswerChange(index, option)}
                                          disabled={answers[index] !== undefined}
                                          className="h-4 w-4 text-cyan-600 bg-gray-700 border-gray-600 focus:ring-cyan-500 form-radio"
                                      />
                                      <span className="ml-3 text-slate-200">{option}</span>
                                    </span>
                                    {getResultIcon(index, option)}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Quiz;
