"use client";
import { useState } from "react";
import AdSense from "@/components/AdSense";
import { removeBackground } from "@imgly/background-removal";

export default function RemoveBackground() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type.startsWith("image/")) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(null);
    }
  };

  const removeBg = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      // imgly background removal
      const imageBlob = await removeBackground(file);
      const url = URL.createObjectURL(imageBlob);
      setResult(url);
    } catch (err) {
      console.error(err);
      alert("Error removing background. It might be downloading the WASM model.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">Background Remover</h1>
        <p className="text-[#8a8a93]">Remove image backgrounds using local AI (WASM).</p>
      </div>

      <AdSense dataAdSlot="bg-remover-top" />

      <div className="border border-[#1e1e22] bg-[#121214] p-8 rounded-xl space-y-6">
        <div className="border-2 border-dashed border-[#3a3a44] rounded-lg p-10 text-center hover:border-white transition-colors relative">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <p className="text-[#d0d0d6] font-bold">
            {file ? file.name : "Click or drop an image"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {preview && (
            <div>
              <p className="text-sm text-[#8a8a93] mb-2 text-center">Original</p>
              <img src={preview} alt="Original" className="max-h-64 mx-auto rounded-lg object-contain" />
            </div>
          )}
          {result && (
            <div>
              <p className="text-sm text-[#8a8a93] mb-2 text-center">Result</p>
              {/* Checkerboard pattern for transparent images */}
              <div 
                className="max-h-64 rounded-lg overflow-hidden flex justify-center"
                style={{
                  backgroundImage: "linear-gradient(45deg, #1e1e22 25%, transparent 25%), linear-gradient(-45deg, #1e1e22 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1e1e22 75%), linear-gradient(-45deg, transparent 75%, #1e1e22 75%)",
                  backgroundSize: "20px 20px",
                  backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px"
                }}
              >
                <img src={result} alt="Removed Background" className="max-h-64 object-contain" />
              </div>
            </div>
          )}
        </div>

        {file && !result && (
          <button 
            onClick={removeBg}
            disabled={isProcessing}
            className="w-full py-3 bg-white text-black font-bold rounded-lg disabled:opacity-50 hover:bg-gray-200 transition-colors"
          >
            {isProcessing ? "Processing (may take a moment to load AI)..." : "Remove Background"}
          </button>
        )}

        {result && (
          <a 
            href={result}
            download="nobg-image.png"
            className="block text-center w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
          >
            Download PNG
          </a>
        )}
      </div>

      <AdSense dataAdSlot="bg-remover-bottom" />
    </div>
  );
}
