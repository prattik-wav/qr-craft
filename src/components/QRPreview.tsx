import { useEffect, useRef, useCallback } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { QRStyleOptions } from '../types';

interface Props {
  data: string;
  style: QRStyleOptions;
  qrInstanceRef: React.MutableRefObject<QRCodeStyling | null>;
}

export default function QRPreview({ data, style, qrInstanceRef }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const buildOptions = useCallback(() => {
    return {
      width: style.size,
      height: style.size,
      data: data || 'https://example.com',
      margin: style.margin,
      qrOptions: {
        errorCorrectionLevel: style.errorCorrection,
      },
      dotsOptions: {
        color: style.fgColor,
        type: style.dotStyle,
      },
      cornersSquareOptions: {
        color: style.fgColor,
        type: style.cornerSquareStyle,
      },
      cornersDotOptions: {
        color: style.fgColor,
        type: style.cornerDotStyle,
      },
      backgroundOptions: {
        color: style.bgColor,
      },
      image: style.logoDataUrl || undefined,
      imageOptions: {
        crossOrigin: 'anonymous' as const,
        margin: 4,
        imageSize: style.logoSize / 100,
      },
    };
  }, [data, style]);

  useEffect(() => {
    if (!containerRef.current) return;

    const options = buildOptions();

    if (qrInstanceRef.current) {
      // just update the existing instance to avoid flicker
      qrInstanceRef.current.update(options);
    } else {
      const qr = new QRCodeStyling(options);
      containerRef.current.innerHTML = '';
      qr.append(containerRef.current);
      qrInstanceRef.current = qr;
    }
  }, [buildOptions, qrInstanceRef]);

  return (
    <div className="qr-preview">
      <div className="qr-preview-label">Preview</div>
      <div
        ref={containerRef}
        className="qr-canvas-wrap"
        style={{ maxWidth: style.size, maxHeight: style.size }}
      />
      {!data && (
        <p className="preview-placeholder">Enter some content to see your QR code</p>
      )}
    </div>
  );
}
