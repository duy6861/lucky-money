// client/src/pages/UserPage.jsx
import { useState, useEffect } from "react";
import DrawForm from "../components/DrawForm";
import ResultModal from "../components/ResultModal";

export default function UserPage() {
  const [hasDrawn, setHasDrawn] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const drawn = localStorage.getItem("hasDrawn");
    if (drawn === "true") {
      setHasDrawn(true);
    }
  }, []);

  const handleDrawSuccess = (data) => {
    setResult(data);
    setHasDrawn(true);
    localStorage.setItem("hasDrawn", "true");
  };

  const handleCloseResult = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-yellow-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-3">
          🧧 LÌ XÌ CỦA CHEE – AI CŨNG CÓ PHẦN!
        </h1>
        <p className="text-gray-700 max-w-md mx-auto">
          Không phải mơ đâu — tiền thật, số đẹp, may mắn tràn trề! Hãy nhập tên và bốc ngay một phong lì
        </p>
      </div>

      {!hasDrawn ? (
        <DrawForm onDrawSuccess={handleDrawSuccess} />
      ) : (
        <div className="text-center max-w-md">
          <div className="text-2xl text-green-600 font-bold mb-4">
            🎉 Bạn đã bốc lì xì rồi!
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
          >
            Làm mới trang
          </button>
        </div>
      )}

      {result && <ResultModal {...result} onClose={handleCloseResult} />}
    </div>
  );
}
