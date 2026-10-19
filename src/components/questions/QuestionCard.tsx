"use client";

import { useState } from "react";

type QuestionProps = {
  question: {
    id: string;
    question: string;
    answers: string[];
    correctAnswer: string;
    explanation: string;
  };
};

export default function QuestionCard({
  question,
}: QuestionProps) {
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = selected === question.correctAnswer;

  return (
    <div>
      <h2>{question.question}</h2>

      {question.answers.map((answer) => (
        <div key={answer}>
          <label>
            <input
              type="radio"
              name={question.id}
              value={answer}
              onChange={(e) => setSelected(e.target.value)}
              disabled={submitted}
            />
            {answer}
          </label>
        </div>
      ))}

      <button
        onClick={() => setSubmitted(true)}
        disabled={!selected || submitted}
      >
        Submit Answer
      </button>

      {submitted && (
        <div>
          <p>
            {isCorrect ? "Correct" : "Incorrect"}
          </p>

          <p>
            Correct Answer: {question.correctAnswer}
          </p>

          <p>
            Explanation: {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
