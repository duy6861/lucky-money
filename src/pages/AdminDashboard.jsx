// client/src/pages/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../utils/api';

export default function AdminDashboard() {
  const [summary, setSummary] = useState({ total: 0, totalAmount: 0 });
  const [draws, setDraws] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Kiểm tra token khi vào
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [summaryRes, drawsRes] = await Promise.all([
        adminApi.getSummary(),
        adminApi.getAllDraws()
      ]);
      setSummary(summaryRes.data);
      setDraws(drawsRes.data);
    } catch (err) {
      // Nếu lỗi 401 → token hết hạn hoặc sai
      if (err.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      } else {
        alert('Lỗi tải dữ liệu');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Tên', 'Số tiền (VND)', 'IP', 'Thời gian'],
      ...draws.map(item => [
        item.name,
        item.amount,
        item.ip,
        new Date(item.createdAt).toLocaleString('vi-VN')
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lich-su-li-xi.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">📊 Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Đăng xuất
          </button>
        </div>

        {/* Tổng kết */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-600">Tổng lượt bốc</p>
            <p className="text-3xl font-bold text-blue-600">{summary.total}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-600">Tổng tiền đã phát</p>
            <p className="text-3xl font-bold text-green-600">
              {new Intl.NumberFormat('vi-VN').format(summary.totalAmount)} ₫
            </p>
          </div>
        </div>

        {/* Danh sách */}
        <div className="bg-white rounded shadow overflow-hidden">
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="font-bold">Danh sách lượt bốc</h2>
            <button
              onClick={exportToCSV}
              className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
            >
              Xuất CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Tên</th>
                  <th className="px-4 py-2 text-right">Số tiền</th>
                  <th className="px-4 py-2 text-left">IP</th>
                  <th className="px-4 py-2 text-left">Thời gian</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {draws.map((item) => (
                  <tr key={item._id}>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2 text-right">
                      {new Intl.NumberFormat('vi-VN').format(item.amount)} ₫
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">{item.ip}</td>
                    <td className="px-4 py-2 text-sm">
                      {new Date(item.createdAt).toLocaleString('vi-VN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}