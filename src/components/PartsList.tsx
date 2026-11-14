"use client";

import { Part } from "@/lib/types";

interface PartsListProps {
  parts: Part[];
}

export function PartsList({ parts }: PartsListProps) {
  const totalPrice = parts.reduce((sum, p) => sum + p.price * p.quantity, 0);

  const downloadCSV = () => {
    const headers = ["ID", "Name", "Qty", "Supplier", "Price", "Link", "Notes"];
    const rows = parts.map((p) => [
      p.id,
      p.name,
      p.quantity,
      p.supplier,
      p.price,
      p.link,
      p.notes,
    ]);
    const csv = [
      headers.join(","),
      ...rows.map((r) => r.map((v) => `"${v}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "parts-list.csv";
    a.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Parts ({parts.length})</h3>
        <button
          onClick={downloadCSV}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm"
        >
          Download CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-500">
            <tr>
              <th className="text-left p-2">ID</th>
              <th className="text-left p-2">Name</th>
              <th className="text-center p-2">Qty</th>
              <th className="text-left p-2">Supplier</th>
              <th className="text-right p-2">Price</th>
              <th className="text-left p-2">Link</th>
              <th className="text-left p-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {parts.map((part) => (
              <tr key={part.id} className="border-b border-slate-700 hover:bg-slate-500/20">
                <td className="p-2 text-xs font-mono">{part.id}</td>
                <td className="p-2 font-semibold">{part.name}</td>
                <td className="p-2 text-center">{part.quantity}</td>
                <td className="p-2 text-sm">{part.supplier}</td>
                <td className="p-2 text-right font-semibold">
                  ${(part.price * part.quantity).toFixed(2)}
                </td>
                <td className="p-2">
                  {part.link && (
                    <a
                      href={part.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline text-xs"
                    >
                      View →
                    </a>
                  )}
                </td>
                <td className="p-2 text-xs text-slate-400">{part.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-right font-bold text-lg pt-4 border-t border-slate-600">
        Total: ${totalPrice.toFixed(2)}
      </div>
    </div>
  );
}
