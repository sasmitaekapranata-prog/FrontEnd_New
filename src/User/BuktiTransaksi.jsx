import React from 'react';

export default function BuktiTransaksi({ data, onClose }) {
  if (!data || data.type === 'exchange') return null;

  const formatRupiah = (angka) => {
    const numeric = typeof angka === 'string' ? Number(angka.replace(/[^0-9]/g, '')) : angka;
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(numeric);
  };

  // 1. Ekstraksi Total Penuh dari payload utama (misalnya: 115000)
  const totalBiayaAkumulasi = typeof data.amount === 'string' 
    ? Number(data.amount.replace(/[^0-9]/g, '')) 
    : Number(data.amount || 0);
  
  // 2. Deteksi Pintar String Title & Jenis Transaksi
  const titleText = data.title ? String(data.title).toLowerCase() : '';
  const isEWallet = titleText.includes('gopay') || 
                    titleText.includes('shopee') || 
                    titleText.includes('dana') || 
                    titleText.includes('pay') ||
                    titleText.includes('wallet');

  // Deteksi jika transaksi merupakan transfer internasional berdasarkan mata uang atau kata kunci
  const isInternational = titleText.includes('transfer usd') || 
                          titleText.includes('transfer sgd') || 
                          titleText.includes('transfer aud') || 
                          titleText.includes('transfer eur') || 
                          titleText.includes('internasional') ||
                          data.biayaAdmin === 50000; // Mengantisipasi flag bawaan dari App.jsx sebelumnya

  // 3. Penentuan Biaya Admin (Internasional = Rp 15.000, Lainnya = Rp 1.000)
  let biayaAdmin = 1000; 
  if (isInternational) {
    biayaAdmin = 25000;
  } else if (isEWallet) {
    biayaAdmin = 1000;
  } else if (data.biayaAdmin !== undefined && data.biayaAdmin !== null) {
    biayaAdmin = 1000;
  }

  // 4. Hitung mundur nominal bersih agar data matematis selalu balance (Total - Admin)
  const nominalBersih = totalBiayaAkumulasi - biayaAdmin;

  const today = new Date();
  const dateString = today.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
  const timeString = today.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  return (
    <div style={styles.overlay}>
      <div style={styles.receiptCard}>
        {/* Header */}
        <div style={styles.header}>
          <span style={styles.topLink}>Bukti Transaksi</span>
          <h2 style={styles.statusTitle}>Transaksi Berhasil</h2>
          <p style={styles.dateTime}>{dateString}, {timeString}</p>
        </div>

        {/* Total Terhitung Otomatis Sesuai UI Utama (Nominal + Admin) */}
        <div style={styles.totalSection}>
          <p style={styles.labelSmall}>Total Transaksi</p>
          <h1 style={styles.totalAmount}>{formatRupiah(totalBiayaAkumulasi)}</h1>
        </div>

        {/* Sumber Dana */}
        <div style={styles.infoBox}>
          <p style={styles.boxTitle}>Sumber dana</p>
          <div style={styles.sourceRow}>
            <div style={styles.avatar}>✓</div>
            <div style={styles.sourceText}>
              <div style={styles.userName}>{data.title ? data.title.split('-')[0] : 'TrustPay'}</div>
              <div style={styles.userSub}>TrustPay.id</div>
              <div style={styles.userSub}>{data.user || 'Nasabah TrustPay'}</div>
            </div>
          </div>
        </div>

        {/* Detail Transaksi */}
        <div style={styles.infoBox}>
          <p style={styles.boxTitle}>Detail Transaksi</p>
          <div style={styles.detailRow}>
            <span>Jenis Layanan</span>
            <span style={styles.boldText}>
              {data.type === 'plus' 
                ? 'Top Up Akun' 
                : isEWallet 
                ? 'Top Up E-Wallet' 
                : isInternational 
                ? 'Transfer Internasional' 
                : 'Transfer Bank'}
            </span>
          </div>
          <div style={styles.detailRow}>
            <span>Nominal</span>
            <span style={styles.boldText}>{formatRupiah(nominalBersih)}</span>
          </div>
          <div style={styles.detailRow}>
            <span>Biaya Admin</span>
            <span style={styles.boldText}>{formatRupiah(biayaAdmin)}</span>
          </div>
          <hr style={styles.divider} />
          <div style={styles.detailRow}>
            <span>Total Biaya</span>
            <span style={styles.boldText}>{formatRupiah(totalBiayaAkumulasi)}</span>
          </div>
        </div>

        {/* Tombol Selesai */}
        <button onClick={onClose} style={styles.btnSelesai}>Selesai</button>
      </div>
    </div>
  );
}

const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '40px 20px', overflowY: 'auto', zIndex: 10000, fontFamily: "'Poppins', sans-serif", boxSizing: 'border-box' },
  receiptCard: { width: '100%', maxWidth: '400px', backgroundColor: 'white', borderRadius: '30px', padding: '30px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', margin: 'auto', boxSizing: 'border-box' },
  header: { marginBottom: '25px' },
  topLink: { color: '#1a56db', fontWeight: '700', fontSize: '14px', textDecoration: 'underline', cursor: 'default' },
  statusTitle: { fontSize: '20px', fontWeight: '800', marginTop: '15px', color: '#000' },
  dateTime: { fontSize: '13px', color: '#64748b', marginTop: '5px' },
  totalSection: { marginBottom: '25px' },
  labelSmall: { fontSize: '12px', fontWeight: '600', color: '#64748b' },
  totalAmount: { fontSize: '32px', fontWeight: '800', color: '#000' },
  infoBox: { border: '1px solid #e2e8f0', borderRadius: '20px', padding: '15px', marginBottom: '15px', textAlign: 'left' },
  boxTitle: { fontSize: '12px', fontWeight: '700', color: '#1a56db', marginBottom: '10px' },
  sourceRow: { display: 'flex', alignItems: 'center', gap: '12px' },
  avatar: { width: '40px', height: '40px', backgroundColor: '#e6fffa', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#319795', fontWeight: 'bold' },
  sourceText: { display: 'flex', flexDirection: 'column' },
  userName: { fontSize: '14px', fontWeight: '700', color: '#000' },
  userSub: { fontSize: '11px', color: '#64748b' },
  detailRow: { display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px', color: '#64748b' },
  boldText: { color: '#000', fontWeight: '700' },
  divider: { border: 'none', borderTop: '1px solid #e2e8f0', margin: '10px 0' },
  btnSelesai: { width: '100%', padding: '12px', borderRadius: '25px', border: '2px solid #1a56db', backgroundColor: 'transparent', color: '#1a56db', fontWeight: '700', fontSize: '16px', cursor: 'pointer', marginTop: '10px' }
};