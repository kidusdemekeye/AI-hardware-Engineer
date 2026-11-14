"use client";

import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState<"input" | "questions" | "design">("input");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">AI Hardware Engineer</h1>
          <p className="text-slate-300">
            Describe your project. Get a complete engineering specification.
          </p>
        </div>

        {error && (
          <div className="bg-red-900 border border-red-700 rounded-lg p-4 mb-6 text-red-100">
            <p>{error}</p>
          </div>
        )}

        {step === "input" && (
          <div className="bg-slate-700 rounded-lg p-8">
            <p className="text-slate-400">Upload form component will go here</p>
          </div>
        )}

        {step === "questions" && (
          <div className="bg-slate-700 rounded-lg p-8">
            <p className="text-slate-400">Questions component will go here</p>
          </div>
        )}

        {step === "design" && (
          <div className="bg-slate-700 rounded-lg p-8">
            <p className="text-slate-400">Design display component will go here</p>
          </div>
        )}

        {loading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-slate-700 rounded-lg p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p>Loading...</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
