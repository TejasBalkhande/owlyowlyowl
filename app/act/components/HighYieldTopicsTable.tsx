// components/HighYieldTopicsTable.tsx

import { HighYieldRow } from "../lib/highYieldTopics";

interface Props {
  title: string;
  data: HighYieldRow[];
}

export default function HighYieldTopicsTable({ title, data }: Props) {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold font-sans mb-3">{title}</h3>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-300">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="px-6 py-3 text-sm font-semibold border-b sticky top-0 bg-gray-100">Category</th>
              <th className="px-6 py-3 text-sm font-semibold border-b sticky top-0 bg-gray-100 whitespace-nowrap">Weight</th>
              <th className="px-6 py-3 text-sm font-semibold border-b sticky top-0 bg-gray-100">Difficulty</th>
              <th className="px-6 py-3 text-sm font-semibold border-b sticky top-0 bg-gray-100">Key Skills / Topics</th>
              <th className="px-6 py-3 text-sm font-semibold border-b sticky top-0 bg-gray-100">Why High‑Yield</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {data.map((item, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-white border-b" : "bg-gray-50 border-b"}>
                <td className="px-6 py-4">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.weight}</td>
                <td className="px-6 py-4">{item.difficulty}</td>
                <td className="px-6 py-4">{item.skills}</td>
                <td className="px-6 py-4">{item.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {data.map((item, idx) => (
          <article key={idx} className="border border-gray-300 rounded-lg p-4 bg-white">
            <div className="flex items-start justify-between mb-1">
              <h4 className="text-sm font-semibold text-gray-900">{item.category}</h4>
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{item.difficulty}</span>
            </div>
            <p className="text-xs text-gray-500 mb-1">Weight: {item.weight}</p>
            <p className="text-xs text-gray-600 mt-2">
              <span className="font-medium">Skills:</span> {item.skills}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              <span className="font-medium">Why:</span> {item.why}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}