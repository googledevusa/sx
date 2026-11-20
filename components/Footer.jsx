'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { lang } = useLanguage();
  const [footerData, setFooterData] = useState({
    whatsappNumber: '8801711000000',
    footer: {
      address: '৬৭/১ নয়া পল্টন, ভিআইপি রোড, ঢাকা-১০০০, বাংলাদেশ',
      hotline: '+৮৮০ ১৭১১-০০০০০০',
      email: 'info@shebatravelsbd.com',
    },
  });

  useEffect(() => {
    fetch('/api/admin/data')
      .then((res) => res.json())
      .then((data) => {
        if (data) setFooterData(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <footer id="footer" className="robi-footer-section">
      <div className="container">
        <div className="robi-footer-grid">
          {/* Column 1: Logo, Address & App Download */}
          <div className="footer-col brand-col">
            <img src="/images/logo.png" alt="Sheba Travels International" className="robi-footer-logo" />
            <p className="robi-footer-address">
              {footerData.footer?.address || '৬৭/১ নয়া পল্টন, ভিআইপি রোড, ঢাকা-১০০০, বাংলাদেশ'}
            </p>
            <p className="robi-footer-contact">
              {lang === 'bn' ? 'হটলাইন:' : 'Hotline:'} {footerData.footer?.hotline}
            </p>

            <div className="footer-app-section">
              <h4>{lang === 'bn' ? 'আমাদের অ্যাপ ডাউনলোড করুন' : 'Get Our App'}</h4>
              <div className="app-badges-row">
                <a href="#" className="app-badge-link" aria-label="App Store">
                  <div className="store-badge apple">
                    <span>Download on the</span>
                    <strong>App Store</strong>
                  </div>
                </a>
                <a href="#" className="app-badge-link" aria-label="Google Play">
                  <div className="store-badge google">
                    <span>GET IT ON</span>
                    <strong>Google Play</strong>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="footer-col">
            <h4>{lang === 'bn' ? 'কোম্পানি' : 'Company'}</h4>
            <ul>
              <li><a href="#">{lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'}</a></li>
              <li><a href="#">{lang === 'bn' ? 'কোম্পানি প্রফাইল' : 'Company Profile'}</a></li>
              <li><a href="#">{lang === 'bn' ? 'পরিচালক পর্ষদ' : 'Board of Directors'}</a></li>
              <li><a href="#">{lang === 'bn' ? 'ইএসজি (ESG)' : 'ESG'}</a></li>
              <li><a href="#">{lang === 'bn' ? 'বিনিয়োগকারী সম্পর্ক' : 'Investor Relations'}</a></li>
              <li><a href="#">{lang === 'bn' ? 'প্রেস রিলিজ' : 'Press Release'}</a></li>
              <li><a href="#">{lang === 'bn' ? 'নোটিশ' : 'Notice'}</a></li>
              <li><a href="#">{lang === 'bn' ? 'ক্যারিয়ার' : 'Career'}</a></li>
            </ul>
          </div>

          {/* Column 3: Useful Links */}
          <div className="footer-col">
            <h4>{lang === 'bn' ? 'দরকারী লিংক' : 'Useful Links'}</h4>
            <ul>
              <li><a href="#">{lang === 'bn' ? 'সার্কল বাংলাদেশ' : 'Cirkle Bangladesh'}</a></li>
              <li><a href="#">{lang === 'bn' ? 'এক্সেন্টেেক' : 'Axentec'}</a></li>
              <li><a href="#">{lang === 'bn' ? 'রেডডট' : 'RedDot'}</a></li>
              <li><a href="#">{lang === 'bn' ? 'বিডি টিকেমস' : 'BD Tickets'}</a></li>
              <li><a href="#">{lang === 'bn' ? 'সেবা শপ' : 'Sheba Shop'}</a></li>
              <li><a href="#">{lang === 'bn' ? 'বিনেজ কাফেলা' : 'Binge Kafela'}</a></li>
            </ul>
          </div>

          {/* Column 4: Help */}
          <div className="footer-col">
            <h4>{lang === 'bn' ? 'সহায়তা' : 'Help'}</h4>
            <ul>
              <li><a href="#">{lang === 'bn' ? 'সাপোর্ট চ্যানেল' : 'Speak Up Channel'}</a></li>
              <li><a href="#">{lang === 'bn' ? 'ফেক ওয়েবসাইট রিপোর্ট' : 'Report A Fake Website'}</a></li>
              <li><a href="#">{lang === 'bn' ? 'এবিএসি পলিসি' : 'ABAC Policy'}</a></li>
              <li><a href="#builder">{lang === 'bn' ? 'গ্রাহক সহায়তা' : 'Support'}</a></li>
            </ul>
          </div>

          {/* Column 5: Socials */}
          <div className="footer-col">
            <h4>{lang === 'bn' ? 'সোশ্যাল মিডিয়া' : 'Socials'}</h4>
            <ul className="social-links-list">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  <span className="social-icon fb">f</span> Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                  <span className="social-icon tw">𝕏</span> Twitter/X
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  <span className="social-icon ig">📷</span> Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="robi-footer-bottom">
          <div className="footer-copyright">
            © ২০২৬ Sheba Travels International. All rights reserved.
          </div>
          <div className="footer-policy-links">
            <a href="#">{lang === 'bn' ? 'প্রাইভেসি নোটিশ' : 'Privacy Notice'}</a>
            <a href="#">{lang === 'bn' ? 'শর্তাবলী' : 'Terms of Use'}</a>
            <a href="#">{lang === 'bn' ? 'কুকিজ পলিসি' : 'Cookies Policy'}</a>
            <a href="#">{lang === 'bn' ? 'সিকিউরিটি পলিসি' : 'Data Policy and Security'}</a>
            <a href="#">{lang === 'bn' ? 'এআই প্রিনিপলস' : 'AI Principles'}</a>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${footerData.whatsappNumber || '8801711000000'}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="WhatsApp Chat"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.758.458 3.475 1.328 4.988L2 22l5.188-1.361a9.927 9.927 0 0 0 4.843 1.258h.004c5.515 0 9.969-4.454 9.969-9.969A9.926 9.926 0 0 0 19.08 4.91 9.922 9.922 0 0 0 12.031 2z" />
        </svg>
      </a>
    </footer>
  );
}