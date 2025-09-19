import { Bot } from "@/lib/type";
import { useState, useEffect } from "react";

export default function BotsPage() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");

  async function fetchBots() {
    setLoading(true);
    const res = await fetch("/api/openmic/bots");
    const data = await res.json();
    
    if(data){
    setBots(data.bots);
    setLoading(false);
    }else{
      setBots([]);
      alert("Not able fetch the bots")
    }
  }

  // Create new bot
  async function createBot() {
    if (!name || !prompt) return alert("Please fill in both fields");
    await fetch("/api/openmic/bots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        prompt,
        voice: "alloy",
      }),
    });
    setName("");
    setPrompt("");
    fetchBots();
  }

  async function deleteBot(bot_uid: string) {
    await fetch(`/api/openmic/bots?bot_uid=${bot_uid}`, {
      method: "DELETE",
    });
    fetchBots();
  }

  useEffect(() => {
    fetchBots();
  }, []);

  return (
    <div id="bots" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Bot Management
        </h1>

        {/* Create Bot Form */}
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Create Bot</h2>
          <input
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Bot Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Prompt"
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            onClick={createBot}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create Bot
          </button>
        </div>

        {/* Bots List */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Existing Bots
          </h2>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : bots.length === 0 ? (
            <p className="text-gray-500">No bots found.</p>
          ) : (
            <ul className="space-y-3">
              {bots.map((b: any) => (
                <li
                  key={b.uid}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-800">{b.name}</p>
                    <p className="text-sm text-gray-500">UID: {b.uid}</p>
                  </div>
                  <button
                    onClick={() => deleteBot(b.uid)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
