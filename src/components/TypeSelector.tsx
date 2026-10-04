import { QRType } from '../types';
import { TYPE_LABELS } from '../utils';
import { IconUrl, IconText, IconEmail, IconPhone, IconWifi } from './Icons';

const TYPES: QRType[] = ['url', 'text', 'email', 'phone', 'wifi'];

interface Props {
  selected: QRType;
  onChange: (type: QRType) => void;
}

const TypeIcon = ({ type }: { type: QRType }) => {
  switch (type) {
    case 'url': return <IconUrl />;
    case 'text': return <IconText />;
    case 'email': return <IconEmail />;
    case 'phone': return <IconPhone />;
    case 'wifi': return <IconWifi />;
    default: return null;
  }
};

export default function TypeSelector({ selected, onChange }: Props) {
  return (
    <div className="type-selector">
      <label className="section-label">QR Type</label>
      <div className="type-buttons">
        {TYPES.map((t) => (
          <button
            key={t}
            className={`type-btn ${selected === t ? 'active' : ''}`}
            onClick={() => onChange(t)}
          >
            <span className="type-icon"><TypeIcon type={t} /></span>
            <span className="type-label">{TYPE_LABELS[t]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
