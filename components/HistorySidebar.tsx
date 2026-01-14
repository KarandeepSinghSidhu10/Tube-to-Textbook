
import React from 'react';
import type { HistoryItem } from '../types';
import { TrashIcon, YouTubeIcon, BookOpenIcon, ClockIcon } from './icons';

interface HistorySidebarProps {
    isOpen: boolean;
    onClose: () => void;
    history: HistoryItem[];
    onSelect: (item: HistoryItem) => void;
    onDelete: (id: string, e: React.MouseEvent) => void;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ isOpen, onClose, history, onSelect, onDelete }) => {
    const getVideoId = (url: string) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    return (
        <>
            {/* Backdrop */}
            <div 
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Sidebar Panel */}
            <div 
                className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-slate-900 border-l border-slate-700 shadow-2xl z-50 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800/50">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <ClockIcon className="w-6 h-6 text-cyan-400" />
                        History
                    </h2>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-white"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-4 overflow-y-auto h-[calc(100vh-64px)]">
                    {history.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-40 text-slate-500 text-center">
                            <BookOpenIcon className="w-10 h-10 mb-2 opacity-50" />
                            <p>No history yet.</p>
                            <p className="text-sm">Generate a chapter to see it here.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {history.map((item) => {
                                const videoId = getVideoId(item.youtubeUrl);
                                const thumbnailUrl = videoId 
                                    ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
                                    : null;

                                return (
                                    <div 
                                        key={item.id} 
                                        className="group bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-cyan-500/50 rounded-lg p-3 transition-all cursor-pointer relative"
                                        onClick={() => onSelect(item)}
                                    >
                                        <div className="flex gap-3">
                                            {thumbnailUrl ? (
                                                <div className="w-24 h-16 flex-shrink-0 bg-slate-900 rounded overflow-hidden relative">
                                                    <img src={thumbnailUrl} alt="Thumbnail" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            ) : (
                                                <div className="w-24 h-16 flex-shrink-0 bg-slate-700 rounded flex items-center justify-center">
                                                    <YouTubeIcon className="w-8 h-8 text-slate-500" />
                                                </div>
                                            )}
                                            
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-semibold text-slate-200 line-clamp-2 leading-tight group-hover:text-cyan-400 transition-colors">
                                                    {item.title}
                                                </h3>
                                                <p className="text-xs text-slate-500 mt-1">
                                                    {new Date(item.timestamp).toLocaleDateString()} • {item.numQuestions} Qs
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={(e) => onDelete(item.id, e)}
                                            className="absolute top-2 right-2 p-1.5 bg-slate-900/80 hover:bg-red-900/80 text-slate-400 hover:text-red-400 rounded-md opacity-0 group-hover:opacity-100 transition-all border border-transparent hover:border-red-500/30"
                                            title="Delete from history"
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default HistorySidebar;
