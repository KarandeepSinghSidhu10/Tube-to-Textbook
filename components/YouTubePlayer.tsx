
import React from 'react';
import { ExternalLinkIcon } from './icons';

interface YouTubePlayerProps {
    videoId: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId }) => {
    return (
        <div className="space-y-4">
            <div className="aspect-video w-full">
                <iframe
                    className="w-full h-full rounded-lg shadow-lg border border-slate-700 bg-slate-900"
                    src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
             <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700 text-center text-sm text-slate-400">
                <p>If the video shows an error, its owner may have disabled embedding.</p>
                <a
                    href={`https://www.youtube.com/watch?v=${videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold hover:underline transition-colors"
                >
                    <ExternalLinkIcon className="w-4 h-4" />
                    Watch on YouTube instead
                </a>
            </div>
        </div>
    );
};

export default YouTubePlayer;
