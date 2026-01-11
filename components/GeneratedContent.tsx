
import React, { useEffect, useState } from 'react';

interface GeneratedContentProps {
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

const GeneratedContent: React.FC<GeneratedContentProps> = ({ markdownContent }) => {
    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
        if (window.marked) {
            setHtmlContent(window.marked.parse(markdownContent));
        }
    }, [markdownContent]);

    return (
        <div>
             <h2 className="text-3xl font-bold text-white border-b-2 border-cyan-500 pb-2 mb-4">Textbook Chapter</h2>
             <div
                className="prose prose-slate prose-invert max-w-none 
                           prose-headings:text-cyan-400 prose-a:text-cyan-400 prose-strong:text-white
                           prose-code:bg-slate-700 prose-code:p-1 prose-code:rounded prose-code:font-mono prose-code:text-sm
                           prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700
                           prose-blockquote:border-l-cyan-500 prose-blockquote:text-slate-400"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
        </div>
    );
};

export default GeneratedContent;
