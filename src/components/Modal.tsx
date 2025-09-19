type ModalProps = {
  title: string;
  content: string | [string, string][];
  onClose: () => void;
};

export const Modal = ({ title, content, onClose }: ModalProps) => {
  const renderContent = () => {
    if (typeof content === "string") {
      return (
        <pre className="bg-gray-200 p-4 rounded-md max-h-[400px] overflow-y-auto text-sm whitespace-pre-wrap">
          {content}
        </pre>
      );
    }


    return (
      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {content.map(([speaker, message], idx) => (
          <div
            key={idx}
            className={`p-2 rounded-md ${
              speaker === "assistant"
                ? "bg-blue-50 text-blue-800"
                : "bg-green-50 text-green-800"
            }`}
          >
            <strong className="capitalize">{speaker || "Unknown"}:</strong>{" "}
            {message}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-gray-200 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        {renderContent()}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-red-600 text-gray-200 px-3 py-1 rounded-md hover:bg-red-700 transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
