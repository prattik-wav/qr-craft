import { QRData } from '../types';

interface Props {
  data: QRData;
  onChange: (data: Partial<QRData>) => void;
  error: string | null;
}

export default function InputForm({ data, onChange, error }: Props) {
  return (
    <div className="input-form">
      <label className="section-label">Content</label>

      {data.type === 'url' && (
        <div className="field">
          <input
            type="url"
            placeholder="https://example.com"
            value={data.url}
            onChange={(e) => onChange({ url: e.target.value })}
            className={error ? 'input-error' : ''}
          />
          <p className="field-hint">Paste any web address</p>
        </div>
      )}

      {data.type === 'text' && (
        <div className="field">
          <textarea
            placeholder="Enter your text here..."
            value={data.text}
            onChange={(e) => onChange({ text: e.target.value })}
            rows={4}
            className={error ? 'input-error' : ''}
          />
          <p className="field-hint">{data.text.length} / 2953 characters</p>
        </div>
      )}

      {data.type === 'email' && (
        <div className="field-group">
          <div className="field">
            <label>To</label>
            <input
              type="email"
              placeholder="hello@example.com"
              value={data.emailTo}
              onChange={(e) => onChange({ emailTo: e.target.value })}
              className={error ? 'input-error' : ''}
            />
          </div>
          <div className="field">
            <label>Subject <span className="optional">(optional)</span></label>
            <input
              type="text"
              placeholder="Meeting tomorrow"
              value={data.emailSubject}
              onChange={(e) => onChange({ emailSubject: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Body <span className="optional">(optional)</span></label>
            <textarea
              placeholder="Hi there..."
              value={data.emailBody}
              onChange={(e) => onChange({ emailBody: e.target.value })}
              rows={3}
            />
          </div>
        </div>
      )}

      {data.type === 'phone' && (
        <div className="field">
          <input
            type="tel"
            placeholder="+1 555-0123"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            className={error ? 'input-error' : ''}
          />
          <p className="field-hint">Include country code for international numbers</p>
        </div>
      )}

      {data.type === 'wifi' && (
        <div className="field-group">
          <div className="field">
            <label>Network Name (SSID)</label>
            <input
              type="text"
              placeholder="MyWiFiNetwork"
              value={data.wifiSSID}
              onChange={(e) => onChange({ wifiSSID: e.target.value })}
              className={error ? 'input-error' : ''}
            />
          </div>
          <div className="field">
            <label>Security</label>
            <select
              value={data.wifiEncryption}
              onChange={(e) =>
                onChange({ wifiEncryption: e.target.value as 'WPA' | 'WEP' | 'nopass' })
              }
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">None (Open)</option>
            </select>
          </div>
          {data.wifiEncryption !== 'nopass' && (
            <div className="field">
              <label>Password</label>
              <input
                type="text"
                placeholder="Enter password"
                value={data.wifiPassword}
                onChange={(e) => onChange({ wifiPassword: e.target.value })}
                className={error && !data.wifiPassword.trim() ? 'input-error' : ''}
              />
            </div>
          )}
          <div className="field checkbox-field">
            <label>
              <input
                type="checkbox"
                checked={data.wifiHidden}
                onChange={(e) => onChange({ wifiHidden: e.target.checked })}
              />
              Hidden network
            </label>
          </div>
        </div>
      )}

      {error && <p className="error-message">⚠️ {error}</p>}
    </div>
  );
}
