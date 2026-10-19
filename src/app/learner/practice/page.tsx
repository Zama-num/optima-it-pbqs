"use client";

import { useState } from "react";
import { getQuestions } from "@/lib/questions/loadQuestions";

export default function PracticePage() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSize, setQuizSize] = useState(25);
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([]);
  const [domainScores, setDomainScores] = useState<Record<string, { correct: number; total: number }>>({});

  const startQuiz = () => {
    const filteredQuestions =
      selectedDomain === "all"
        ? getQuestions()
        : getQuestions().filter(
            (q) => q.domain === selectedDomain
          );
    const selectedQuestions = [...filteredQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, quizSize);

    setQuestions(selectedQuestions);
    setCurrentQuestion(0);
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setQuizStarted(true);
  };

  if (!quizStarted) {
    return (
      <main className="p-8">
        <h1 className="text-4xl font-bold">
          Practice Mode
        </h1>

        <div className="mt-6">
          <label className="block mb-2">
            Select Quiz Size
          </label>

          <select
            className="border p-2"
            value={quizSize}
            onChange={(e) =>
              setQuizSize(Number(e.target.value))
            }
          >
            <option value={10}>10 Questions</option>
            <option value={25}>25 Questions</option>
            <option value={50}>50 Questions</option>
            <option value={80}>80 Questions</option>
          </select>

        <div className="mt-4">
          <label className="block mb-2">
            Select Domain
          </label>

          <select
            className="border p-2"
            value={selectedDomain}
            onChange={(e) =>
              setSelectedDomain(e.target.value)
            }
          >
            <option value="all">All Domains</option>
            <option value="General Security Concepts">Domain 1</option>
            <option value="Threats, Vulnerabilities and Mitigations">Domain 2</option>
            <option value="Security Architecture">Domain 3</option>
            <option value="Security Operations">Domain 4</option>
            <option value="Security Program Management and Oversight">Domain 5</option>
          </select>
        </div>
        </div>

        <button
          className="mt-4 border px-4 py-2"
          onClick={startQuiz}
        >
          Start Quiz
        </button>
      </main>
    );
  }

  const question = questions[currentQuestion];
  const selected = answers[currentQuestion] || "";

  const isCorrect =
    selected === question.correctAnswer;

  const handleSubmit = () => {
    setSubmitted(true);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setSubmitted(false);
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const toggleFlag = () => {
    if (flaggedQuestions.includes(currentQuestion)) {
      setFlaggedQuestions(flaggedQuestions.filter((q) => q !== currentQuestion));
    } else {
      setFlaggedQuestions([...flaggedQuestions, currentQuestion]);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setSubmitted(false);
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold">
        Practice Mode
      </h1>

      <div className="mt-4">
        <p>
          Question {currentQuestion + 1} of {questions.length}
        </p>

        <p>
          Score: {score}

        <p>
          Flagged: {flaggedQuestions.length}
        </p>
        </p>
      </div>

      <div className="mt-6 border rounded p-6">
        <h2 className="text-xl font-bold">
          {question.question}

        <button
          className="mt-3 border px-3 py-1 bg-yellow-100"
          onClick={toggleFlag}
        >
          {flaggedQuestions.includes(currentQuestion)
            ? "🚩 Unflag Question"
            : "🚩 Flag For Review"}
        </button>
        </h2>

        <div className="mt-4">
          {question.answers.map((answer: string) => (
            <label
              key={answer}
              className="block mb-2"
            >
              <input
                type="radio"
                value={answer}
                checked={selected === answer}
                disabled={submitted}
                onChange={(e) =>
                  setAnswers({
                    ...answers,
                    [currentQuestion]: e.target.value,
                  })
                }
              />

              <span className="ml-2">
                {answer}
              </span>
            </label>
          ))}
        </div>

        {!submitted && (
          <button
            className="mt-4 border px-4 py-2"
            disabled={!selected}
            onClick={handleSubmit}
          >
            Submit Answer
          </button>
        )}

        {submitted && (
          <div className="mt-4">
            <p>
              {isCorrect
                ? "✅ Correct"
                : "❌ Incorrect"}
            </p>

            <p className="mt-2">
              Correct Answer: {question.correctAnswer}
            </p>

            <p className="mt-2">
              Explanation: {question.explanation}
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-between">
          {currentQuestion > 0 && (
            <button
              className="border px-4 py-2"
              onClick={handlePrevious}
            >
              Previous Question
            </button>
          )}

          {currentQuestion < questions.length - 1 && (
            <button
              className="border px-4 py-2"
              onClick={handleNext}
            >
              Next Question
            </button>
          )}
        </div>

        {currentQuestion === questions.length - 1 && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold">
              Quiz Complete
            </h2>

            <p>
              Final Score: {score} / {questions.length}

        <p>
          Flagged: {flaggedQuestions.length}
        </p>
            </p>

            <p>
              Percentage: {Math.round(
                (score / questions.length) * 100
              )}%
            </p>

            <p>
              Status: {Math.round(
                (score / questions.length) * 100
              ) >= 85
                ? "PASS"
                : "FAIL"}
            </p>

            <p>
              Pass Mark: 85%
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
