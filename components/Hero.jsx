'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export default function Hero() {
  const { lang, setLang } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    fetch('/api/admin/data')
      .then((res) => res.json())
      .then((data) => setHeroData(data));

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev === 0 ? 1 : 0));
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const slides = heroData?.heroSlides || [
    { id: 1, heading: 'ফিরে আসুন আপনার রবের দিকে', subtext: 'নেক্সট তাওয়াফ প্রোগ্রাম', btnText: 'নিজের প্যাকেজ তৈরি করুন →' },
    { id: 2, heading: 'Fly Now & Pay Later Service Available', subtext: 'We trust every deal is unique.', btnText: 'Chat With Us Now →' },
  ];

  const currentSlide = slides[activeSlide] || slides[0];

  const navLinks = [
    { label: lang === 'bn' ? 'হোম' : 'Home', href: '#' },
    { label: lang === 'bn' ? 'প্যাকেজসমূহ' : 'Packages', href: '#packages' },
    { label: lang === 'bn' ? 'ওমরাহ বিল্ডার' : 'Umrah Builder', href: '#builder' },
    { label: lang === 'bn' ? 'ভিডিও ফুটেজ' : 'Videos', href: '#videos' },
    { label: lang === 'bn' ? 'যোগাযোগ' : 'Contact', href: '#footer' },
  ];

  return (
    <section className="hero-slider-section">
      <header className="site-header">
        <div className="container header-inner">
          <a href="#" className="nav-logo">
            <img src="/images/logo.png" alt="Sheba Travels" />
          </a>

          <nav className="desktop-nav">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="nav-link-item">{link.label}</a>
            ))}
          </nav>

          <div className="header-actions">
            <div className="lang-switcher">
              <button type="button" className={`lang-btn ${lang === 'bn' ? 'active' : ''}`} onClick={() => setLang('bn')}>বাংলা</button>
              <button type="button" className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
            </div>
            <a href="#builder" className="nav-cta-pill">{lang === 'bn' ? 'প্যাকেজ তৈরি করুন' : 'Build Package'}</a>
            <button type="button" className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-drawer">
            <div className="container mobile-drawer-inner">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <div className="hero-slide" style={{ backgroundImage: `linear-gradient(90deg, #020d36 0%, rgba(4,19,66,0.92) 42%, rgba(10,37,112,0.35) 75%), url('/images/hero-kaaba.jpg')` }}>
        <div className="container hero-slide-content">
          <div className="next-tawaf-badge">
            <span>{lang === 'bn' ? 'NEXT TAWAF • সেবা ট্রাভেলস এর একটি উদ্যোগ' : 'NEXT TAWAF • An Initiative of Sheba Travels'}</span>
          </div>
          <h1>{currentSlide.heading}</h1>
          <p>{currentSlide.subtext}</p>
          <div className="hero-btn-group">
            <a href="#builder" className="btn-white-pill">{currentSlide.btnText}</a>
            <a href="/admin" style={{ color: '#cbd5e1', fontSize: '0.85rem', alignSelf: 'center' }}>Admin Panel ⚙️</a>
          </div>
        </div>
      </div>
    </section>
  );
}