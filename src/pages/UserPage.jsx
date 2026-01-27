// client/src/pages/UserPage.jsx
import { useState, useEffect } from 'react';
import DrawForm from '../components/DrawForm';
import ResultModal from '../components/ResultModal';

export default function UserPage() {
  const [hasDrawn, setHasDrawn] = useState(false);
  const [result, setResult] = useState(null);

  // Kiểm tra localStorage khi load
  useEffect(() => {
    const drawn = localStorage.getItem('hasDrawn');
    if (drawn === 'true') {
      // setHasDrawn(true);
      // (Tuỳ chọn) Hiển thị lại kết quả cũ nếu muốn
    }
  }, []);

  const handleDrawSuccess = (data) => {
    setResult(data);
    setHasDrawn(true);
    localStorage.setItem('hasDrawn', 'true');
  };

  const handleCloseResult = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-yellow-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-2">🧧 LÌ XÌ MAY MẮN</h1>
        <p className="text-gray-600">Mỗi người chỉ được bốc 1 lần!</p>
      </div>

      {!hasDrawn ? (
        <DrawForm onDrawSuccess={handleDrawSuccess} />
      ) : (
        <div className="text-center max-w-md">
          <div className="text-2xl text-green-600 font-bold mb-4">🎉 Bạn đã bốc lì xì rồi!</div>
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