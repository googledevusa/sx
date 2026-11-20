'use client';

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/data')
      .then((res) => res.json())
      .then((data) => {
        setSiteData(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড দিন (admin123)');
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteData),
      });
      const result = await res.json();
      if (result.success) {
        alert('সফলভাবে পরিবর্তন সংরক্ষিত হয়েছে! ✓');
      } else {
        alert('সংরক্ষণ করতে সমস্যা হয়েছে।');
      }
    } catch (err) {
      alert('নেটওয়ার্ক ত্রুটি।');
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', background: '#041342' }}>
        <form onSubmit={handleLogin} style={{ background: '#fff', padding: '30px', borderRadius: '12px', width: '350px' }}>
          <h2 style={{ marginBottom: '16px', color: '#041342' }}>Admin Panel Login</h2>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>পাসওয়ার্ড দিন (admin123)</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '14px' }}
            required
          />
          <button type="submit" style={{ width: '100%', background: '#0d2b88', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
            লগইন করুন
          </button>
        </form>
      </div>
    );
  }

  if (loading || !siteData) return <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2rem' }}>লোড হচ্ছে...</div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '20px', fontFamily: 'inherit' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '2px solid #e2e8f0', paddingBottom: '15px' }}>
        <h2>Sheba Travels Admin Dashboard</h2>
        <button onClick={handleSave} style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}>
          পরিবর্তনগুলো সেভ করুন ✓
        </button>
      </div>

      {/* 1. WHATSAPP CONFIG */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <h3 style={{ marginBottom: '8px', color: '#0f172a' }}>📱 WhatsApp নম্বর পরিবর্তন</h3>
        <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '10px' }}>সাইটের হোয়াটসঅ্যাপ এবং ফ্লোটিং বাটনের নম্বর আপডেট হবে</p>
        <input
          type="text"
          value={siteData.whatsappNumber || ''}
          onChange={(e) => setSiteData({ ...siteData, whatsappNumber: e.target.value })}
          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
        />
      </div>

      {/* 2. HERO SLIDES CONFIG */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <h3 style={{ marginBottom: '14px', color: '#0f172a' }}>🖼️ হিরো সেকশন স্লাইডার</h3>
        {siteData.heroSlides && siteData.heroSlides.map((slide, idx) => (
          <div key={slide.id || idx} style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', marginBottom: '15px', border: '1px solid #e2e8f0' }}>
            <strong>স্লাইড {idx + 1}</strong>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>হেডলাইন:</label>
                <input
                  type="text"
                  value={slide.heading || ''}
                  onChange={(e) => {
                    const newSlides = [...siteData.heroSlides];
                    newSlides[idx].heading = e.target.value;
                    setSiteData({ ...siteData, heroSlides: newSlides });
                  }}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>বাটন টেক্সট:</label>
                <input
                  type="text"
                  value={slide.btnText || ''}
                  onChange={(e) => {
                    const newSlides = [...siteData.heroSlides];
                    newSlides[idx].btnText = e.target.value;
                    setSiteData({ ...siteData, heroSlides: newSlides });
                  }}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. HOME VIDEOS MANAGEMENT */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3 style={{ color: '#0f172a' }}>🎬 ভিডিও রিলস (Facebook Reels)</h3>
          <button
            onClick={() => {
              const title = prompt('ভিডিওর শিরোনাম দিন:');
              const url = prompt('Facebook Reel URL দিন:');
              if (title && url) {
                setSiteData({
                  ...siteData,
                  videos: [...(siteData.videos || []), { id: Date.now(), title, url }],
                });
              }
            }}
            style={{ background: '#0d2b88', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}
          >
            + নতুন ভিডিও যোগ করুন
          </button>
        </div>
        {siteData.videos && siteData.videos.map((vid, idx) => (
          <div key={vid.id || idx} style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px', background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontWeight: 800, width: '25px' }}>#{idx + 1}</span>
            <input
              type="text"
              value={vid.title || ''}
              onChange={(e) => {
                const newVids = [...siteData.videos];
                newVids[idx].title = e.target.value;
                setSiteData({ ...siteData, videos: newVids });
              }}
              placeholder="ভিডিও শিরোনাম"
              style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
            <input
              type="text"
              value={vid.url || ''}
              onChange={(e) => {
                const newVids = [...siteData.videos];
                newVids[idx].url = e.target.value;
                setSiteData({ ...siteData, videos: newVids });
              }}
              placeholder="Facebook Reel URL"
              style={{ flex: 1.5, padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
            <button
              onClick={() => {
                const newVids = siteData.videos.filter((_, i) => i !== idx);
                setSiteData({ ...siteData, videos: newVids });
              }}
              style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}
            >
              ডিলিট
            </button>
          </div>
        ))}
      </div>

      {/* 4. FOOTER CONFIG */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <h3 style={{ marginBottom: '14px', color: '#0f172a' }}>📍 ফুটার তথ্য পরিবর্তন</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>অফিস ঠিকানা:</label>
            <input
              type="text"
              value={siteData.footer?.address || ''}
              onChange={(e) => setSiteData({ ...siteData, footer: { ...siteData.footer, address: e.target.value } })}
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>হটলাইন ফোন:</label>
            <input
              type="text"
              value={siteData.footer?.hotline || ''}
              onChange={(e) => setSiteData({ ...siteData, footer: { ...siteData.footer, hotline: e.target.value } })}
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'right' }}>
        <button onClick={handleSave} style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', fontSize: '1rem' }}>
          সব পরিবর্তন সেভ করুন ✓
        </button>
      </div>
    </div>
  );
}