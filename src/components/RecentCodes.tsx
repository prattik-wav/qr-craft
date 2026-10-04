import { SavedQR } from '../types';
import { IconTrash, IconUrl, IconText, IconEmail, IconPhone, IconWifi } from './Icons';

interface Props {
  codes: SavedQR[];
  onLoad: (saved: SavedQR) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

const TypeIcon = ({ type }: { type: SavedQR['type'] }) => {
  switch (type) {
    case 'url': return <IconUrl />;
    case 'text': return <IconText />;
    case 'email': return <IconEmail />;
    case 'phone': return <IconPhone />;
    case 'wifi': return <IconWifi />;
    default: return null;
  }
};

export default function RecentCodes({ codes, onLoad, onDelete, onClearAll }: Props) {
  if (codes.length === 0) return null;

  return (
    <div className="recent-codes">
      <div className="recent-header">
        <label className="section-label">Recent</label>
        <button className="clear-all-btn" onClick={onClearAll}>
          Clear all
        </button>
      </div>
      <div className="recent-list">
        {codes.map((item) => (
          <div key={item.id} className="recent-item">
            <button className="recent-card" onClick={() => onLoad(item)}>
              {item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt={item.label}
                  className="recent-thumb"
                />
              ) : (
                <div className="recent-thumb-placeholder">
                  <TypeIcon type={item.type} />
                </div>
              )}
              <div className="recent-info">
                <span className="recent-label">{item.label}</span>
                <span className="recent-date">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
            </button>
            <button
              className="recent-delete"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item.id);
              }}
              title="Remove"
            >
              <IconTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
