"use client";

import { useState } from "react";
import { Question } from "@/lib/types";

interface QuestionsListProps {
  questions: Question[];
  onAnswer: (answers: Record<string, string>) => void;
  submitting: boolean;
}

export function QuestionsList({
  questions,
  onAnswer,
  submitting,
}: QuestionsListProps) {
  const [answers, setAnswers] = useState<Record<string, string>>(
    Object.fromEntries(questions.map((q) => [q.id, ""]))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnswer(answers);
  };

  const allAnswered = Object.values(answers).every((a) => a.trim());

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Answer a few questions</h2>
        <p className="text-slate-300">
          Help us understand your project better
        </p>
      </div>

      {questions.map((question, idx) => (
        <div key={question.id} className="bg-slate-600 p-6 rounded-lg">
          <label className="block text-sm font-semibold mb-3">
            {idx + 1}. {question.question}
          </label>
          {question.hint && (
            <p className="text-xs text-slate-400 mb-3 italic">
              Hint: {question.hint}
            </p>
          )}
          <input
            type="text"
            value={answers[question.id] || ""}
            onChange={(e) =>
              setAnswers({ ...answers, [question.id]: e.target.value })
            }
            placeholder="Your answer..."
            className="w-full p-3 bg-slate-500 border border-slate-400 rounded text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={submitting}
          />
        </div>
      ))}

      <button
        type="submit"
        disabled={submitting || !allAnswered}
        className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-slate-600 text-white font-semibold rounded-lg transition"
      >
        {submitting ? "Generating design..." : "Generate Design"}
      </button>
    </form>
  );
}
