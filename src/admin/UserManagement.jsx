import React, { useState } from 'react';
import { Users, Search, Plus } from 'lucide-react';

// Menerima data users dan setUsers sebagai Props dari Dashboard
export default function UserManagement({ users, setUsers }) {
  const [search, setSearch] = useState('');
  const totalUsers = users.length;

  // FILTER PENCARIAN
  const filteredUsers = users.filter((u) => {

  const nama = (u.username || "").toLowerCase();

  const nomor = u.nomor_hp || "";

  return (
    nama.includes(search.toLowerCase()) ||
    nomor.includes(search)
  );

});

  // FUNGSI TAMBAH USER MURNI FRONTEND 
  const handleTambahUser = () => {
    const usernameInput = prompt("Masukkan Nama User Baru:", "");
    if (!usernameInput || usernameInput.trim() === "") {
      alert("Nama tidak boleh kosong!");
      return;
    }

    const nomorHpInput = prompt("Masukkan Nomor HP:", "");
    if (!nomorHpInput || nomorHpInput.trim() === "") {
      alert("Nomor HP tidak boleh kosong!");
      return;
    }

    const passwordInput = prompt("Masukkan Password:");
    if (!passwordInput) return;

    // Membuat objek user baru
    const userBaru = {
      ID_User: `user-${Date.now()}`,
      username: usernameInput,
      nomor_hp: nomorHpInput
    };

    // Update state pusat di Dashboard.jsx secara langsung
    setUsers((prevUsers) => {
      const [first, ...rest] = prevUsers;
      return [first, userBaru, ...rest];
    });

    alert("User berhasil ditambahkan!");
  };

  // 🛡️ CSS INLINE MASTER
  const styles = {
    container: { display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', boxSizing: 'border-box', textAlign: 'left' },
    headerArea: { display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' },
    title: { fontSize: '22px', fontWeight: '800', color: '#1e293b', margin: 0, letterSpacing: '-0.025em' },
    subtitle: { fontSize: '13px', color: '#94a3b8', margin: 0, fontWeight: '500' },
    statCard: { backgroundColor: '#ffffff', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: '16px', maxWidth: '340px', textAlign: 'left' },
    iconWrapper: { padding: '12px', backgroundColor: '#eff6ff', color: '#2563eb', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    tableContainer: { backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', overflow: 'hidden', width: '100%' },
    actionBar: { padding: '20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' },
    searchBox: { display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px 14px', borderRadius: '12px', width: '100%', maxWidth: '280px', boxSizing: 'border-box' },
    searchInput: { background: 'transparent', border: 'none', outline: 'none', fontSize: '13px', width: '100%', color: '#334155' },
    addButton: { display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.1)', transition: 'background-color 0.2s' },
    table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
    th: { padding: '14px 20px', backgroundColor: '#f8fafc', color: '#94a3b8', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #e2e8f0' },
    tdName: { padding: '16px 20px', fontSize: '14px', fontWeight: 'bold', color: '#1e293b', borderBottom: '1px solid #f1f5f9' },
    tdPhone: { padding: '16px 20px', fontSize: '13px', fontFamily: 'monospace', color: '#475569', borderBottom: '1px solid #f1f5f9' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerArea}>
        <h1 style={styles.title}>User Management</h1>
        <p style={styles.subtitle}>Kelola daftar dan data informasi nomor pengguna sistem</p>
      </div>

      <div style={styles.statCard}>
        <div style={styles.iconWrapper}>
          <Users className="h-5 w-5" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <p style={{ fontSize: '12px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 'bold', margin: 0, letterSpacing: '0.5px' }}>
            Total Pengguna Terdaftar
          </p>
          <p style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b', margin: 0, letterSpacing: '-0.025em' }}>
            {totalUsers}
          </p>
        </div>
      </div>

      <div style={styles.tableContainer}>
        <div style={styles.actionBar}>
          <div style={styles.searchBox}>
            <Search className="h-4 w-4 text-[#64748b]" />
            <input type="text" placeholder="Cari nama atau nomor telepon..." style={styles.searchInput} value={search} onChange={(e) => setSearch(e.target.value)}/>
          </div>
          <div>
            <button style={styles.addButton} type="button" className="action-add-btn" onClick={handleTambahUser}> 
              <Plus className="h-4 w-4 mr-1" /> Tambah User
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto', width: '100%' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Nama Lengkap</th>
                <th style={styles.th}>No. Telepon</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u) => (
                  <tr key={u.ID_User} className="table-row-item">
                    <td style={styles.tdName}>{u.username}</td>
                    <td style={styles.tdPhone}>{u.nomor_hp}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>
                    Tidak ada data pengguna cocok dengan pencarian
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .table-row-item:hover { background-color: #f8fafc !important; }
        .action-add-btn:hover { background-color: #1d4ed8 !important; }
      `}</style>
    </div>
  );
}