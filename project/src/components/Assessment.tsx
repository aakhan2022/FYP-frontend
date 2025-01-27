import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, Brain, Award, RefreshCcw } from 'lucide-react';

type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

type QuizResult = {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  score: number;
};

// Mock questions based on the project's tech stack
const mockQuestions: Question[] = [
  {
    id: 1,
    text: "Which hook would you use to manage the state of the currently selected file in the file explorer?",
    options: [
      "useEffect",
      "useState",
      "useContext",
      "useReducer"
    ],
    correctAnswer: 1,
    explanation: "useState is the correct choice as we need to manage a simple state value that represents the currently selected file."
  },
  {
    id: 2,
    text: "In the project's database schema, what type of relationship exists between the profiles and projects tables?",
    options: [
      "Many-to-Many",
      "One-to-One",
      "One-to-Many",
      "No relationship"
    ],
    correctAnswer: 2,
    explanation: "The projects table has a user_id foreign key referencing the profiles table, creating a One-to-Many relationship where one profile can have many projects."
  },
  {
    id: 3,
    text: "Which Tailwind CSS class combination would you use to create a flex container with centered items both horizontally and vertically?",
    options: [
      "flex items-center justify-center",
      "grid place-items-center",
      "flex align-middle justify-middle",
      "flex-center items-middle"
    ],
    correctAnswer: 0,
    explanation: "The combination of 'flex items-center justify-center' is the correct way to center items both horizontally and vertically in Tailwind CSS."
  },
  {
    id: 4,
    text: "What is the purpose of Row Level Security (RLS) in the project's database design?",
    options: [
      "To encrypt the database tables",
      "To prevent unauthorized access to specific rows based on user identity",
      "To improve query performance",
      "To validate data before insertion"
    ],
    correctAnswer: 1,
    explanation: "RLS is used to ensure users can only access their own data by adding security policies at the row level based on user identity."
  },
  {
    id: 5,
    text: "Which React pattern is used in the project to conditionally render different content based on the active tab?",
    options: [
      "Higher Order Components",
      "Render Props",
      "Conditional Rendering with ternary operators",
      "Context API"
    ],
    correctAnswer: 2,
    explanation: "The project uses conditional rendering with ternary operators to switch between different content components based on the activeTab state."
  }
];

export default function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [results, setResults] = useState<QuizResult>({
    totalQuestions: mockQuestions.length,
    correctAnswers: 0,
    incorrectAnswers: 0,
    score: 0
  });

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answerIndex);
      setShowExplanation(true);

      if (answerIndex === mockQuestions[currentQuestion].correctAnswer) {
        setResults(prev => ({
          ...prev,
          correctAnswers: prev.correctAnswers + 1,
          score: ((prev.correctAnswers + 1) / prev.totalQuestions) * 100
        }));
      } else {
        setResults(prev => ({
          ...prev,
          incorrectAnswers: prev.incorrectAnswers + 1,
          score: (prev.correctAnswers / prev.totalQuestions) * 100
        }));
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizCompleted(false);
    setResults({
      totalQuestions: mockQuestions.length,
      correctAnswers: 0,
      incorrectAnswers: 0,
      score: 0
    });
  };

  if (quizCompleted) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#1a1f2e] rounded-lg p-8 text-center">
          <Award className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">Assessment Complete!</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#0A0C10] p-4 rounded-lg">
              <div className="text-3xl font-bold text-blue-400">{results.correctAnswers}</div>
              <div className="text-sm text-gray-400">Correct Answers</div>
            </div>
            <div className="bg-[#0A0C10] p-4 rounded-lg">
              <div className="text-3xl font-bold text-red-400">{results.incorrectAnswers}</div>
              <div className="text-sm text-gray-400">Incorrect Answers</div>
            </div>
            <div className="bg-[#0A0C10] p-4 rounded-lg">
              <div className="text-3xl font-bold text-green-400">{Math.round(results.score)}%</div>
              <div className="text-sm text-gray-400">Final Score</div>
            </div>
          </div>
          <button
            onClick={resetQuiz}
            className="flex items-center justify-center space-x-2 mx-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <RefreshCcw size={20} />
            <span>Retake Assessment</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Progress */}
      <div className="bg-[#1a1f2e] rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Question {currentQuestion + 1} of {mockQuestions.length}</span>
          <span className="text-sm text-gray-400">Score: {Math.round(results.score)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((currentQuestion + 1) / mockQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-[#1a1f2e] rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Brain className="text-blue-400" size={24} />
          <h3 className="text-xl font-medium">Technical Assessment</h3>
        </div>
        
        <p className="text-lg mb-6">{mockQuestions[currentQuestion].text}</p>

        <div className="space-y-3">
          {mockQuestions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
              className={`w-full p-4 rounded-lg text-left transition-colors ${
                selectedAnswer === null
                  ? 'bg-[#0A0C10] hover:bg-gray-800'
                  : selectedAnswer === index
                    ? index === mockQuestions[currentQuestion].correctAnswer
                      ? 'bg-green-900/20 border border-green-500'
                      : 'bg-red-900/20 border border-red-500'
                    : index === mockQuestions[currentQuestion].correctAnswer
                      ? 'bg-green-900/20 border border-green-500'
                      : 'bg-[#0A0C10]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {selectedAnswer !== null && (
                  index === mockQuestions[currentQuestion].correctAnswer ? (
                    <CheckCircle2 className="text-green-500" size={20} />
                  ) : selectedAnswer === index ? (
                    <XCircle className="text-red-500" size={20} />
                  ) : (
                    <HelpCircle className="text-gray-500" size={20} />
                  )
                )}
              </div>
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500 rounded-lg">
            <p className="text-gray-300">{mockQuestions[currentQuestion].explanation}</p>
          </div>
        )}

        {selectedAnswer !== null && (
          <button
            onClick={handleNextQuestion}
            className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            {currentQuestion < mockQuestions.length - 1 ? 'Next Question' : 'Complete Assessment'}
          </button>
        )}
      </div>
    </div>
  );
}