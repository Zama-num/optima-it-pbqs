"use client";

import { useState } from "react";
import { getQuestions } from "@/lib/questions/loadQuestions";

export default function PracticePage() {
  const questions = getQuestions();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const question = questions[currentQuestion];

  const isCorrect =
    selected === question.correctAnswer;

  const handleSubmit = () => {
    setSubmitted(true);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelected("");
    setSubmitted(false);
    setCurrentQuestion((prev) => prev + 1);
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
        </p>
      </div>

      <div className="mt-6 border rounded p-6">
        <h2 className="text-xl font-bold">
          {question.question}
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
                  setSelected(e.target.value)
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

            {currentQuestion < questions.length - 1 ? (
              <button
                className="mt-4 border px-4 py-2"
                onClick={handleNext}
              >
                Next Question
              </button>
            ) : (
              <div className="mt-4">
                <h2 className="text-2xl font-bold">
                  Quiz Complete
                </h2>

                <p>
                  Final Score: {score} / {questions.length}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
