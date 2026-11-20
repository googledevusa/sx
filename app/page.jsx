'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import Builder from '@/components/Builder';
import Videos from '@/components/Videos';
import Footer from '@/components/Footer';
import { PACKAGES } from '@/lib/data';
import { useLanguage } from '@/lib/LanguageContext';

export default function HomePage() {
  const { lang } = useLanguage();
  const [pkgType, setPkgType] = useState('umrah');

  const umrahCount = PACKAGES.filter((p) => p.type === 'umrah').length;
  const hajjCount = PACKAGES.filter((p) => p.type === 'hajj').length;
  const visiblePackages = PACKAGES.filter((p) => p.type === pkgType);

  return (
    <main>
      <Hero />

      <section id="packages" className="pkg-showcase-section">
        <div className="container">
          <div className="pkg-toggle-wrap">
            <div className="pkg-toggle-bar">
              <button
                type="button"
                className={`pkg-tab-btn ${pkgType === 'umrah' ? 'active' : ''}`}
                onClick={() => setPkgType('umrah')}
              >
                <span>{lang === 'bn' ? 'ওমরাহ' : 'Umrah'}</span>
                <span className="count-badge">{umrahCount}</span>
              </button>
              <button
                type="button"
                className={`pkg-tab-btn ${pkgType === 'hajj' ? 'active' : ''}`}
                onClick={() => setPkgType('hajj')}
              >
                <span>{lang === 'bn' ? 'হজ' : 'Hajj'}</span>
                <span className="count-badge">{hajjCount}</span>
              </button>
            </div>
          </div>

          <div className="pkg-cards-grid">
            {visiblePackages.map((pkg) => (
              <div key={pkg.id} className="pkg-detail-card">
                <div className={`pkg-card-banner theme-${pkg.bannerTheme}`}>
                  <div className="banner-text-center">
                    <h4>{pkg.bannerHeading[lang]}</h4>
                    <p className="banner-sub">{pkg.bannerSub[lang]}</p>
                    <small className="banner-note">{pkg.bannerNote[lang]}</small>
                  </div>
                </div>

                <div className="pkg-detail-body">
                  <div className="tier-pill-bar">{pkg.tierBadge[lang]}</div>
                  <div className="meta-split-row">
                    <span className="meta-cat">{pkg.categoryLabel[lang]}</span>
                    <span className="meta-dur">{pkg.durationLabel[lang]}</span>
                  </div>

                  <h3 className="pkg-bangla-title">{pkg.title[lang]}</h3>
                  <p className="pkg-bangla-sub">{pkg.subtitle[lang]}</p>

                  <ul className="pkg-check-list">
                    {pkg.features[lang].map((feat, idx) => (
                      <li key={idx}>
                        <span className="check-dot">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pkg-price-footer">
                    <div>
                      <span className="starting-label">{lang === 'bn' ? 'প্যাকেজ মূল্য শুরু' : 'Starting from'}</span>
                      <strong className="price-amount">{pkg.price[lang]}</strong>
                    </div>
                    <a href="#builder" className="pkg-select-link">
                      {lang === 'bn' ? 'বুকিং করুন →' : 'Book Now →'}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Builder />
      <Videos />
      <Footer />
    </main>
  );
}