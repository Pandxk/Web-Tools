"use client";
import { useState, useRef } from "react";
import AdSense from "@/components/AdSense";
import * as XLSX from "xlsx";
import * as pdfjsLib from "pdfjs-dist/build/pdf.min.mjs";

// Initialize PDF.js worker
if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
}

export default function PdfToExcel() {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
      setError("");
    } else {
      setError("Please select a valid PDF file.");
    }
  };

  const processPDF = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError("");

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      let allRows = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        // Basic heuristic to group by Y position (rows)
        const items = textContent.items;
        const rowsMap = new Map();
        
        items.forEach(item => {
          const y = Math.round(item.transform[5] / 5) * 5; // Grouping tolerance
          if (!rowsMap.has(y)) rowsMap.set(y, []);
          rowsMap.get(y).push(item);
        });

        // Sort rows top to bottom
        const sortedY = Array.from(rowsMap.keys()).sort((a, b) => b - a);
        
        sortedY.forEach(y => {
          // Sort items in row left to right
          const rowItems = rowsMap.get(y).sort((a, b) => a.transform[4] - b.transform[4]);
          allRows.push(rowItems.map(i => i.str));
        });
      }

      if (allRows.length === 0) {
        throw new Error("No text found in PDF");
      }

      const ws = XLSX.utils.aoa_to_sheet(allRows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, file.name.replace(".pdf", ".xlsx"));
    } catch (err) {
      console.error(err);
      setError("Error processing PDF: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">PDF to Excel</h1>
        <p className="text-[#8a8a93]">Extract tables from PDF files entirely in your browser.</p>
      </div>

      <AdSense dataAdSlot="pdf-excel-top" />

      <div className="border border-[#1e1e22] bg-[#121214] p-8 rounded-xl space-y-6">
        <div className="border-2 border-dashed border-[#3a3a44] rounded-lg p-10 text-center hover:border-white transition-colors cursor-pointer relative">
          <input 
            type="file" 
            accept=".pdf" 
            onChange={handleFileChange} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <p className="text-[#d0d0d6] font-bold mb-2">
            {file ? file.name : "Click or drag a PDF here"}
          </p>
          <p className="text-sm text-[#6b6b75]">Maximum privacy. No files are uploaded.</p>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button 
          onClick={processPDF}
          disabled={!file || isProcessing}
          className="w-full py-3 bg-white text-black font-bold rounded-lg disabled:opacity-50 hover:bg-gray-200 transition-colors"
        >
          {isProcessing ? "Processing..." : "Convert to Excel"}
        </button>
      </div>

      <AdSense dataAdSlot="pdf-excel-bottom" />
    </div>
  );
}
