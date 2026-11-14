"use client";

interface WiringDiagramProps {
  wiringPlan: string;
  wiringCode?: string;
}

export function WiringDiagram({ wiringPlan, wiringCode }: WiringDiagramProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const downloadCode = () => {
    const ext = wiringCode?.includes("def ") ? ".py" : ".ino";
    const blob = new Blob([wiringCode!], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wiring-code${ext}`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-bold">Wiring Diagram</h3>
          <button
            onClick={() => copyToClipboard(wiringPlan)}
            className="px-3 py-1 bg-slate-600 hover:bg-slate-500 rounded text-xs"
          >
            Copy
          </button>
        </div>
        <pre className="bg-slate-700 p-4 rounded overflow-auto text-xs whitespace-pre-wrap break-words max-h-96 border border-slate-600">
          {wiringPlan}
        </pre>
      </div>

      {wiringCode && (
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-bold">Code</h3>
            <div className="flex gap-2">
              <button
                onClick={() => copyToClipboard(wiringCode)}
                className="px-3 py-1 bg-slate-600 hover:bg-slate-500 rounded text-xs"
              >
                Copy
              </button>
              <button
                onClick={downloadCode}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs"
              >
                Download
              </button>
            </div>
          </div>
          <pre className="bg-slate-700 p-4 rounded overflow-auto text-xs whitespace-pre-wrap break-words max-h-96 border border-slate-600">
            {wiringCode}
          </pre>
        </div>
      )}
    </div>
  );
}
