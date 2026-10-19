import { getQuestions } from "@/lib/questions/loadQuestions";
import QuestionCard from "@/components/questions/QuestionCard";

export default function PracticePage() {
  const questions = getQuestions();

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold">
        Practice Mode
      </h1>

      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
        />
      ))}
    </main>
  );
}
