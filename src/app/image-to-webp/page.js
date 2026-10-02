"use client";
import { useState, useRef } from "react";
import AdSense from "@/components/AdSense";

export default function ImageToWebP() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [quality, setQuality] = useState(0.8);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type.startsWith("image/")) {
      setFile(selected);
      const url = URL.createObjectURL(selected);
      setPreview(url);
    }
  };

  const convertImage = () => {
    if (!file) return;
    const img = new Image();
    img.src = preview;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name.replace(/\.[^/.]+$/, ".webp");
        a.click();
      }, "image/webp", quality);
    };
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">Image to WebP</h1>
        <p className="text-[#8a8a93]">Convert PNG/JPG to WebP format instantly.</p>
      </div>

      <AdSense dataAdSlot="webp-top" />

      <div className="border border-[#1e1e22] bg-[#121214] p-8 rounded-xl space-y-6">
        <div className="border-2 border-dashed border-[#3a3a44] rounded-lg p-10 text-center hover:border-white transition-colors relative">
          <input 
            type="file" 
            accept="image/png, image/jpeg" 
            onChange={handleFileChange} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <p className="text-[#d0d0d6] font-bold">
            {file ? file.name : "Click or drop an image"}
          </p>
        </div>

        {preview && (
          <div className="space-y-4">
            <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
            <div>
              <label className="block text-sm text-[#8a8a93] mb-2">Quality: {Math.round(quality * 100)}%</label>
              <input 
                type="range" 
                min="0.1" max="1" step="0.1" 
                value={quality} 
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full accent-white"
              />
            </div>
            <button 
              onClick={convertImage}
              className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
            >
              Download WebP
            </button>
          </div>
        )}
      </div>

      <AdSense dataAdSlot="webp-bottom" />
    </div>
  );
}
