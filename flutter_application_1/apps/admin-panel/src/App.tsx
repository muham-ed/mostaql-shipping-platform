import React, { useState } from 'react';

interface Shipment {
  id: string;
  trackingNumber: string;
  companyName: string;
  driverName: string;
  status: 'pending' | 'assigned' | 'picked_up' | 'in_transit' | 'delivered' | 'failed';
  codAmount: number;
  destinationArea: string;
  createdAt: string;
}

const mockShipments: Shipment[] = [
  {
    id: 'shp_101',
    trackingNumber: 'TRK-982341',
    companyName: 'Aramex Express',
    driverName: 'Ahmad Mansour',
    status: 'in_transit',
    codAmount: 180.0,
    destinationArea: 'Riyadh - Al Olaya',
    createdAt: '2025-03-29 09:15',
  },
  {
    id: 'shp_102',
    trackingNumber: 'TRK-982342',
    companyName: 'SMSA Express',
    driverName: 'Khaled Hassan',
    status: 'delivered',
    codAmount: 320.5,
    destinationArea: 'Riyadh - Al Malaz',
    createdAt: '2025-03-29 08:30',
  },
  {
    id: 'shp_103',
    trackingNumber: 'TRK-982343',
    companyName: 'DHL Saudi',
    driverName: 'Unassigned',
    status: 'pending',
    codAmount: 0.0,
    destinationArea: 'Riyadh - An Nakheel',
    createdAt: '2025-03-29 10:00',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'shipments' | 'drivers' | 'cod'>('overview');
  const [shipments] = useState<Shipment[]>(mockShipments);

  const getStatusBadgeColor = (status: Shipment['status']) => {
    switch (status) {
      case 'delivered': return { bg: '#d1fae5', text: '#065f46' };
      case 'in_transit': return { bg: '#dbeafe', text: '#1e40af' };
      case 'pending': return { bg: '#fef3c7', text: '#92400e' };
      case 'failed': return { bg: '#fee2e2', text: '#991b1b' };
      default: return { bg: '#e5e7eb', text: '#374151' };
    }
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', display: 'flex' }}>
      {/* Sidebar */}
      <aside style={{ width: 260, backgroundColor: '#0f172a', color: '#fff', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: '#38bdf8' }}>مستقل للشحن</h2>
          <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>Mostaql Shipping Platform</p>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              textAlign: 'right',
              padding: '12px 16px',
              borderRadius: 8,
              border: 'none',
              backgroundColor: activeTab === 'overview' ? '#1e293b' : 'transparent',
              color: activeTab === 'overview' ? '#38bdf8' : '#cbd5e1',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            📊 نظرة عامة (Overview)
          </button>
          <button
            onClick={() => setActiveTab('shipments')}
            style={{
              textAlign: 'right',
              padding: '12px 16px',
              borderRadius: 8,
              border: 'none',
              backgroundColor: activeTab === 'shipments' ? '#1e293b' : 'transparent',
              color: activeTab === 'shipments' ? '#38bdf8' : '#cbd5e1',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            📦 إدارة الشحنات (Shipments)
          </button>
          <button
            onClick={() => setActiveTab('drivers')}
            style={{
              textAlign: 'right',
              padding: '12px 16px',
              borderRadius: 8,
              border: 'none',
              backgroundColor: activeTab === 'drivers' ? '#1e293b' : 'transparent',
              color: activeTab === 'drivers' ? '#38bdf8' : '#cbd5e1',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            🚚 أداء المناديب (Drivers)
          </button>
          <button
            onClick={() => setActiveTab('cod')}
            style={{
              textAlign: 'right',
              padding: '12px 16px',
              borderRadius: 8,
              border: 'none',
              backgroundColor: activeTab === 'cod' ? '#1e293b' : 'transparent',
              color: activeTab === 'cod' ? '#38bdf8' : '#cbd5e1',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            💵 التحصيل المالي (COD)
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: 32, direction: 'rtl' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', margin: 0 }}>لوحة التحكم والعمليات الحية</h1>
            <p style={{ color: '#64748b', fontSize: 14, marginTop: 4 }}>مراقبة المسارات، المناديب، والتسويات المالية بذكاء اصطناعي</p>
          </div>
          <button style={{ backgroundColor: '#2563eb', color: '#fff', padding: '10px 20px', borderRadius: 8, border: 'none', fontWeight: 600, cursor: 'pointer' }}>
            + استيراد شحنات جديدة
          </button>
        </header>

        {/* KPI Cards */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32 }}>
          <div style={{ backgroundColor: '#fff', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: 13, color: '#64748b' }}>إجمالي الشحنات اليوم</span>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', marginTop: 6 }}>1,482</div>
            <span style={{ fontSize: 12, color: '#16a34a' }}>↑ 12% مقارنة بالأمس</span>
          </div>

          <div style={{ backgroundColor: '#fff', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: 13, color: '#64748b' }}>المناديب النشطون الآن</span>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#2563eb', marginTop: 6 }}>84 مندوب</div>
            <span style={{ fontSize: 12, color: '#64748b' }}>نسبة الالتزام بالمسار: 96.4%</span>
          </div>

          <div style={{ backgroundColor: '#fff', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: 13, color: '#64748b' }}>مبالغ COD المعلقة مع المناديب</span>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#d97706', marginTop: 6 }}>34,250 ر.س</div>
            <span style={{ fontSize: 12, color: '#dc2626' }}>2 مندوب تجاوزوا الحد الأقصى</span>
          </div>

          <div style={{ backgroundColor: '#fff', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: 13, color: '#64748b' }}>معدل نجاح التسليم (ePOD)</span>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#16a34a', marginTop: 6 }}>98.1%</div>
            <span style={{ fontSize: 12, color: '#16a34a' }}>التحقق الجغرافي مفعل 100%</span>
          </div>
        </section>

        {/* Live Shipments Table */}
        <section style={{ backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 16px 0', color: '#0f172a' }}>سجل الشحنات المباشر</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#64748b', fontSize: 13 }}>
                <th style={{ padding: 12 }}>رقم التتبع</th>
                <th style={{ padding: 12 }}>شركة الشحن</th>
                <th style={{ padding: 12 }}>المندوب</th>
                <th style={{ padding: 12 }}>المنطقة والمسار</th>
                <th style={{ padding: 12 }}>مبلغ COD</th>
                <th style={{ padding: 12 }}>الحالة</th>
                <th style={{ padding: 12 }}>التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((shp) => {
                const badge = getStatusBadgeColor(shp.status);
                return (
                  <tr key={shp.id} style={{ borderBottom: '1px solid #f1f5f9', fontSize: 14 }}>
                    <td style={{ padding: 12, fontWeight: 700, color: '#2563eb' }}>{shp.trackingNumber}</td>
                    <td style={{ padding: 12 }}>{shp.companyName}</td>
                    <td style={{ padding: 12 }}>{shp.driverName}</td>
                    <td style={{ padding: 12 }}>{shp.destinationArea}</td>
                    <td style={{ padding: 12, fontWeight: 600 }}>{shp.codAmount > 0 ? `${shp.codAmount} ر.س` : 'مدفوع'}</td>
                    <td style={{ padding: 12 }}>
                      <span style={{ backgroundColor: badge.bg, color: badge.text, padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                        {shp.status}
                      </span>
                    </td>
                    <td style={{ padding: 12, color: '#64748b', fontSize: 13 }}>{shp.createdAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
