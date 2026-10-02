import Link from 'next/link';
import AdSense from '@/components/AdSense';
import { FileSpreadsheet, Image as ImageIcon, QrCode, Wand2 } from 'lucide-react';

export const metadata = {
  title: 'Free Web Tools - PDF, QR, Image Conversion',
  description: 'A collection of free, privacy-first web tools that run locally in your browser.',
};

export default function Home() {
  const tools = [
    {
      href: "/pdf-to-excel",
      title: "PDF to Excel",
      desc: "Extract tables from PDFs without uploading your files.",
      icon: <FileSpreadsheet className="w-8 h-8 text-green-400" />
    },
    {
      href: "/image-to-webp",
      title: "Image to WebP",
      desc: "Convert PNG/JPG to WebP for better web performance.",
      icon: <ImageIcon className="w-8 h-8 text-blue-400" />
    },
    {
      href: "/qr-generator",
      title: "QR Generator",
      desc: "Create custom QR codes with a center logo.",
      icon: <QrCode className="w-8 h-8 text-purple-400" />
    },
    {
      href: "/remove-background",
      title: "Background Remover",
      desc: "Remove image backgrounds using local AI (WASM).",
      icon: <Wand2 className="w-8 h-8 text-yellow-400" />
    }
  ];

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Free, Private Web Tools</h1>
        <p className="text-[#8a8a93] max-w-2xl mx-auto">
          No uploads. No tracking. No limits. All processing is done locally in your browser.
        </p>
      </div>

      <AdSense dataAdSlot="home-top-ad" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <Link href={tool.href} key={tool.title} className="block group">
            <div className="border border-[#1e1e22] bg-[#121214] p-6 rounded-xl hover:border-[#3a3a44] transition-colors h-full flex flex-col items-start gap-4">
              <div className="p-3 bg-[#1a1a1e] rounded-lg group-hover:bg-[#2a2a30] transition-colors">
                {tool.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-2">{tool.title}</h2>
                <p className="text-[#8a8a93]">{tool.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <AdSense dataAdSlot="home-bottom-ad" />
    </div>
  );
}
