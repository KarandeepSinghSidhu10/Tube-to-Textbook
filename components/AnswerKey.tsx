
import React, { useState, useEffect } from 'react';
import { EyeIcon, EyeSlashIcon } from './icons';

interface AnswerKeyProps {
    markdownContent: string;
}

// Extend window type to include 'marked'
declare global {
    interface Window {
        marked: {
            parse: (markdown: string) => string;
        };
    }
}


const AnswerKey: React.FC<AnswerKeyProps> = ({ markdownContent }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
        if (window.marked) {
            setHtmlContent(window.marked.parse(markdownContent));
        }
    }, [markdownContent]);

    return (
        <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 mt-8">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-4 rounded-md transition-all duration-300"
            >
                {isOpen ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                {isOpen ? 'Hide Answer Key' : 'Show Answer Key'}
            </button>

            {isOpen && (
                <div className="mt-6 pt-6 border-t border-slate-700">
                    <div
                        className="prose prose-slate prose-invert max-w-none 
                                   prose-headings:text-cyan-400 prose-a:text-cyan-400 prose-strong:text-white"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                </div>
            )}
        </div>
    );
};

export default AnswerKey;
