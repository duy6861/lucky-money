// client/src/components/DrawForm.jsx
import { useState, useEffect } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { drawApi } from '../utils/api'; // ←←← THÊM DÒNG NÀY
export default function DrawForm({ onDrawSuccess }) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deviceId, setDeviceId] = useState(null);

  // Lấy deviceId khi component mount
  useEffect(() => {
    const getDeviceId = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setDeviceId(result.visitorId); // visitorId là chuỗi hash duy nhất
    };
    getDeviceId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !deviceId) {
      setError('Đang xác minh thiết bị...');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Gửi cả name + deviceId lên backend
      const res = await drawApi.draw({ name, deviceId });
      onDrawSuccess(res.data);
    } catch (err) {
      const msg = err.response?.data?.error || 'Lỗi kết nối!';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên của bạn..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition disabled:opacity-70"
        >
          {loading ? 'Đang bốc lì xì...' : '🧧 Bốc Lì Xì Ngay!'}
        </button>
      </form>
    </div>
  );
}