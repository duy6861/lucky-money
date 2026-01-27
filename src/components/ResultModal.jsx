// client/src/components/ResultModal.jsx
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';

export default function ResultModal({ amount, name, message, onClose }) {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Định dạng số tiền có dấu chấm
  const formatAmount = (num) => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={500} />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl p-8 text-center max-w-sm mx-4 relative z-10"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Chúc Mừng {name}!</h2>

        {/* Hiển thị lời chúc tùy chỉnh */}
        <p className="text-gray-600 mb-4 italic">“{message}”</p>

        <div className="text-4xl font-bold text-red-600 mb-6">
          {formatAmount(amount)} ₫
        </div>

        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
        >
          Đóng
        </button>
      </motion.div>
    </div>
  );
}