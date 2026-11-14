"use client";

import { useState } from "react";
import { Design } from "@/lib/types";
import { PartsList } from "./PartsList";
import { WiringDiagram } from "./WiringDiagram";
import { AssemblySteps } from "./AssemblySteps";
import { CADViewer } from "./CADViewer";

interface DesignDisplayProps {
  design: Design;
}

export function DesignDisplay({ design }: DesignDisplayProps) {
  const [activeTab, setActiveTab] = useState<
    "parts" | "cad" | "wiring" | "assembly"
  >("parts");

  const tabs = [
    { id: "parts", label: "Parts List", icon: "📦" },
    { id: "cad", label: "CAD", icon: "🎨" },
    { id: "wiring", label: "Wiring", icon: "⚡" },
    { id: "assembly", label: "Assembly", icon: "🔧" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-1">{design.projectName}</h2>
        <p className="text-slate-400">{design.description}</p>
        <p className="text-xs text-slate-500 mt-2">
          Generated: {new Date(design.generatedAt).toLocaleString()}
        </p>
      </div>

      <div className="flex gap-2 border-b border-slate-600 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 whitespace-nowrap transition ${
              activeTab === tab.id
                ? "border-b-2 border-blue-500 text-white"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-slate-600/30 rounded-lg p-6">
        {activeTab === "parts" && <PartsList parts={design.parts} />}
        {activeTab === "cad" && <CADViewer code={design.openScadCode} />}
        {activeTab === "wiring" && (
          <WiringDiagram
            wiringPlan={design.wiringPlan}
            wiringCode={design.wiringCode}
          />
        )}
        {activeTab === "assembly" && (
          <AssemblySteps steps={design.assemblySteps} />
        )}
      </div>
    </div>
  );
}
