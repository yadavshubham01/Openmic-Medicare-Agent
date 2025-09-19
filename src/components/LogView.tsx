import { useEffect, useState } from "react";
import { CallEntry } from "@/lib/type";
import { Modal }from "./Modal";

export const LogsView = () => {
  const [calls, setCalls] = useState<CallEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedSummary, setSelectedSummary] = useState<string | null>(null);
  const [selectedTranscript, setSelectedTranscript] = useState<[string, string][] | null>(null);

  const LIMIT = 5;

  useEffect(() => {
    fetchLogs();
  }, []);

  async function fetchLogs() {
    setLoading(true);
    const r = await fetch("/api/logs");
    const j = await r.json();
    setCalls(j.calls || []);
    setLoading(false);
  }

  const start = (page - 1) * LIMIT;
  const paginatedLogs = calls.slice(start, start + LIMIT);
  const totalPages = Math.ceil(calls.length / LIMIT);

  return (
    <div className="p-6 font-sans min-h-screen bg-gray-50">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          OpenMic Intake Agent — Medical (Demo)
        </h1>
        <p className="text-gray-600 mt-2">
          This demo exposes pre-call, in-call function, and post-call endpoints
          for OpenMic.
        </p>
      </div>

      {/* Logs Section */}
      <section>
        <div className="flex justify-between pb-2">
          <h2 className="text-xl font-semibold p-2 text-gray-700 items-center">Call Logs</h2>
          <button
            onClick={fetchLogs}
            className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
          >
            Refresh Logs
          </button>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading…</div>
        ) : calls.length === 0 ? (
          <div className="text-center text-gray-500">
            No call logs yet. Trigger a Test Call from OpenMic dashboard.
          </div>
        ) : (
          <div className="space-y-4">
            {paginatedLogs.map((c, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div><strong>Time:</strong> {c.time ||c.receivedAt }</div>
                    <div><strong>Type:</strong> {c.type ||c.event}</div>
                  </div>
                  <div className="flex justify-end gap-3">
                    {c.summary && (
                      <button
                        onClick={() => setSelectedSummary(c.summary ?? null)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                      >
                        View Summary
                      </button>
                    )}
                    {c.transcript && (
                      <button
                        onClick={() => setSelectedTranscript(c.transcript ?? null)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                      >
                        View Transcript
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Pagination */}
      {calls.length > 0 && (
        <div className="flex justify-center items-center mt-6 gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className={`px-4 py-2 rounded-md ${
              page === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-700 text-white hover:bg-gray-800"
            }`}
          >
            Prev
          </button>
          <span className="text-gray-700 font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className={`px-4 py-2 rounded-md ${
              page === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-700 text-white hover:bg-gray-800"
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Summary Modal */}
      {selectedSummary && (
        <Modal title="Summary" onClose={() => setSelectedSummary(null)} content={selectedSummary} />
      )}

      {/* Transcript Modal */}
      {selectedTranscript && (
        <Modal title="Transcript" onClose={() => setSelectedTranscript(null)} content={selectedTranscript} />
      )}
    </div>
  );
};