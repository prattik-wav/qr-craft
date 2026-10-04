import QRCodeStyling from 'qr-code-styling';
import { useState } from 'react';
import { IconDownload, IconCopy, IconCheck } from './Icons';

interface Props {
  qrInstanceRef: React.RefObject<QRCodeStyling | null>;
  hasContent: boolean;
}

export default function DownloadBar({ qrInstanceRef, hasContent }: Props) {
  const [copied, setCopied] = useState(false);

  const handleDownload = (ext: 'png' | 'svg') => {
    const qr = qrInstanceRef.current;
    if (!qr || !hasContent) return;
    qr.download({
      name: 'qr-code',
      extension: ext,
    });
  };

  const handleCopy = async () => {
    const qr = qrInstanceRef.current;
    if (!qr || !hasContent) return;
    try {
      const blob = await qr.getRawData('png');
      if (!blob) return;
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
      handleDownload('png');
    }
  };

  return (
    <div className="download-bar">
      <button
        className="dl-btn primary"
        onClick={() => handleDownload('png')}
        disabled={!hasContent}
      >
        <IconDownload /> PNG
      </button>
      <button
        className="dl-btn"
        onClick={() => handleDownload('svg')}
        disabled={!hasContent}
      >
        <IconDownload /> SVG
      </button>
      <button
        className="dl-btn"
        onClick={handleCopy}
        disabled={!hasContent}
      >
        {copied ? <><IconCheck /> Copied!</> : <><IconCopy /> Copy</>}
      </button>
    </div>
  );
}
