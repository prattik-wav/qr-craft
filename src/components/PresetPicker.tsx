import { PRESETS } from '../presets';
import { QRStyleOptions } from '../types';

interface Props {
  onApply: (updates: Partial<QRStyleOptions>) => void;
}

export default function PresetPicker({ onApply }: Props) {
  return (
    <div className="preset-picker">
      <label className="section-label">Presets</label>
      <div className="preset-grid">
        {PRESETS.map((preset) => (
          <button
            key={preset.name}
            className="preset-card"
            onClick={() => onApply(preset.style)}
            title={preset.name}
          >
            <div className={`preset-pattern ${preset.pattern}`} style={{
                backgroundColor: preset.style.bgColor,
                color: preset.style.fgColor
            }}></div>
            <span className="preset-name">{preset.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
