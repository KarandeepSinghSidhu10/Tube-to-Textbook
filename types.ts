
export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
}

export interface GeneratedData {
    textbookChapter: string;
    quiz: QuizQuestion[];
}
