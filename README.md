# Free Web Tools

Plataforma de herramientas web gratuitas, procesadas 100% en el navegador (Client-Side) para máxima privacidad y cero costos de servidor.

Construido con **Next.js** y **TailwindCSS**.

## 🚀 Cómo correr el proyecto localmente

Instala las dependencias y corre el servidor de desarrollo:
```bash
npm install
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📝 Tareas Pendientes (Para hacer luego)

- [ ] **Comprar Dominio Propio**: Comprar un dominio en Namecheap o GoDaddy (ej: mis-herramientas.com).
- [ ] **Conectar Dominio a Vercel**: Agregar el dominio en el panel de Vercel (Settings -> Domains).
- [ ] **Activar AdSense (Paso 1)**: Solicitar aprobación en Google AdSense con el nuevo dominio.
- [ ] **Activar AdSense (Paso 2)**: Descomentar la línea del script en `src/app/layout.js` y poner el Client ID (ca-pub-XXX).
- [ ] **Activar AdSense (Paso 3)**: Descomentar el bloque de anuncio en `src/components/AdSense.js` y poner el Slot ID.
- [ ] **Añadir nuevas herramientas**: (Ej: Unir PDFs, Comprimir imágenes, Extraer MP3 de Video).

---

## 🛡️ Notas de Seguridad
El comando `npm audit` puede mostrar una vulnerabilidad "High" en la librería `xlsx` (SheetJS). **Puedes ignorar esta alerta.** 
Esa vulnerabilidad solo es peligrosa si `xlsx` se ejecutara en un servidor (Backend), pero nuestra aplicación funciona 100% en el navegador del usuario (Client-side). Si alguien sube un archivo malicioso, solo congelará su propia pestaña, tu plataforma y Vercel están 100% seguros.
