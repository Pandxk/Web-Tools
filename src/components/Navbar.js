import Link from 'next/link';
import { Wrench } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b border-[#1e1e22] bg-[#0e0e10] py-4 px-6 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
          <Wrench className="w-6 h-6" />
          <span className="font-bold text-lg tracking-tight">FreeTools</span>
        </Link>
        <div className="flex gap-6 text-sm text-[#8a8a93]">
          <Link href="/pdf-to-excel" className="hover:text-white transition-colors">PDF to Excel</Link>
          <Link href="/image-to-webp" className="hover:text-white transition-colors">Image to WebP</Link>
          <Link href="/qr-generator" className="hover:text-white transition-colors">QR Generator</Link>
          <Link href="/remove-background" className="hover:text-white transition-colors">Remove Background</Link>
        </div>
      </div>
    </nav>
  );
}
