import { Noto_Sans_Bengali, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/LanguageContext';

const notoSansBengali = Noto_Sans_Bengali({ subsets: ['bengali'], weight: ['400', '500', '600', '700', '800'] });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });

export const metadata = {
  title: 'Sheba Travels International',
  description: 'ফিরে আসুন আপনার রবের দিকে - আপনার এই সফর নিরাপদ ও সুন্দর রাখতে জয়েন করুন নেক্সট তাওয়াফ প্রোগ্রামে।',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className={`${notoSansBengali.className} ${plusJakarta.className}`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}