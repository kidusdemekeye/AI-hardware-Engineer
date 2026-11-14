"use client";

import { useState, useEffect } from "react";
import { UploadForm } from "@/components/UploadForm";
import { QuestionsList } from "@/components/QuestionsList";
import { DesignDisplay } from "@/components/DesignDisplay";
import { Question, Design } from "@/lib/types";

export default function Home() {
  const [step, setStep] = useState<"input" | "questions" | "design">("input");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [imageBase64s, setImageBase64s] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [design, setDesign] = useState<Design | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("hw_design");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setDesign(parsed);
        setStep("design");
      } catch (e) {
        localStorage.removeItem("hw_design");
      }
    }
  }, []);

  const handleUploadSubmit = async (desc: string, images: string[]) => {
    setError(null);
    setLoading(true);
    setDescription(desc);
    setImageBase64s(images);

    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: desc, imageBase64s: images }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      setQuestions(data.data.questions);
      setStep("questions");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate questions"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSubmit = async (answers: Record<string, string>) => {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          questions,
          answers,
          imageBase64s,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      localStorage.setItem("hw_design", JSON.stringify(data.data.design));
      setDesign(data.data.design);
      setStep("design");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate design");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-2xl w-full">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">AI Hardware Engineer</h1>
          <p className="text-slate-300">
            Describe your project. Get a complete engineering specification.
          </p>
        </div>

        {error && (
          <div className="bg-red-900 border border-red-700 rounded-lg p-4 mb-6 text-red-100">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {step === "input" && (
          <div className="bg-slate-700/50 backdrop-blur border border-slate-600 rounded-lg p-8">
            <UploadForm onSubmit={handleUploadSubmit} loading={loading} />
          </div>
        )}

        {step === "questions" && (
          <div className="bg-slate-700/50 backdrop-blur border border-slate-600 rounded-lg p-8">
            <QuestionsList
              questions={questions}
              onAnswer={handleAnswerSubmit}
              submitting={loading}
            />
          </div>
        )}

        {step === "design" && design && (
          <div className="bg-slate-700/50 backdrop-blur border border-slate-600 rounded-lg p-8">
            <DesignDisplay design={design} />
          </div>
        )}
      </div>
    </main>
  );
}
