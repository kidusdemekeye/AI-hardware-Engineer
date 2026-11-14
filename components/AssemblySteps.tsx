"use client";

import { useState } from "react";

interface AssemblyStepsProps {
  steps: string[];
}

export function AssemblySteps({ steps }: AssemblyStepsProps) {
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  const toggleStep = (idx: number) => {
    const newCompleted = new Set(completed);
    if (newCompleted.has(idx)) {
      newCompleted.delete(idx);
    } else {
      newCompleted.add(idx);
    }
    setCompleted(newCompleted);
  };

  const progress = (completed.size / steps.length) * 100;

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold">Assembly Instructions</h3>
          <span className="text-sm text-slate-400">
            {completed.size} / {steps.length}
          </span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg border transition ${
              completed.has(idx)
                ? "bg-slate-500/20 border-green-500"
                : "bg-slate-600/20 border-slate-600"
            }`}
          >
            <label className="flex gap-3 cursor-pointer items-start">
              <input
                type="checkbox"
                checked={completed.has(idx)}
                onChange={() => toggleStep(idx)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className={completed.has(idx) ? "line-through opacity-70" : ""}>
                  <span className="font-semibold mr-2">Step {idx + 1}:</span>
                  {step}
                </div>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
