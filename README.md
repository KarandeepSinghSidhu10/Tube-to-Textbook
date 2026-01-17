<div align="center">
  <img src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" alt="Tube-to-Textbook Banner" width="100%" />

  # Tube-to-Textbook (T2T)
  
  **Transform passive video watching into an active learning experience.**
  
  [![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)](https://vitejs.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
  [![Gemini AI](https://img.shields.io/badge/Google%20Gemini-AI-8E75B2?logo=google)](https://ai.google.dev/)

  [View Demo Video](https://youtu.be/lDcLiOcJOok) · [Report Bug](https://github.com/karandeepsinghsidhu10/tube-to-textbook/issues) · [Request Feature](https://github.com/karandeepsinghsidhu10/tube-to-textbook/issues)
</div>

---

## 📖 About The Project

**Tube-to-Textbook** is an advanced educational tool designed to convert raw YouTube video transcripts into high-quality, structured study materials. By leveraging the power of **Google's Gemini AI**, this application generates comprehensive textbook chapters, interactive flashcards, and quizzes, making it easier to study complex topics found in video lectures.

### ✨ Key Features

* **📚 AI Textbook Generation**: Converts unstructured transcripts into well-formatted Markdown textbook chapters with clear headings and bullet points.
* **🧠 Intelligent Flashcards**: Automatically creates key-concept flashcards for quick revision and active recall.
* **✅ Interactive Quizzes**: Generates multiple-choice questions (5-30 questions) to test your understanding immediately after learning.
* **📜 History Sidebar**: Automatically saves your generated study guides to local storage, allowing you to revisit previous summaries.
* **🎥 Integrated Player**: Watch the specific video alongside your generated notes.
* **🎨 Modern UI**: A responsive, dark-themed interface built with Tailwind CSS for focused reading.

---

## 📺 Video Demo

Check out the project in action:

[![Tube-to-Textbook Demo](https://img.youtube.com/vi/lDcLiOcJOok/0.jpg)](https://youtu.be/lDcLiOcJOok)

> Click the image above to watch the demo on YouTube.

---

## 🛠️ Tech Stack

* **Frontend Framework:** [React 19](https://react.dev/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **AI Integration:** [Google Gemini API](https://ai.google.dev/) (@google/genai)
* **Markdown Rendering:** [Marked](https://github.com/markedjs/marked)

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

* **Node.js**: Make sure you have Node.js installed (v18 or higher recommended).
* **Gemini API Key**: You will need an API key from [Google AI Studio](https://aistudio.google.com/).

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/karandeepsinghsidhu10/tube-to-textbook.git](https://github.com/karandeepsinghsidhu10/tube-to-textbook.git)
    cd tube-to-textbook
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env.local` file in the root directory and add your Google Gemini API key:
    ```env
    GEMINI_API_KEY=your_actual_api_key_here
    ```

4.  **Run the application**
    ```bash
    npm run dev
    ```

5.  Open your browser and navigate to `http://localhost:3000` (or the port shown in your terminal).

---

## 💡 How to Use

1.  **Find a Video**: Go to YouTube and find an educational video you want to study.
2.  **Get the Transcript**:
    * Click the "..." (more) button below the video player on YouTube.
    * Select "Show transcript".
    * Copy the entire text of the transcript.
3.  **Generate**:
    * Paste the YouTube URL into the **YouTube URL** field in the app.
    * Paste the copied text into the **Video Transcript** field.
    * Select the number of quiz questions you want.
    * Click **Generate Textbook**.
4.  **Study**:
    * Read the generated **Textbook Chapter**.
    * Flip through the **Flashcards** to memorize terms.
    * Take the **Quiz** to verify your knowledge.

---

## 📂 Project Structure

```bash
tube-to-textbook/
├── src/
│   ├── components/      # UI Components (Quiz, Flashcards, Player, etc.)
│   ├── services/        # API handling (geminiService.ts)
│   ├── types.ts         # TypeScript interfaces
│   ├── App.tsx          # Main application logic
│   └── main.tsx         # Entry point
├── .env.local           # API Key configuration (create this)
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
└── vite.config.ts       # Vite configuration
