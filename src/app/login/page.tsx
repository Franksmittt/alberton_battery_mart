'use client';

import { FormEvent, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Download, Lock, Upload } from 'lucide-react';

const SOFT_PASSWORD = '85879';

type FormatType = 'size-vertical' | 'size-square';
type LayoutType = 'layout-1' | 'layout-2' | 'layout-3' | 'layout-4' | 'layout-5';

type StudioValues = {
  title: string;
  subtitle: string;
  voltage: string;
  tech: string;
  capacity: string;
  cranking: string;
};

const initialValues: StudioValues = {
  title: 'Ecoplus',
  subtitle: 'Heavy Duty',
  voltage: '12V',
  tech: 'Lead Acid',
  capacity: '89Ah',
  cranking: '670 CCA',
};

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [format, setFormat] = useState<FormatType>('size-vertical');
  const [layout, setLayout] = useState<LayoutType>('layout-1');
  const [values, setValues] = useState<StudioValues>(initialValues);
  const [bgImage, setBgImage] = useState<string>('');
  const adRef = useRef<HTMLDivElement>(null);

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    if (password === SOFT_PASSWORD) {
      setAuthenticated(true);
      setError('');
      return;
    }
    setError('Invalid password');
  };

  const handleValueChange = (key: keyof StudioValues, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setBgImage(String(event.target?.result || ''));
    };
    reader.readAsDataURL(file);
  };

  const downloadAd = async () => {
    if (!adRef.current) return;
    const canvas = await html2canvas(adRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
    });
    const link = document.createElement('a');
    link.download = `Alberton_Ad_${format}_${layout}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
        <div className="w-full max-w-md border border-white/10 bg-slate-900/80 backdrop-blur rounded-xl p-6 space-y-6 shadow-2xl">
          <div className="space-y-2 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-red-300">Alberton Battery Mart</p>
            <h1 className="text-3xl font-black">Login</h1>
            <p className="text-sm text-slate-300">Enter password to open social media overlay studio.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block text-sm font-semibold text-slate-200">
              Password
              <div className="relative mt-2">
                <Lock className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 rounded-md border border-white/20 bg-slate-950 px-10 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter access password"
                />
              </div>
            </label>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full h-11 rounded-md bg-red-600 hover:bg-red-500 transition-colors font-bold"
            >
              Open Studio
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#111] text-white py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="editor-panel">
          <div className="layout-selectors">
            <div className="control-group">
              <label>Format Size</label>
              <select value={format} onChange={(e) => setFormat(e.target.value as FormatType)}>
                <option value="size-vertical">Story / Reel (9:16 Vertical)</option>
                <option value="size-square">Feed Post (1:1 Square)</option>
              </select>
            </div>
            <div className="control-group">
              <label>Layout Style</label>
              <select value={layout} onChange={(e) => setLayout(e.target.value as LayoutType)}>
                <option value="layout-1">Layout 1: The Visionary (Center Focus)</option>
                <option value="layout-2">Layout 2: The Edge (Asymmetry)</option>
                <option value="layout-3">Layout 3: The Slash (Dynamic Motion)</option>
                <option value="layout-4">Layout 4: The Neural Grid (Widgets)</option>
                <option value="layout-5">Layout 5: Cinematic Glow (Max Contrast)</option>
              </select>
            </div>
          </div>

          <div className="controls-grid">
            <div className="control-group">
              <label>Product Name</label>
              <input
                value={values.title}
                onChange={(e) => handleValueChange('title', e.target.value)}
              />
            </div>
            <div className="control-group">
              <label>Model Note</label>
              <input
                value={values.subtitle}
                onChange={(e) => handleValueChange('subtitle', e.target.value)}
              />
            </div>
            <div className="control-group">
              <label>Voltage</label>
              <input
                value={values.voltage}
                onChange={(e) => handleValueChange('voltage', e.target.value)}
              />
            </div>
            <div className="control-group">
              <label>Technology</label>
              <input
                value={values.tech}
                onChange={(e) => handleValueChange('tech', e.target.value)}
              />
            </div>
            <div className="control-group">
              <label>Capacity</label>
              <input
                value={values.capacity}
                onChange={(e) => handleValueChange('capacity', e.target.value)}
              />
            </div>
            <div className="control-group">
              <label>Cranking</label>
              <input
                value={values.cranking}
                onChange={(e) => handleValueChange('cranking', e.target.value)}
              />
            </div>
          </div>

          <div className="action-buttons">
            <label className="btn-controls btn-primary" htmlFor="imageInput">
              <Upload className="h-4 w-4" />
              Upload Product Image
            </label>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => handleImageUpload(e.target.files?.[0])}
            />
            <button className="btn-controls btn-download" onClick={downloadAd}>
              <Download className="h-4 w-4" />
              Download Ad
            </button>
          </div>
        </div>

        <div className="preview-wrap">
          <div ref={adRef} className={`ad-wrapper ${format} ${layout}`}>
            <div
              className="bg-image"
              style={{
                backgroundImage: bgImage ? `url('${bgImage}')` : undefined,
              }}
            />
            <div className="overlay-layer" />
            <div className="content-layer">
              <div className="header-zone">
                <div className="brand-name">Alberton Battery Mart</div>
                <h1>{values.title}</h1>
                <div className="model-accent">{values.subtitle}</div>
              </div>
              <div className="bottom-group">
                <div className="spec-zone">
                  <div className="spec-item">
                    <div className="spec-label">Voltage</div>
                    <div className="spec-value">{values.voltage}</div>
                  </div>
                  <div className="spec-item">
                    <div className="spec-label">Technology</div>
                    <div className="spec-value">{values.tech}</div>
                  </div>
                  <div className="spec-item">
                    <div className="spec-label">Capacity</div>
                    <div className="spec-value">{values.capacity}</div>
                  </div>
                  <div className="spec-item">
                    <div className="spec-label">Cranking</div>
                    <div className="spec-value">{values.cranking}</div>
                  </div>
                </div>

                <div className="contact-zone">
                  <div className="contact-element">
                    <span className="contact-number">010 109 6211</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        :root {
          --charcoal: #050505;
          --emergency-red: #ff0000;
          --white: #ffffff;
          --glass-bg: rgba(15, 15, 15, 0.65);
          --glass-border: rgba(255, 0, 0, 0.4);
        }
        .editor-panel {
          background: #fff;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
          color: #111;
        }
        .controls-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 15px;
          margin-bottom: 20px;
        }
        .control-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .control-group label {
          font-size: 11px;
          font-weight: 800;
          color: #555;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .control-group input,
        .control-group select {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #111;
          background: #f9f9f9;
        }
        .layout-selectors {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #ddd;
        }
        .layout-selectors .control-group {
          flex: 1;
        }
        .action-buttons {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 10px;
        }
        .btn-controls {
          background: #444;
          border: none;
          color: white;
          padding: 12px 22px;
          cursor: pointer;
          font-weight: 800;
          border-radius: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 12px;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-controls:hover {
          transform: translateY(-2px);
        }
        .btn-primary {
          background: var(--charcoal);
        }
        .btn-download {
          background: var(--emergency-red);
        }
        .preview-wrap {
          display: flex;
          justify-content: center;
        }
        .ad-wrapper {
          position: relative;
          background: var(--charcoal);
          overflow: hidden;
          box-sizing: border-box;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.9);
          transition: width 0.3s ease, height 0.3s ease;
          font-family: 'Montserrat', system-ui, sans-serif;
        }
        .size-square {
          width: 800px;
          height: 800px;
        }
        .size-vertical {
          width: 450px;
          height: 800px;
        }
        .bg-image {
          position: absolute;
          top: -5%;
          left: -5%;
          width: 110%;
          height: 110%;
          background-size: cover;
          background-position: center;
          z-index: 1;
          background-image: radial-gradient(circle at center, #2f2f2f 0%, #080808 70%);
        }
        .overlay-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          pointer-events: none;
        }
        .content-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 3;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          color: white;
        }
        .brand-name {
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--emergency-red);
          margin-bottom: 5px;
        }
        h1 {
          font-weight: 900;
          margin: 0;
          line-height: 0.9;
          letter-spacing: -2px;
          color: var(--white);
        }
        .model-accent {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-top: 10px;
        }
        .spec-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 700;
          margin-bottom: 3px;
        }
        .spec-value {
          font-weight: 900;
          color: var(--white);
          line-height: 1;
        }
        .contact-element {
          display: flex;
          align-items: center;
          gap: 10px;
          color: white;
        }
        .contact-number {
          font-size: 18px;
          font-weight: 800;
          letter-spacing: 1px;
        }
        .layout-1 .overlay-layer {
          background: linear-gradient(180deg, rgba(5, 5, 5, 0.9) 0%, rgba(5, 5, 5, 0) 35%, rgba(5, 5, 5, 0) 65%, rgba(5, 5, 5, 0.95) 100%);
        }
        .layout-1 .content-layer {
          align-items: center;
          text-align: center;
          justify-content: space-between;
        }
        .layout-1 .header-zone {
          padding-top: 40px;
        }
        .layout-1 .bottom-group {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          padding-bottom: 30px;
        }
        .layout-1 .spec-zone {
          display: flex;
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
        }
        .layout-1 .contact-zone {
          display: flex;
          background: rgba(255, 0, 0, 0.15);
          padding: 12px 30px;
          border-radius: 50px;
          border: 1px solid rgba(255, 0, 0, 0.4);
        }
        .size-square.layout-1 h1 {
          font-size: 80px;
        }
        .size-square.layout-1 .spec-zone {
          padding: 25px 50px;
          gap: 50px;
        }
        .size-square.layout-1 .spec-value {
          font-size: 32px;
        }
        .size-vertical.layout-1 h1 {
          font-size: 55px;
        }
        .size-vertical.layout-1 .spec-zone {
          padding: 20px;
          gap: 15px;
          width: 90%;
          justify-content: space-around;
          flex-wrap: wrap;
        }
        .size-vertical.layout-1 .spec-value {
          font-size: 24px;
        }
        .layout-2 .overlay-layer {
          background: linear-gradient(90deg, rgba(5, 5, 5, 0.95) 0%, rgba(5, 5, 5, 0.6) 50%, rgba(5, 5, 5, 0) 100%);
        }
        .layout-2 .content-layer {
          justify-content: space-between;
          align-items: flex-start;
        }
        .layout-2 .header-zone {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          border-left: 6px solid var(--emergency-red);
          padding-left: 20px;
        }
        .layout-2 .model-accent {
          color: var(--emergency-red);
          font-weight: 900;
        }
        .size-square.layout-2 .content-layer {
          padding: 50px;
        }
        .size-square.layout-2 h1 {
          font-size: 90px;
        }
        .size-square.layout-2 .bottom-group {
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          justify-content: space-between;
          width: 100%;
        }
        .size-square.layout-2 .spec-zone {
          display: flex;
          gap: 40px;
          padding-left: 26px;
        }
        .size-square.layout-2 .spec-value {
          font-size: 36px;
        }
        .size-vertical.layout-2 .overlay-layer {
          background: linear-gradient(180deg, rgba(5, 5, 5, 0.95) 0%, rgba(5, 5, 5, 0.4) 40%, rgba(5, 5, 5, 0) 60%, rgba(5, 5, 5, 0.95) 100%);
        }
        .size-vertical.layout-2 .content-layer {
          padding: 40px 25px;
        }
        .size-vertical.layout-2 h1 {
          font-size: 60px;
        }
        .size-vertical.layout-2 .spec-zone {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 25px;
          padding-left: 26px;
        }
        .size-vertical.layout-2 .spec-value {
          font-size: 26px;
        }
        .layout-3 .overlay-layer {
          background: rgba(5, 5, 5, 0.85);
        }
        .layout-3 .content-layer {
          justify-content: space-between;
        }
        .layout-3 .header-zone {
          transform: skewX(-8deg);
        }
        .layout-3 .brand-name {
          background: var(--emergency-red);
          color: var(--white);
          display: inline-block;
          padding: 6px 15px;
          margin-bottom: 10px;
        }
        .layout-3 h1 {
          font-style: italic;
        }
        .layout-3 .spec-zone {
          background: rgba(0, 0, 0, 0.8);
          border-left: 8px solid var(--emergency-red);
          transform: skewX(-8deg);
        }
        .layout-3 .spec-item {
          transform: skewX(8deg);
        }
        .layout-3 .contact-zone {
          padding-top: 15px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }
        .size-square.layout-3 .overlay-layer {
          clip-path: polygon(0 0, 100% 0, 100% 25%, 0 85%);
        }
        .size-square.layout-3 .content-layer {
          padding: 50px;
        }
        .size-square.layout-3 h1 {
          font-size: 85px;
        }
        .size-square.layout-3 .spec-zone {
          display: flex;
          gap: 40px;
          padding: 25px 40px;
          width: fit-content;
          margin-bottom: 30px;
        }
        .size-square.layout-3 .spec-value {
          font-size: 32px;
        }
        .size-vertical.layout-3 .overlay-layer {
          clip-path: polygon(0 0, 100% 0, 100% 40%, 0 20%);
        }
        .size-vertical.layout-3 .content-layer {
          padding: 35px 25px;
        }
        .size-vertical.layout-3 h1 {
          font-size: 55px;
        }
        .size-vertical.layout-3 .spec-zone {
          display: flex;
          flex-direction: column;
          gap: 15px;
          padding: 20px;
          margin-bottom: 20px;
        }
        .size-vertical.layout-3 .spec-value {
          font-size: 26px;
        }
        .layout-4 .overlay-layer {
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(4px);
        }
        .layout-4 .header-zone {
          border-bottom: 2px solid var(--emergency-red);
          padding-bottom: 20px;
          margin-bottom: auto;
        }
        .layout-4 .spec-zone {
          display: grid;
          gap: 15px;
        }
        .layout-4 .spec-item {
          background: var(--glass-bg);
          border: 1px solid rgba(255, 0, 0, 0.2);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
          border-left: 4px solid var(--emergency-red);
        }
        .size-square.layout-4 .content-layer {
          padding: 50px;
        }
        .size-square.layout-4 h1 {
          font-size: 75px;
        }
        .size-square.layout-4 .spec-zone {
          grid-template-columns: repeat(4, 1fr);
          margin-bottom: 40px;
        }
        .size-square.layout-4 .spec-value {
          font-size: 28px;
        }
        .size-vertical.layout-4 .content-layer {
          padding: 35px 25px;
        }
        .size-vertical.layout-4 h1 {
          font-size: 50px;
        }
        .size-vertical.layout-4 .spec-zone {
          grid-template-columns: 1fr 1fr;
          margin-bottom: 25px;
        }
        .size-vertical.layout-4 .spec-value {
          font-size: 22px;
        }
        .layout-5 .overlay-layer {
          background: radial-gradient(circle at center, rgba(10, 10, 10, 0.1) 0%, rgba(10, 10, 10, 0.95) 85%);
          box-shadow: inset 0 0 120px #000;
        }
        .layout-5 .content-layer {
          justify-content: space-between;
          align-items: center;
          text-align: center;
        }
        .layout-5 h1 {
          color: var(--white);
          text-shadow: 0 0 30px rgba(255, 0, 0, 0.6);
        }
        .layout-5 .contact-zone {
          justify-content: center;
          background: var(--emergency-red);
          padding: 15px;
          width: 100%;
          box-sizing: border-box;
        }
        .size-square.layout-5 .content-layer {
          padding: 0;
        }
        .size-square.layout-5 .header-zone {
          padding-top: 50px;
        }
        .size-square.layout-5 h1 {
          font-size: 85px;
        }
        .size-square.layout-5 .spec-zone {
          display: flex;
          justify-content: center;
          gap: 50px;
          margin-bottom: 40px;
          background: rgba(0, 0, 0, 0.8);
          width: 100%;
          padding: 20px 0;
          border-top: 2px solid var(--emergency-red);
          border-bottom: 2px solid var(--emergency-red);
        }
        .size-square.layout-5 .spec-value {
          font-size: 36px;
        }
        .size-vertical.layout-5 .content-layer {
          padding: 0;
        }
        .size-vertical.layout-5 .header-zone {
          padding-top: 40px;
        }
        .size-vertical.layout-5 h1 {
          font-size: 60px;
        }
        .size-vertical.layout-5 .spec-zone {
          display: flex;
          flex-direction: column;
          width: 100%;
          background: rgba(0, 0, 0, 0.8);
          margin-bottom: 0;
          border-top: 2px solid var(--emergency-red);
        }
        .size-vertical.layout-5 .spec-item {
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding: 15px 30px;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          text-align: left;
        }
        .size-vertical.layout-5 .spec-value {
          font-size: 24px;
        }
        @media (max-width: 900px) {
          .size-square {
            width: 92vw;
            height: 92vw;
          }
          .size-vertical {
            width: min(92vw, 450px);
            height: calc(min(92vw, 450px) * 1.7778);
          }
          .layout-selectors {
            flex-direction: column;
          }
        }
      `}</style>
    </main>
  );
}
