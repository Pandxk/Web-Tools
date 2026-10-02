import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'FreeTools - Free Online Web Tools',
  description: 'Convert PDFs to Excel, create QR codes, convert images to WebP, and remove backgrounds completely free. 100% local processing in your browser.',
  keywords: 'pdf to excel, qr code generator, webp converter, remove background, free tools',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Descomenta esto y pon tu Client ID de AdSense cuando Vercel esté en vivo */}
        {/* <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous" strategy="lazyOnload" /> */}
      </head>
      <body className={`${inter.className} bg-[#0e0e10] text-[#d0d0d6] min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-10">
          {children}
        </main>
        <footer className="border-t border-[#1e1e22] py-8 text-center text-[#6b6b75] text-sm">
          <p>© {new Date().getFullYear()} FreeTools. Built for speed and privacy.</p>
        </footer>
      </body>
    </html>
  );
}
