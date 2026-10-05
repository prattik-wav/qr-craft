import { useState, useRef, useCallback } from 'react';
import QRCodeStyling from 'qr-code-styling';

import { QRData, QRStyleOptions, SavedQR, DEFAULT_QR_DATA, DEFAULT_STYLE } from './types';
import { buildQRString, validateInput, getDisplayLabel } from './utils';
import { useLocalStorage } from './hooks/useLocalStorage';

import Header from './components/Header';
import TypeSelector from './components/TypeSelector';
import InputForm from './components/InputForm';
import Customizer from './components/Customizer';
import PresetPicker from './components/PresetPicker';
import QRPreview from './components/QRPreview';
import DownloadBar from './components/DownloadBar';
import RecentCodes from './components/RecentCodes';
import Footer from './components/Footer';

import './App.css';

function App() {
  const [qrData, setQrData] = useState<QRData>({ ...DEFAULT_QR_DATA });
  const [qrStyle, setQrStyle] = useState<QRStyleOptions>({ ...DEFAULT_STYLE });
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('qr-craft-theme', 'light');
  const [savedCodes, setSavedCodes] = useLocalStorage<SavedQR[]>('qr-craft-recent', []);

  const qrInstanceRef = useRef<QRCodeStyling | null>(null);

  // build the actual string that goes into the QR code
  const qrString = buildQRString(qrData);
  const validationError = qrString ? validateInput(qrData) : null;
  const hasValidContent = !!qrString && !validationError;

  const handleDataChange = useCallback((updates: Partial<QRData>) => {
    setQrData((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleStyleChange = useCallback((updates: Partial<QRStyleOptions>) => {
    setQrStyle((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleTypeChange = useCallback((type: QRData['type']) => {
    setQrData((prev) => ({ ...prev, type }));
  }, []);

  const handlePresetApply = useCallback((updates: Partial<QRStyleOptions>) => {
    setQrStyle((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleSave = useCallback(async () => {
    if (!qrInstanceRef.current || !hasValidContent) return;

    try {
      const blob = await qrInstanceRef.current.getRawData('png');
      if (!blob) return;

      const reader = new FileReader();
      reader.onload = () => {
        const newEntry: SavedQR = {
          id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
          type: qrData.type,
          data: qrString,
          label: getDisplayLabel(qrData),
          style: { ...qrStyle },
          thumbnail: reader.result as string,
          createdAt: Date.now(),
        };

        setSavedCodes((prev) => {
          const updated = [newEntry, ...prev.slice(0, 11)];
          return updated;
        });
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      console.error('Could not save QR code:', err);
    }
  }, [hasValidContent, qrData, qrString, qrStyle, setSavedCodes]);

  const handleLoadSaved = useCallback((saved: SavedQR) => {
    setQrStyle({ ...saved.style });
  }, []);

  const handleDeleteSaved = useCallback(
    (id: string) => {
      setSavedCodes((prev) => prev.filter((c) => c.id !== id));
    },
    [setSavedCodes]
  );

  const handleClearAll = useCallback(() => {
    setSavedCodes([]);
  }, [setSavedCodes]);

  return (
    <div className="app" data-theme={theme}>
      <Header
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      />

      <main className="main-layout">
        {/* Left panel — inputs & controls */}
        <div className="panel panel-left">
          <TypeSelector selected={qrData.type} onChange={handleTypeChange} />
          <InputForm data={qrData} onChange={handleDataChange} error={validationError} />
          <PresetPicker onApply={handlePresetApply} />
          <Customizer style={qrStyle} onChange={handleStyleChange} />
        </div>

        {/* Right panel — preview & actions */}
        <div className="panel panel-right">
          <div className="sticky-preview">
            <QRPreview
              data={hasValidContent ? qrString : ''}
              style={qrStyle}
              qrInstanceRef={qrInstanceRef}
            />
            <DownloadBar qrInstanceRef={qrInstanceRef} hasContent={hasValidContent} />
            {hasValidContent && (
              <button className="save-btn" onClick={handleSave}>
                💾 Save to Recent
              </button>
            )}
            <RecentCodes
              codes={savedCodes}
              onLoad={handleLoadSaved}
              onDelete={handleDeleteSaved}
              onClearAll={handleClearAll}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
