"use client";
import { useState, useRef, useEffect } from "react";
import AdSense from "@/components/AdSense";
import QRCode from "qrcode";

export default function QRGenerator() {
  const [text, setText] = useState("https://freetools.vercel.app");
  const [logo, setLogo] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    generateQR();
  }, [text, logo]);

  const generateQR = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !text) return;

    try {
      await QRCode.toCanvas(canvas, text, {
        width: 300,
        margin: 2,
        color: { dark: "#000000ff", light: "#ffffffff" }
      });

      if (logo) {
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = logo;
        img.onload = () => {
          const size = 60;
          const x = (canvas.width - size) / 2;
          const y = (canvas.height - size) / 2;
          
          ctx.fillStyle = "white";
          ctx.fillRect(x - 5, y - 5, size + 10, size + 10);
          ctx.drawImage(img, x, y, size, size);
        };
      }
    } catch (err) {
      console.error("QR Generation Error:", err);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  const downloadQR = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.png";
    a.click();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">QR Code Generator</h1>
        <p className="text-[#8a8a93]">Create custom QR codes with a logo in the center.</p>
      </div>

      <AdSense dataAdSlot="qr-top" />

      <div className="border border-[#1e1e22] bg-[#121214] p-8 rounded-xl grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm text-[#8a8a93] mb-2">URL or Text</label>
            <input 
              type="text" 
              value={text} 
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-[#0e0e10] border border-[#2a2a30] text-white rounded px-4 py-2 focus:outline-none focus:border-white transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-[#8a8a93] mb-2">Center Logo (Optional)</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleLogoUpload}
              className="w-full text-sm text-[#8a8a93] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-gray-200"
            />
          </div>
          <button 
            onClick={downloadQR}
            className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Download PNG
          </button>
        </div>

        <div className="flex items-center justify-center bg-white rounded-xl p-4">
          <canvas ref={canvasRef}></canvas>
        </div>
      </div>

      <AdSense dataAdSlot="qr-bottom" />
    </div>
  );
}
