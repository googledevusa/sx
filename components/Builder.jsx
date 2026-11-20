'use client';

import { useState } from 'react';
import {
  UMRAH_PLANS,
  FLIGHT_OPTIONS,
  VISA_OPTIONS,
  HOTEL_OPTIONS,
  MAKKAH_ZIYARAH,
  MADINAH_ZIYARAH,
  TRANSFER_OPTIONS,
} from '@/lib/data';
import { useLanguage } from '@/lib/LanguageContext';

export default function Builder() {
  const { lang } = useLanguage();
  const [step, setStep] = useState(1);

  const [planId, setPlanId] = useState('7d');
  const [adults, setAdults] = useState(1);
  const [flightId, setFlightId] = useState('transit');
  const [businessClass, setBusinessClass] = useState(false);
  const [visaId, setVisaId] = useState('regular_visa');
  const [hotelId, setHotelId] = useState('3star');
  const [catering, setCatering] = useState(false);

  const [makkahZiyarahId, setMakkahZiyarahId] = useState('none');
  const [madinahZiyarahId, setMadinahZiyarahId] = useState('none');
  const [transferId, setTransferId] = useState('none');

  const [fullTimeCar, setFullTimeCar] = useState(false);
  const [carHours, setCarHours] = useState(5);
  const [teamLeader, setTeamLeader] = useState(false);

  const [contactForm, setContactForm] = useState({ name: '', phone: '', email: '', address: '' });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const selectedPlan = UMRAH_PLANS.find((p) => p.id === planId) || UMRAH_PLANS[0];
  const selectedFlight = FLIGHT_OPTIONS.find((f) => f.id === flightId) || FLIGHT_OPTIONS[0];
  const selectedVisa = VISA_OPTIONS.find((v) => v.id === visaId) || VISA_OPTIONS[0];
  const selectedHotel = HOTEL_OPTIONS.find((h) => h.id === hotelId) || HOTEL_OPTIONS[0];
  const selectedMakkah = MAKKAH_ZIYARAH.find((m) => m.id === makkahZiyarahId) || MAKKAH_ZIYARAH[0];
  const selectedMadinah = MADINAH_ZIYARAH.find((m) => m.id === madinahZiyarahId) || MADINAH_ZIYARAH[0];
  const selectedTransfer = TRANSFER_OPTIONS.find((t) => t.id === transferId) || TRANSFER_OPTIONS[0];

  const payingPax = Math.max(1, adults);
  const totalDays = selectedPlan.days;

  const flightCost = (selectedFlight.price + (businessClass ? 50000 : 0)) * payingPax;
  const visaCost = selectedVisa.price * payingPax;
  const hotelCost = selectedHotel.pricePerNight * selectedPlan.nights * payingPax;
  const cateringCost = catering ? 1400 * totalDays * payingPax : 0;
  const grandTotal =
    flightCost +
    visaCost +
    hotelCost +
    cateringCost +
    selectedMakkah.price +
    selectedMadinah.price +
    selectedTransfer.price +
    (fullTimeCar ? 900 * carHours : 0) +
    (teamLeader ? 10000 : 0);

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/send-umrah-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...contactForm,
          grandTotal,
          packageDetails: {
            plan: selectedPlan.label[lang],
            adults,
            hotel: selectedHotel.label[lang],
            makkahZiyarah: selectedMakkah.title[lang],
            madinahZiyarah: selectedMadinah.title[lang],
          },
        }),
      });
      const result = await res.json();
      if (result.success) setSuccessMsg(true);
    } catch (err) {
      alert('Error submitting request.');
    } finally {
      setSubmitting(false);
    }
  };

  const stepTitles =
    lang === 'bn'
      ? [
          'ওমরাহর ধরন',
          'মানুষের সংখ্যা',
          'এয়ার টিকিট',
          'ভিসা',
          'হোটেল',
          'ক্যাটারিং',
          'মক্কা জিয়ারাহ',
          'মদিনা জিয়ারাহ',
          'এয়ারপোর্ট ট্রান্সফার',
          'গাড়ি',
          'যোগাযোগ ও সাবমিট',
        ]
      : [
          'Umrah Type',
          'Travelers',
          'Air Ticket',
          'Visa',
          'Hotel',
          'Catering',
          'Makkah',
          'Madinah',
          'Transfer',
          'Car',
          'Contact & Submit',
        ];

  return (
    <section id="builder" className="section-spacer">
      <div className="container">
        <div className="builder-outer-card">
          <div className="builder-header-top">
            <div>
              <span className="planner-pill">NEXT TAWAF UMRAH PLANNER</span>
              <h2>{lang === 'bn' ? 'নিজের মতো করে ওমরাহ প্যাকেজ সাজিয়ে নিন' : 'Customize Your Own Umrah Package'}</h2>
            </div>
            <div className="step-indicator-text">
              {lang === 'bn' ? `ধাপ ${step} / ১১` : `Step ${step} / 11`}
            </div>
          </div>

          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${(step / 11) * 100}%` }} />
          </div>

          <div className="builder-main-grid">
            <div className="builder-step-box">
              {/* Step 1: Umrah Type */}
              {step === 1 && (
                <div>
                  <h3>{lang === 'bn' ? 'ধাপ ১: ওমরাহর ধরন নির্বাচন করুন' : 'Step 1: Select Umrah Type'}</h3>
                  <div className="option-cards-grid" style={{ marginTop: '14px' }}>
                    {UMRAH_PLANS.map((plan) => (
                      <label
                        key={plan.id}
                        className={`select-card ${planId === plan.id ? 'selected' : ''}`}
                        onClick={() => setPlanId(plan.id)}
                      >
                        <input type="radio" checked={planId === plan.id} readOnly />
                        <div>
                          <strong>{plan.label[lang]}</strong>
                          <span>{plan.nights} nights stay</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Travelers */}
              {step === 2 && (
                <div>
                  <h3>{lang === 'bn' ? 'ধাপ ২: যাত্রীর সংখ্যা' : 'Step 2: Number of Travelers'}</h3>
                  <div className="counter-grid" style={{ marginTop: '14px' }}>
                    <div className="counter-card">
                      <div>
                        <strong>{lang === 'bn' ? 'প্রাপ্তবয়স্ক (Adult)' : 'Adult'}</strong>
                      </div>
                      <div className="counter-controls">
                        <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))}>-</button>
                        <span>{adults}</span>
                        <button type="button" onClick={() => setAdults(adults + 1)}>+</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Flight */}
              {step === 3 && (
                <div>
                  <h3>{lang === 'bn' ? 'ধাপ ৩: এয়ার টিকিট' : 'Step 3: Air Ticket'}</h3>
                  <div className="option-cards-grid" style={{ marginTop: '14px' }}>
                    {FLIGHT_OPTIONS.map((f) => (
                      <label
                        key={f.id}
                        className={`select-card ${flightId === f.id ? 'selected' : ''}`}
                        onClick={() => setFlightId(f.id)}
                      >
                        <input type="radio" checked={flightId === f.id} readOnly />
                        <div>
                          <strong>{f.label[lang]} (৳{f.price.toLocaleString()})</strong>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Visa */}
              {step === 4 && (
                <div>
                  <h3>{lang === 'bn' ? 'ধাপ ৪: ভিসা নির্বাচন' : 'Step 4: Visa Option'}</h3>
                  <div className="option-cards-grid" style={{ marginTop: '14px' }}>
                    {VISA_OPTIONS.map((v) => (
                      <label
                        key={v.id}
                        className={`select-card ${visaId === v.id ? 'selected' : ''}`}
                        onClick={() => setVisaId(v.id)}
                      >
                        <input type="radio" checked={visaId === v.id} readOnly />
                        <div>
                          <strong>{v.label[lang]} (৳{v.price.toLocaleString()})</strong>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Hotel */}
              {step === 5 && (
                <div>
                  <h3>{lang === 'bn' ? 'ধাপ ৫: হোটেল ক্যাটাগরি' : 'Step 5: Hotel Category'}</h3>
                  <div className="option-cards-stack" style={{ marginTop: '14px' }}>
                    {HOTEL_OPTIONS.map((h) => (
                      <label
                        key={h.id}
                        className={`select-card ${hotelId === h.id ? 'selected' : ''}`}
                        onClick={() => setHotelId(h.id)}
                      >
                        <input type="radio" checked={hotelId === h.id} readOnly />
                        <div>
                          <strong>{h.label[lang]} – ৳{h.pricePerNight.toLocaleString()} / night</strong>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 6: Catering */}
              {step === 6 && (
                <div>
                  <h3>{lang === 'bn' ? 'ধাপ ৬: ক্যাটারিং / খাবার' : 'Step 6: Catering Meals'}</h3>
                  <div className="option-cards-grid" style={{ marginTop: '14px' }}>
                    <label className={`select-card ${catering ? 'selected' : ''}`} onClick={() => setCatering(true)}>
                      <input type="radio" checked={catering} readOnly />
                      <div><strong>{lang === 'bn' ? 'হ্যাঁ (৳১,৪০০ প্রতি দিন)' : 'Yes (৳1,400 per day)'}</strong></div>
                    </label>
                    <label className={`select-card ${!catering ? 'selected' : ''}`} onClick={() => setCatering(false)}>
                      <input type="radio" checked={!catering} readOnly />
                      <div><strong>{lang === 'bn' ? 'না' : 'No'}</strong></div>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 7: Makkah Ziyarah */}
              {step === 7 && (
                <div>
                  <h3>{lang === 'bn' ? 'ধাপ ৭: মক্কা জিয়ারাহ প্যাকেজ' : 'Step 7: Makkah Ziyarah'}</h3>
                  <div className="option-cards-stack" style={{ marginTop: '14px' }}>
                    {MAKKAH_ZIYARAH.map((pkg) => (
                      <label
                        key={pkg.id}
                        className={`select-card ${makkahZiyarahId === pkg.id ? 'selected' : ''}`}
                        onClick={() => setMakkahZiyarahId(pkg.id)}
                      >
                        <input type="radio" checked={makkahZiyarahId === pkg.id} readOnly />
                        <div>
                          <strong>{pkg.title[lang]}</strong>
                          <span style={{ display: 'block', marginTop: '4px', color: '#1d5ce6', fontWeight: 700 }}>
                            {pkg.price === 0 ? (lang === 'bn' ? 'ফ্রি / প্রয়োজন নেই' : 'Free / None') : `৳${pkg.price.toLocaleString()}`}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 8: Madinah Ziyarah */}
              {step === 8 && (
                <div>
                  <h3>{lang === 'bn' ? 'ধাপ ৮: মদিনা জিয়ারাহ প্যাকেজ' : 'Step 8: Madinah Ziyarah'}</h3>
                  <div className="option-cards-stack" style={{ marginTop: '14px' }}>
                    {MADINAH_ZIYARAH.map((pkg) => (
                      <label
                        key={pkg.id}
                        className={`select-card ${madinahZiyarahId === pkg.id ? 'selected' : ''}`}
                        onClick={() => setMadinahZiyarahId(pkg.id)}
                      >
                        <input type="radio" checked={madinahZiyarahId === pkg.id} readOnly />
                        <div>
                          <strong>{pkg.title[lang]}</strong>
                          <span style={{ display: 'block', marginTop: '4px', color: '#1d5ce6', fontWeight: 700 }}>
                            {pkg.price === 0 ? (lang === 'bn' ? 'ফ্রি / প্রয়োজন নেই' : 'Free / None') : `৳${pkg.price.toLocaleString()}`}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 9: Airport Transfer */}
              {step === 9 && (
                <div>
                  <h3>{lang === 'bn' ? 'ধাপ ৯: এয়ারপোর্ট ট্রান্সফার' : 'Step 9: Airport Transfer'}</h3>
                  <div className="option-cards-stack" style={{ marginTop: '14px' }}>
                    {TRANSFER_OPTIONS.map((t) => (
                      <label
                        key={t.id}
                        className={`select-card ${transferId === t.id ? 'selected' : ''}`}
                        onClick={() => setTransferId(t.id)}
                      >
                        <input type="radio" checked={transferId === t.id} readOnly />
                        <div>
                          <strong>{t.label[lang]}</strong>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 10: Full-Time Car */}
              {step === 10 && (
                <div>
                  <h3>{lang === 'bn' ? 'ধাপ ১০: সার্বক্ষণিক গাড়ি' : 'Step 10: Full-Time Car'}</h3>
                  <div className="option-cards-grid" style={{ marginTop: '14px' }}>
                    <label className={`select-card ${fullTimeCar ? 'selected' : ''}`} onClick={() => setFullTimeCar(true)}>
                      <input type="radio" checked={fullTimeCar} readOnly />
                      <div><strong>{lang === 'bn' ? 'হ্যাঁ (৳৯০০/ঘণ্টা)' : 'Yes'}</strong></div>
                    </label>
                    <label className={`select-card ${!fullTimeCar ? 'selected' : ''}`} onClick={() => setFullTimeCar(false)}>
                      <input type="radio" checked={!fullTimeCar} readOnly />
                      <div><strong>{lang === 'bn' ? 'না' : 'No'}</strong></div>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 11: Contact Form */}
              {step === 11 && (
                <div>
                  <h3>{lang === 'bn' ? 'ধাপ ১১: যোগাযোগের তথ্য দিন' : 'Step 11: Contact Details'}</h3>
                  {successMsg ? (
                    <div style={{ background: '#dcfce7', color: '#166534', padding: '20px', borderRadius: '12px', textAlign: 'center', marginTop: '14px' }}>
                      <h3>✓ {lang === 'bn' ? 'রিকোয়েস্ট সফলভাবে জমা হয়েছে!' : 'Request Submitted Successfully!'}</h3>
                    </div>
                  ) : (
                    <form onSubmit={handleFinalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '14px' }}>
                      <input type="text" required placeholder={lang === 'bn' ? 'পূর্ণ নাম' : 'Full Name'} value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                      <input type="tel" required placeholder="Mobile / WhatsApp" value={contactForm.phone} onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                      <input type="email" required placeholder="Email Address" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                      <button type="submit" disabled={submitting} style={{ background: '#25d366', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}>
                        {submitting ? 'Sending...' : 'Confirm Request & Send Summary ✓'}
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              {step < 11 && (
                <div className="step-footer-actions">
                  <button type="button" className="btn-prev" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
                    ← {lang === 'bn' ? 'পূর্ববর্তী' : 'Previous'}
                  </button>
                  <button type="button" className="btn-next" onClick={() => setStep(step + 1)}>
                    {lang === 'bn' ? 'পরবর্তী' : 'Next'} →
                  </button>
                </div>
              )}
            </div>

            {/* Live Summary Sidebar */}
            <div className="live-summary-card">
              <div>
                <div className="live-tag">{lang === 'bn' ? 'লাইভ প্রাইস ক্যালকুলেশন' : 'LIVE PRICE'}</div>
                <h3>{lang === 'bn' ? 'আপনার প্যাকেজ' : 'Your Package'}</h3>
                <div className="summary-lines">
                  <div className="s-line">
                    <span>{selectedPlan.label[lang]}</span>
                    <strong>৳{hotelCost.toLocaleString()}</strong>
                  </div>
                  <div className="s-line">
                    <span>{selectedFlight.label[lang]}</span>
                    <strong>৳{flightCost.toLocaleString()}</strong>
                  </div>
                  <div className="s-line">
                    <span>{selectedVisa.label[lang]}</span>
                    <strong>৳{visaCost.toLocaleString()}</strong>
                  </div>
                </div>
                <div className="grand-total-box">
                  <span>{lang === 'bn' ? 'সর্বমোট' : 'Grand Total'}</span>
                  <strong>৳{grandTotal.toLocaleString()}</strong>
                </div>
              </div>

              {step < 11 && (
                <button
                  type="button"
                  className="btn-whatsapp-submit"
                  onClick={() => setStep(11)}
                  style={{ marginTop: '14px', width: '100%', background: '#1d5ce6' }}
                >
                  {lang === 'bn' ? 'তথ্য দিয়ে শেষ করুন →' : 'Enter Details & Finish →'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}