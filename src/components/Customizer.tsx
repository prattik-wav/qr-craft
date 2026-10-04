import { QRStyleOptions, DotType, CornerSquareType, CornerDotType, ErrorCorrectionLevel } from '../types';
import { getContrastRatio } from '../utils';
import { useState } from 'react';

interface Props {
  style: QRStyleOptions;
  onChange: (updates: Partial<QRStyleOptions>) => void;
}

const DOT_STYLES: { value: DotType; label: string }[] = [
  { value: 'square', label: 'Square' },
  { value: 'dots', label: 'Dots' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'extra-rounded', label: 'Pill' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy Round' },
];

const CORNER_SQUARE_STYLES: { value: CornerSquareType; label: string }[] = [
  { value: 'square', label: 'Square' },
  { value: 'dot', label: 'Dot' },
  { value: 'extra-rounded', label: 'Rounded' },
];

const CORNER_DOT_STYLES: { value: CornerDotType; label: string }[] = [
  { value: 'square', label: 'Square' },
  { value: 'dot', label: 'Dot' },
];

const EC_LEVELS: { value: ErrorCorrectionLevel; label: string; desc: string }[] = [
  { value: 'L', label: 'L', desc: 'Low (7%)' },
  { value: 'M', label: 'M', desc: 'Medium (15%)' },
  { value: 'Q', label: 'Q', desc: 'Quartile (25%)' },
  { value: 'H', label: 'H', desc: 'High (30%)' },
];

export default function Customizer({ style, onChange }: Props) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const contrast = getContrastRatio(style.fgColor, style.bgColor);
  const lowContrast = contrast < 3;

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 500_000) {
      alert('Logo file is too large — keep it under 500KB for best results.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onChange({ logoDataUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="customizer">
      <label className="section-label">Customize</label>

      {/* Size */}
      <div className="control-row">
        <label>Size</label>
        <div className="slider-group">
          <input
            type="range"
            min={100}
            max={600}
            step={10}
            value={style.size}
            onChange={(e) => onChange({ size: Number(e.target.value) })}
          />
          <span className="slider-value">{style.size}px</span>
        </div>
      </div>

      {/* Margin */}
      <div className="control-row">
        <label>Margin</label>
        <div className="slider-group">
          <input
            type="range"
            min={0}
            max={50}
            step={1}
            value={style.margin}
            onChange={(e) => onChange({ margin: Number(e.target.value) })}
          />
          <span className="slider-value">{style.margin}px</span>
        </div>
      </div>

      {/* Colors */}
      <div className="control-row">
        <label>Foreground</label>
        <div className="color-pick">
          <input
            type="color"
            value={style.fgColor}
            onChange={(e) => onChange({ fgColor: e.target.value })}
          />
          <input
            type="text"
            value={style.fgColor}
            onChange={(e) => {
              if (/^#[0-9a-f]{6}$/i.test(e.target.value))
                onChange({ fgColor: e.target.value });
            }}
            className="color-hex"
            maxLength={7}
          />
        </div>
      </div>

      <div className="control-row">
        <label>Background</label>
        <div className="color-pick">
          <input
            type="color"
            value={style.bgColor}
            onChange={(e) => onChange({ bgColor: e.target.value })}
          />
          <input
            type="text"
            value={style.bgColor}
            onChange={(e) => {
              if (/^#[0-9a-f]{6}$/i.test(e.target.value))
                onChange({ bgColor: e.target.value });
            }}
            className="color-hex"
            maxLength={7}
          />
        </div>
      </div>

      {/* Contrast warning */}
      {lowContrast && (
        <div className="warning-banner">
          ⚠️ Low contrast — this QR code might be hard to scan. Try increasing the
          difference between foreground and background colors.
        </div>
      )}

      {/* Error Correction */}
      <div className="control-row">
        <label>Error Correction</label>
        <div className="ec-buttons">
          {EC_LEVELS.map((level) => (
            <button
              key={level.value}
              className={`ec-btn ${style.errorCorrection === level.value ? 'active' : ''}`}
              onClick={() => onChange({ errorCorrection: level.value })}
              title={level.desc}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dot Style */}
      <div className="control-row">
        <label>Dot Pattern</label>
        <select
          value={style.dotStyle}
          onChange={(e) => onChange({ dotStyle: e.target.value as DotType })}
        >
          {DOT_STYLES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Advanced section */}
      <button
        className="toggle-advanced"
        onClick={() => setShowAdvanced(!showAdvanced)}
      >
        {showAdvanced ? '▾' : '▸'} Advanced options
      </button>

      {showAdvanced && (
        <div className="advanced-options">
          <div className="control-row">
            <label>Corner Squares</label>
            <select
              value={style.cornerSquareStyle}
              onChange={(e) =>
                onChange({ cornerSquareStyle: e.target.value as CornerSquareType })
              }
            >
              {CORNER_SQUARE_STYLES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div className="control-row">
            <label>Corner Dots</label>
            <select
              value={style.cornerDotStyle}
              onChange={(e) =>
                onChange({ cornerDotStyle: e.target.value as CornerDotType })
              }
            >
              {CORNER_DOT_STYLES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Logo upload */}
          <div className="control-row">
            <label>Logo</label>
            <div className="logo-upload">
              <input
                type="file"
                accept="image/png,image/jpeg,image/svg+xml"
                onChange={handleLogoUpload}
                id="logo-input"
              />
              <label htmlFor="logo-input" className="file-label">
                {style.logoDataUrl ? '✓ Logo added' : 'Choose image'}
              </label>
              {style.logoDataUrl && (
                <button
                  className="remove-logo"
                  onClick={() => onChange({ logoDataUrl: '' })}
                  title="Remove logo"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {style.logoDataUrl && (
            <div className="control-row">
              <label>Logo Size</label>
              <div className="slider-group">
                <input
                  type="range"
                  min={10}
                  max={50}
                  step={1}
                  value={style.logoSize}
                  onChange={(e) => onChange({ logoSize: Number(e.target.value) })}
                />
                <span className="slider-value">{style.logoSize}%</span>
              </div>
            </div>
          )}

          {style.logoDataUrl && style.errorCorrection !== 'H' && (
            <div className="warning-banner">
              💡 Tip: Set error correction to H when using a logo — it helps the QR
              code stay scannable.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
