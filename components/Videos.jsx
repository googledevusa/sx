'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export default function Videos() {
  const { lang } = useLanguage();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('/api/admin/data')
      .then((res) => res.json())
      .then((data) => setVideos(data.videos || []));
  }, []);

  return (
    <section id="videos" className="section-spacer">
      <div className="container">
        <div className="section-heading-center">
          <h2>{lang === 'bn' ? 'আমাদের সফর ও কার্যক্রমের ভিডিও ফুটেজ' : 'Video Footage of Our Journeys'}</h2>
          <p>{lang === 'bn' ? 'মক্কা ও মদিনায় আমাদের হাজী সাহেবদের সেবার বাস্তব চিত্র' : 'Real moments in Makkah & Madinah'}</p>
        </div>

        <div className="footage-grid-3x4">
          {videos.map((item) => {
            const embedSrc = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(item.url)}&show_text=false&width=360`;
            return (
              <div key={item.id} className="fb-reel-card">
                <div className="fb-reel-frame-wrap">
                  <iframe src={embedSrc} title={item.title} scrolling="no" frameBorder="0" allowFullScreen />
                </div>
                <div className="fb-reel-footer">
                  <span>{item.title}</span>
                  <a href={item.url} target="_blank" rel="noreferrer">Watch ↗</a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}