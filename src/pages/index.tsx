import { useState } from "react";
import BotsPage from "@/components/bot";

import Navbar from "@/components/Navbar";
import { LogsView } from "@/components/LogView";

export default function Home() {
  const [activeView, setActiveView] = useState("bots");

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar activeView={activeView} setActiveView={setActiveView} />

      <main className="p-6">
        {activeView === "bots" && <BotsPage />}
        {activeView === "logs" && <LogsView />}
      </main>
    </div>
  );
}
