
import React, { useState, useMemo, useEffect } from 'react';
import { generateTextbookFromTranscript } from './services/geminiService';
import type { GeneratedData, HistoryItem } from './types';
import YouTubePlayer from './components/YouTubePlayer';
import GeneratedContent from './components/GeneratedContent';
import Quiz from './components/Quiz';
import Flashcards from './components/Flashcards';
import HistorySidebar from './components/HistorySidebar';
import { YouTubeIcon, BookOpenIcon, SparklesIcon, AlertTriangleIcon, ClockIcon } from './components/icons';

const App: React.FC = () => {
    const [youtubeUrl, setYoutubeUrl] = useState<string>('');
    const [transcript, setTranscript] = useState<string>('');
    const [numQuestions, setNumQuestions] = useState<number>(5);
    const [generatedData, setGeneratedData] = useState<GeneratedData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    // History State
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

    // Load history on mount
    useEffect(() => {
        try {
            const savedHistory = localStorage.getItem('tube_textbook_history');
            if (savedHistory) {
                setHistory(JSON.parse(savedHistory));
            }
        } catch (e) {
            console.error("Failed to load history", e);
        }
    }, []);

    const saveToHistory = (data: GeneratedData, url: string, trans: string, qs: number) => {
        try {
            // Extract a title from the markdown (first H1)
            const titleMatch = data.textbookChapter.match(/^#\s+(.+)$/m);
            const title = titleMatch ? titleMatch[1] : 'Untitled Chapter';

            const newItem: HistoryItem = {
                id: Date.now().toString(), // Simple ID
                timestamp: Date.now(),
                youtubeUrl: url,
                transcript: trans,
                numQuestions: qs,
                generatedData: data,
                title: title
            };

            const updatedHistory = [newItem, ...history].slice(0, 10); // Keep last 10
            setHistory(updatedHistory);
            localStorage.setItem('tube_textbook_history', JSON.stringify(updatedHistory));
        } catch (e) {
            console.error("Failed to save history (likely quota exceeded)", e);
        }
    };

    const deleteFromHistory = (id: string, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering selection
        const updatedHistory = history.filter(item => item.id !== id);
        setHistory(updatedHistory);
        localStorage.setItem('tube_textbook_history', JSON.stringify(updatedHistory));
    };

    const loadHistoryItem = (item: HistoryItem) => {
        setYoutubeUrl(item.youtubeUrl);
        setTranscript(item.transcript);
        setNumQuestions(item.numQuestions);
        setGeneratedData(item.generatedData);
        setIsHistoryOpen(false);
        setError(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const videoId = useMemo(() => {
        if (!youtubeUrl) return null;
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = youtubeUrl.match(regex);
        return match ? match[1] : null;
    }, [youtubeUrl]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!transcript.trim()) {
            setError('Please paste the video transcript before generating.');
            return;
        }
        setError(null);
        setIsLoading(true);

        try {
            const result = await generateTextbookFromTranscript(transcript, numQuestions);
            setGeneratedData(result);
            saveToHistory(result, youtubeUrl, transcript, numQuestions);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            setGeneratedData(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setYoutubeUrl('');
        setTranscript('');
        setGeneratedData(null);
        setError(null);
        setIsLoading(false);
        setNumQuestions(5);
    };

    const questionOptions = [5, 10, 15, 20, 25, 30];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 font-sans text-slate-300">
            <header className="bg-slate-900/70 backdrop-blur-sm p-4 border-b border-slate-700 sticky top-0 z-20">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <BookOpenIcon className="w-8 h-8 text-cyan-400" />
                        <h1 className="text-2xl font-bold text-white tracking-tight hidden sm:block">Tube-to-Textbook</h1>
                        <h1 className="text-xl font-bold text-white tracking-tight sm:hidden">T2T</h1>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        {generatedData && (
                             <button
                                onClick={handleReset}
                                className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                            >
                                + New
                            </button>
                        )}
                        <button
                            onClick={() => setIsHistoryOpen(true)}
                            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 px-4 rounded-md border border-slate-600 transition-all text-sm sm:text-base"
                            title="View History"
                        >
                            <ClockIcon className="w-5 h-5" />
                            <span className="hidden sm:inline">History</span>
                        </button>
                    </div>
                </div>
            </header>

            <HistorySidebar 
                isOpen={isHistoryOpen} 
                onClose={() => setIsHistoryOpen(false)} 
                history={history}
                onSelect={loadHistoryItem}
                onDelete={deleteFromHistory}
            />

            <main className="container mx-auto p-4 md:p-8">
                {!generatedData ? (
                    <div className="fade-in">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column: Input */}
                            <div className="flex flex-col gap-6">
                                <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700 space-y-6">
                                    <div>
                                        <label htmlFor="youtubeUrl" className="flex items-center gap-2 mb-2 text-lg font-semibold text-white">
                                            <YouTubeIcon className="w-6 h-6 text-red-500" />
                                            YouTube URL
                                        </label>
                                        <input
                                            id="youtubeUrl"
                                            type="url"
                                            value={youtubeUrl}
                                            onChange={(e) => setYoutubeUrl(e.target.value)}
                                            placeholder="e.g., https://www.youtube.com/watch?v=..."
                                            className="w-full bg-slate-900 border border-slate-600 rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="transcript" className="block mb-2 text-lg font-semibold text-white">Video Transcript</label>
                                        <textarea
                                            id="transcript"
                                            value={transcript}
                                            onChange={(e) => setTranscript(e.target.value)}
                                            placeholder="Paste the full video transcript here..."
                                            rows={8}
                                            className="w-full bg-slate-900 border border-slate-600 rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                                            required
                                        />
                                        <p className="text-xs text-slate-400 mt-2">
                                            How to get a transcript: On YouTube, click the '...' below the video, then 'Show transcript'. Copy and paste the text here.
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block mb-3 text-lg font-semibold text-white">Number of Quiz Questions</label>
                                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                                            {questionOptions.map((num) => (
                                                <button
                                                    key={num}
                                                    type="button"
                                                    onClick={() => setNumQuestions(num)}
                                                    className={`
                                                        py-2 px-1 rounded-md font-medium text-sm transition-all duration-200 border
                                                        ${numQuestions === num 
                                                            ? 'bg-cyan-600 border-cyan-500 text-white shadow-[0_0_15px_rgba(8,145,178,0.5)] transform scale-105' 
                                                            : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white'}
                                                    `}
                                                >
                                                    {num}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <button
                                        type="submit"
                                        disabled={isLoading || !transcript}
                                        className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                <SparklesIcon className="w-5 h-5" />
                                                Generate Textbook
                                            </>
                                        )}
                                    </button>
                                </form>

                                {videoId && <YouTubePlayer videoId={videoId} />}
                            </div>

                            {/* Right Column: Output Placeholder */}
                            <div className="bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700 min-h-[300px]">
                                {isLoading && (
                                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                        <SparklesIcon className="w-12 h-12 text-cyan-500 animate-pulse" />
                                        <p className="mt-4 text-lg">Generating your chapter...</p>
                                        <p className="text-sm">This may take a moment.</p>
                                    </div>
                                )}
                                {error && (
                                    <div className="flex flex-col items-center justify-center h-full text-red-400 bg-red-900/20 rounded-lg p-4">
                                        <AlertTriangleIcon className="w-12 h-12" />
                                        <p className="mt-4 text-lg font-semibold">An Error Occurred</p>
                                        <p className="text-sm text-center">{error}</p>
                                    </div>
                                )}
                                {!isLoading && !error && (
                                    <div className="flex flex-col items-center justify-center h-full text-slate-500">
                                        <BookOpenIcon className="w-16 h-16" />
                                        <p className="mt-4 text-lg">Your textbook chapter will appear here.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto fade-in">
                        {videoId && <YouTubePlayer videoId={videoId} />}
                        <div className="bg-slate-800 rounded-lg p-6 md:p-8 shadow-lg border border-slate-700 mt-8 space-y-8">
                           <GeneratedContent markdownContent={generatedData.textbookChapter} />
                           {generatedData.flashcards && generatedData.flashcards.length > 0 && (
                               <Flashcards flashcards={generatedData.flashcards} />
                           )}
                           {generatedData.quiz && generatedData.quiz.length > 0 && <Quiz questions={generatedData.quiz} />}
                       </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default App;
