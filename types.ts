
export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
}

export interface Flashcard {
    front: string;
    back: string;
}

export interface GeneratedData {
    textbookChapter: string;
    flashcards: Flashcard[];
    quiz: QuizQuestion[];
}

export interface HistoryItem {
    id: string;
    timestamp: number;
    youtubeUrl: string;
    transcript: string;
    numQuestions: number;
    generatedData: GeneratedData;
    title: string;
}
