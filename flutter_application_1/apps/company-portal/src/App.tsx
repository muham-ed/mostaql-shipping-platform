import React, { useState } from 'react';

interface CompanyShipment {
  id: string;
  trackingNumber: string;
  recipientName: string;
  recipientPhone: string;
  cityName: string;
  codAmount: number;
  status: string;
  createdAt: string;
}

export default function App() {
  const [shipments, setShipments] = useState<CompanyShipment[]>([
    {
      id: 'shp_201',
      trackingNumber: 'TRK-551091',
      recipientName: 'أحمد القحطاني',
      recipientPhone: '+966501234567',
      cityName: 'الرياض',
      codAmount: 250.0,
      status: 'قيد التوصيل',
      createdAt: '2025-03-29 10:30',
    },
    {
      id: 'shp_202',
      trackingNumber: 'TRK-551092',
      recipientName: 'سارة الشمري',
      recipientPhone: '+966509876543',
      cityName: 'جدة',
      codAmount: 0.0,
      status: 'تم التسليم',
      createdAt: '2025-03-28 16:15',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [cityName, setCityName] = useState('الرياض');
  const [codAmount, setCodAmount] = useState('0');

  const handleCreateShipment = (e: React.FormEvent) => {
    e.preventDefault();
    const newShp: CompanyShipment = {
      id: `shp_${Date.now()}`,
      trackingNumber: `TRK-${Math.floor(100000 + Math.random() * 900000)}`,
      recipientName,
      recipientPhone,
      cityName,
      codAmount: parseFloat(codAmount) || 0,
      status: 'قيد المعالجة',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setShipments([newShp, ...shipments]);
    setShowModal(false);
    setRecipientName('');
    setRecipientPhone('');
    setCodAmount('0');
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh', direction: 'rtl' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#0f172a', color: '#fff', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 20, color: '#38bdf8' }}>بوابة شركات الشحن | Mostaql Portal</h2>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>شريك الخدمة: أرامكس إكسبريس</span>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}
        >
          + إنشاء شحنة جديدة
        </button>
      </header>

      {/* Main Area */}
      <main style={{ padding: 32, maxWidth: 1200, margin: '0 auto' }}>
        {/* KPI Banner */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 28 }}>
          <div style={{ backgroundColor: '#fff', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b', fontSize: 13 }}>إجمالي الشحنات المرسلة</span>
            <h3 style={{ fontSize: 26, margin: '8px 0 0 0', color: '#0f172a' }}>1,240</h3>
          </div>
          <div style={{ backgroundColor: '#fff', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b', fontSize: 13 }}>نسبة التسليم الموفق</span>
            <h3 style={{ fontSize: 26, margin: '8px 0 0 0', color: '#16a34a' }}>98.6%</h3>
          </div>
          <div style={{ backgroundColor: '#fff', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b', fontSize: 13 }}>رصيد التسويات المستحقة (COD)</span>
            <h3 style={{ fontSize: 26, margin: '8px 0 0 0', color: '#d97706' }}>14,500 ر.س</h3>
          </div>
        </div>

        {/* Shipments List */}
        <div style={{ backgroundColor: '#fff', padding: 24, borderRadius: 12, border: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: 18 }}>شحناتك الأخيرة</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b', fontSize: 13 }}>
                <th style={{ padding: 12 }}>رقم التتبع</th>
                <th style={{ padding: 12 }}>اسم المستلم</th>
                <th style={{ padding: 12 }}>رقم الجوال</th>
                <th style={{ padding: 12 }}>المدينة</th>
                <th style={{ padding: 12 }}>مبلغ التحصيل (COD)</th>
                <th style={{ padding: 12 }}>الحالة</th>
                <th style={{ padding: 12 }}>التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((shp) => (
                <tr key={shp.id} style={{ borderBottom: '1px solid #f1f5f9', fontSize: 14 }}>
                  <td style={{ padding: 12, fontWeight: 700, color: '#2563eb' }}>{shp.trackingNumber}</td>
                  <td style={{ padding: 12 }}>{shp.recipientName}</td>
                  <td style={{ padding: 12 }}>{shp.recipientPhone}</td>
                  <td style={{ padding: 12 }}>{shp.cityName}</td>
                  <td style={{ padding: 12, fontWeight: 600 }}>{shp.codAmount > 0 ? `${shp.codAmount} ر.س` : 'مدفوع'}</td>
                  <td style={{ padding: 12 }}>
                    <span style={{ backgroundColor: '#dbeafe', color: '#1e40af', padding: '4px 10px', borderRadius: 16, fontSize: 12, fontWeight: 700 }}>
                      {shp.status}
                    </span>
                  </td>
                  <td style={{ padding: 12, color: '#64748b' }}>{shp.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <form onSubmit={handleCreateShipment} style={{ backgroundColor: '#fff', width: 450, padding: 28, borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h3 style={{ margin: 0, fontSize: 18 }}>إنشاء شحنة جديدة</h3>

            <div>
              <label style={{ display: 'block', fontSize: 13, marginBottom: 4 }}>اسم المستلم</label>
              <input required value={recipientName} onChange={(e) => setRecipientName(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #cbd5e1' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, marginBottom: 4 }}>رقم جوال المستلم</label>
              <input required value={recipientPhone} onChange={(e) => setRecipientPhone(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #cbd5e1' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, marginBottom: 4 }}>المدينة</label>
              <select value={cityName} onChange={(e) => setCityName(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #cbd5e1' }}>
                <option>الرياض</option>
                <option>جدة</option>
                <option>الدمام</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, marginBottom: 4 }}>مبلغ الدفع عند الاستلام (COD)</label>
              <input type="number" value={codAmount} onChange={(e) => setCodAmount(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #cbd5e1' }} />
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 12 }}>
              <button type="button" onClick={() => setShowModal(false)} style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #cbd5e1', cursor: 'pointer' }}>إلغاء</button>
              <button type="submit" style={{ padding: '8px 20px', borderRadius: 6, backgroundColor: '#2563eb', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}>حفظ وإرسال</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
