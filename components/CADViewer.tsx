"use client";

interface CADViewerProps {
  code: string;
}

export function CADViewer({ code }: CADViewerProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    alert("OpenSCAD code copied!");
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "design.scad";
    a.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">OpenSCAD Code</h3>
        <div className="flex gap-2">
          <button
            onClick={copyToClipboard}
            className="px-3 py-1 bg-slate-600 hover:bg-slate-500 rounded text-xs"
          >
            Copy
          </button>
          <button
            onClick={downloadCode}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs"
          >
            Download .scad
          </button>
        </div>
      </div>

      <div className="bg-slate-700 p-4 rounded border border-slate-600 overflow-auto max-h-96">
        <pre className="text-xs whitespace-pre-wrap break-words font-mono">
          {code}
        </pre>
      </div>

      <p className="text-xs text-slate-400">
        💡 Use this code in{" "}
        <a
          href="https://openscad.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          OpenSCAD
        </a>{" "}
        to preview and export as STL
      </p>
    </div>
  );
}
