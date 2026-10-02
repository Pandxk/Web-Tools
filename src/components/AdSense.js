export default function AdSense({ dataAdSlot }) {
  return (
    <div className="my-8 text-center border-2 border-dashed border-gray-600 rounded-lg p-4 bg-gray-900 bg-opacity-50">
      <p className="text-sm text-gray-400 mb-2">Publicidad (Espacio AdSense)</p>
      {/* 
        Para habilitar AdSense en Vercel:
        1. Incluye el script de AdSense en app/layout.js 
        2. Descomenta este código y añade tu client ID y slot ID.
      */}
      {/* 
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot={dataAdSlot || "XXXXXXXXXX"}
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
      <script>
           (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
      */}
      <div className="h-[90px] flex items-center justify-center text-gray-600">
        Bloque de anuncio ({dataAdSlot || 'automático'})
      </div>
    </div>
  );
}
