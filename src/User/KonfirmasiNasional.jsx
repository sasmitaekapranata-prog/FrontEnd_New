import React from 'react';
import { IoPaperPlaneOutline } from 'react-icons/io5';

export default function KonfirmasiNasional({ data, initialData, userName, onBack, onNavigate, onLogout, onNextToPin }) {
  const payload = data || initialData || {};

  const nominalTransfer = Number(payload.nominal) || Number(payload.amount) || Number(payload.nominalTransfer) || 0;
  
  // Biaya admin menyesuaikan nominal
  const biayaAdmin = nominalTransfer > 0 ? 1000 : 0; 
  const totalBayar = nominalTransfer + biayaAdmin;

  // Deteksi otomatis key bank dan rekening
  const bankTujuan = payload.bank || payload.bankTujuan || payload.bankName || 'Bank Mandiri';
  const rekeningTujuan = payload.rekening || payload.rekeningTujuan || payload.accountNumber || '123456789123456';
  const noHpPengirim = payload.userPhone || '081262267690';

  const handlePaymentSubmit = () => {
    if (onNextToPin) {
      // Langsung meneruskan data ke App.jsx tanpa melalui pop-up internal PIN lagi
      onNextToPin({ ...payload, totalBayar });
    }
  };

  return (
    <div style={styles.container}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        body, html { margin: 0; padding: 0; width: 100%; min-height: 100%; overflow-y: auto !important; background: #ffffff; }
        .btn-pay-action:hover { background-color: #e0ebff !important; border-color: #1a56db !important; }
      `}</style>

      <div style={styles.dashboardWrapper}>
        {/* UPPER NAVBAR BRAND */}
        <header style={styles.header}>
          <div style={styles.brandSection}>
            <div onClick={onBack} style={styles.logoContainer}>
              <span style={styles.logoTextBlue}>TrustPay</span>
              <span style={styles.logoTextLightBlue}>.id</span>
              <span style={{ marginLeft: '4px', fontSize: '24px', display: 'inline-block', verticalAlign: 'middle' }}>🛡️</span>
            </div>
          </div>
          <nav style={styles.navMenu}>
            <span style={styles.navItem} onClick={() => onNavigate && onNavigate('dashboard')}>Home</span>
            <span style={styles.navItem} onClick={() => onNavigate && onNavigate('notifikasi')}>Notifikasi</span>
            <span style={styles.navItemLogout} onClick={onLogout}>Logout</span>
          </nav>
        </header>

        {/* SUBHEADER INTERFACE */}
        <div style={styles.subHeader}>
          <div style={styles.tabContainer}>
            <button type="button" style={styles.btnTabSend} onClick={onBack}>
              <IoPaperPlaneOutline style={{ transform: 'rotate(45deg)', strokeWidth: '3px', marginRight: '6px' }} /> SEND
            </button>
            <div style={styles.btnTabNasional}>Nasional</div>
          </div>
        </div>

        {/* MAIN STRUCTURAL CARD CONTAINER */}
        <main style={styles.mainContent}>
          <div style={styles.whiteCardContainer}>
            <h2 style={styles.sectionTitle}>Konfirmasi Pembayaran</h2>
            
            {/* Profiling Data Group (Nama Penerima & Avatar Diubah Hanya Menampilkan Detail Rekening Utama) */}
            <div style={styles.profileRow}>
              <div style={styles.profileDetails}>
                <span style={styles.recipientName}>{bankTujuan}</span>
                <span style={styles.recipientAccount}>No. Rekening: {rekeningTujuan}</span>
              </div>
            </div>

            {/* Financial Auditing List */}
            <div style={styles.detailsList}>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Nominal</span>
                <span style={styles.infoValue}>Rp {nominalTransfer.toLocaleString('id-ID')}</span>
              </div>
              
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Biaya Admin</span>
                <span style={styles.infoValue}>Rp {biayaAdmin.toLocaleString('id-ID')}</span>
              </div>

              {/* Source Vault Container */}
              <div style={styles.sourceAccountGroup}>
                <span style={styles.sourceLabel}>Tabungan asal</span>
                <div style={styles.sourceCardBox}>
                  <span style={styles.sourceTitle}>Tabungan {userName || 'TrustPay.id'} – {noHpPengirim}</span>
                  <span style={styles.sourceBalance}>Rp 100.000.000</span>
                </div>
              </div>
            </div>

            {/* Total Section Bottom alignment */}
            <div style={styles.totalRowContainer}>
              <span style={styles.totalLabel}>Total</span>
              <span style={styles.totalAmount}>Rp {totalBayar.toLocaleString('id-ID')}</span>
            </div>

            {/* Dynamic Confirmation Trigger */}
            <div style={styles.actionRow}>
              <button 
                type="button" 
                onClick={handlePaymentSubmit} 
                style={styles.btnPaymentSubmit}
                className="btn-pay-action"
              >
                Bayar
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const styles = {
  container: { height: '100vh', width: '100%', background: '#ffffff', boxSizing: 'border-box', margin: 0, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', overflowY: 'auto', paddingTop: '40px', paddingBottom: '80px' },
  dashboardWrapper: { width: '100%', maxWidth: '840px', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '32px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
  brandSection: { display: 'flex', alignItems: 'center' },
  logoContainer: { display: 'flex', alignItems: 'center', cursor: 'pointer' },
  logoTextBlue: { fontWeight: '800', fontSize: '24px', color: '#1a56db' },
  logoTextLightBlue: { fontWeight: '800', fontSize: '24px', color: '#60a5fa' },
  navMenu: { display: 'flex', gap: '24px', alignItems: 'center' },
  navItem: { cursor: 'pointer', color: '#000000', fontWeight: '700', fontSize: '14px' },
  navItemLogout: { cursor: 'pointer', color: '#000000', fontWeight: '700', fontSize: '14px' },
  subHeader: { display: 'flex', width: '100%' },
  tabContainer: { display: 'flex', gap: '16px', alignItems: 'center' },
  btnTabSend: { background: '#ffffff', color: '#1a56db', border: '1px solid #1a56db', padding: '8px 24px', borderRadius: '20px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center' },
  btnTabNasional: { background: '#e0ebff', color: '#1a56db', border: 'none', padding: '8px 28px', borderRadius: '20px', fontWeight: '700', fontSize: '14px' },
  mainContent: { width: '100%' },
  whiteCardContainer: { background: '#ffffff', borderRadius: '12px', padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.08)', border: '1px solid #e2e8f0' },
  sectionTitle: { fontSize: '18px', fontWeight: '700', color: '#000000', textDecoration: 'underline', marginBottom: '8px' },
  profileRow: { display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '4px' },
  profileDetails: { display: 'flex', flexDirection: 'column', gap: '4px' },
  recipientName: { fontSize: '22px', fontWeight: '800', color: '#1a56db' },
  recipientAccount: { fontSize: '14px', color: '#475569', fontWeight: '600' },
  detailsList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  infoRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', color: '#000000', fontWeight: '500' },
  infoLabel: { color: '#334155' },
  infoValue: { fontWeight: '600' },
  sourceAccountGroup: { display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' },
  sourceLabel: { color: '#334155', fontSize: '14px', fontWeight: '500' },
  sourceCardBox: { width: '100%', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '10px 14px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '2px' },
  sourceTitle: { color: '#000000', fontWeight: '700', fontSize: '13px' },
  sourceBalance: { color: '#475569', fontSize: '12px', fontWeight: '500' },
  totalRowContainer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' },
  totalLabel: { fontSize: '18px', fontWeight: '700', color: '#000000' },
  totalAmount: { fontSize: '24px', fontWeight: '800', color: '#000000' },
  actionRow: { display: 'flex', justifyContent: 'center', marginTop: '16px' },
  btnPaymentSubmit: { background: '#e0ebff', color: '#000000', border: '1px solid #1a56db', width: '220px', padding: '10px 0', borderRadius: '20px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', textDecoration: 'underline', transition: 'all 0.2s ease' }
};