type NavbarProps = {
  activeView: string;
  setActiveView: (view: string) => void;
};

const Navbar = ({ activeView, setActiveView }: NavbarProps) => {
  return (
    <div className="bg-gray-600 p-4 flex justify-between items-center text-white">
      <h1 className="text-xl font-bold">OPENMIC AGENT FLOW</h1>
      <div className="space-x-4">
        <button
          onClick={() => setActiveView("bots")}
          className={`px-4 py-2 rounded ${
            activeView === "bots" ? "bg-blue-500" : "bg-gray-700"
          }`}
        >
          BOTS
        </button>
        <button
          onClick={() => setActiveView("logs")}
          className={`px-4 py-2 rounded ${
            activeView === "logs" ? "bg-blue-500" : "bg-gray-700"
          }`}
        >
          LOGS
        </button>
      </div>
    </div>
  );
};

export default Navbar;
