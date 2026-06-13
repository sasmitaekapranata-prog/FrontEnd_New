import React from 'react';

export default function KonfirmWallet({ 
  selectedWallet, 
  phoneNumber, 
  nominalTopUp, 
  userName, // Menerima data nama dinamis dari profil App.jsx
  onBack, 
  onLogout, 
  onPaymentSuccess 
}) {
  const adminFee = 1000;
  const totalPayment = Number(nominalTopUp || 0) + adminFee;

  return (
    <div style={{
      width: '100vw', height: '100vh', backgroundColor: '#f3f4f6',
      fontFamily: "'Poppins', sans-serif", padding: '40px 20px', boxSizing: 'border-box'
    }}>
      {/* HEADER TOP NAV */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        maxWidth: '1000px', margin: '0 auto 30px auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <span style={{ fontWeight: '800', fontSize: '28px', color: '#2563eb' }}>TrustPay</span>
          <span style={{ fontWeight: '800', fontSize: '28px', color: '#1f2937' }}>.id</span>
          <span style={{ fontSize: '24px', marginLeft: '4px' }}>🛡️</span>
        </div>
        <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          <span style={{ fontWeight: '600', color: '#2563eb', borderBottom: '2px solid #2563eb', paddingBottom: '4px', cursor: 'pointer' }}>Home</span>
          <span style={{ fontWeight: '600', color: '#4b5563', cursor: 'pointer' }}>Notifikasi</span>
          <span onClick={onLogout} style={{ fontWeight: '600', color: '#ef4444', cursor: 'pointer' }}>Logout</span>
        </div>
      </div>

      {/* KARTU UTAMA KONFIRMASI */}
      <div style={{
        backgroundColor: '#ffffff', borderRadius: '24px', padding: '40px',
        maxWidth: '850px', margin: '0 auto', boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
      }}>
        <button onClick={onBack} style={{
          padding: '8px 24px', border: '2px solid #2563eb', backgroundColor: 'transparent',
          color: '#2563eb', borderRadius: '12px', fontWeight: '700', fontSize: '14px',
          cursor: 'pointer', marginBottom: '30px'
        }}>
          BACK
        </button>

        {/* INFO WALLET DAN NOMOR */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '40px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
            border: '1px solid #2563eb', borderRadius: '12px', color: '#2563eb', fontWeight: '700'
          }}>
            <span>🔹</span> {selectedWallet} Topup
          </div>
          <div style={{ fontSize: '22px', fontWeight: '700', color: '#1f2937' }}>
            {phoneNumber}
          </div>
        </div>

        {/* RINCIAN STRIP DETAIL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#9ca3af', fontWeight: '600' }}>Penerima</span>
            {/* Menampilkan nama profil secara dinamis */}
            <span style={{ color: '#1f2937', fontWeight: '800', fontSize: '16px' }}>{userName}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#9ca3af', fontWeight: '600' }}>Nominal</span>
            <span style={{ color: '#1f2937', fontWeight: '800' }}>Rp {Number(nominalTopUp).toLocaleString('id-ID')}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#9ca3af', fontWeight: '600' }}>Biaya Admin</span>
            <span style={{ color: '#1f2937', fontWeight: '800' }}>Rp {adminFee.toLocaleString('id-ID')}</span>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px dashed #e5e7eb', marginBottom: '30px' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <span style={{ color: '#1f2937', fontWeight: '800', fontSize: '18px' }}>Total</span>
          <span style={{ color: '#1f2937', fontWeight: '800', fontSize: '26px' }}>Rp {totalPayment.toLocaleString('id-ID')}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={onPaymentSuccess} style={{
            padding: '14px 100px', backgroundColor: '#2563eb', color: '#ffffff',
            border: 'none', borderRadius: '24px', fontWeight: '700', fontSize: '16px',
            cursor: 'pointer', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
          }}>
            Bayar
          </button>
        </div>
      </div>
    </div>
  );
}