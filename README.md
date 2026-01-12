# Tube-to-Textbook



## 📖 Overview

**Tube-to-Textbook** is an application that transforms passive video content into an active learning experience. It takes a YouTube video transcript and uses the **Gemini API** to generate a structured textbook chapter and an interactive quiz.

## ✨ Features

* **AI-Powered Content Generation**: Converts raw video transcripts into readable, structured Markdown textbook chapters with titles, key terms, and summaries.
* **Interactive Quizzes**: Generates a 3-question multiple-choice quiz to test comprehension immediately after reading.
* **Instant Feedback**: The quiz interface provides visual feedback (green/red indicators) for correct and incorrect answers.
* **Integrated Video Player**: Watch the source YouTube video directly alongside the generated study material.
* **Markdown Support**: Renders rich text formatting including code blocks, headers, and bold text.

## 🛠️ Tech Stack

* **Frontend**: React 19, Vite
* **AI Integration**: Google GenAI SDK (`@google/genai`) using the `gemini-3-flash-preview` model
* **Styling**: Tailwind CSS (via CDN with Typography and Forms plugins)
* **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites

* **Node.js** (Latest LTS recommended)
* **Google Gemini API Key**: Obtain one from [Google AI Studio](https://aistudio.google.com/).

### Installation

1.  **Clone the repository** and navigate to the project folder.

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env.local` file in the root directory and add your API key:
    ```env
    GEMINI_API_KEY=your_actual_api_key_here
    ```

### Running the App

Start the development server:
```bash
npm run dev
