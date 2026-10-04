import { QRData, QRType } from './types';

/**
 * Takes the form data and builds the actual string that goes
 * into the QR code. Each type has its own encoding format.
 */
export function buildQRString(data: QRData): string {
  switch (data.type) {
    case 'url':
      return data.url.trim();

    case 'text':
      return data.text;

    case 'email': {
      const params: string[] = [];
      if (data.emailSubject)
        params.push(`subject=${encodeURIComponent(data.emailSubject)}`);
      if (data.emailBody)
        params.push(`body=${encodeURIComponent(data.emailBody)}`);
      const query = params.length ? '?' + params.join('&') : '';
      return `mailto:${data.emailTo}${query}`;
    }

    case 'phone':
      return `tel:${data.phone.replace(/\s/g, '')}`;

    case 'wifi': {
      // standard Wi-Fi QR format
      const hidden = data.wifiHidden ? 'true' : 'false';
      return `WIFI:T:${data.wifiEncryption};S:${escapeWifi(data.wifiSSID)};P:${escapeWifi(data.wifiPassword)};H:${hidden};;`;
    }

    default:
      return '';
  }
}

// wifi fields need special chars escaped
function escapeWifi(val: string): string {
  return val.replace(/([\\;,:"'])/g, '\\$1');
}

/**
 * Validates the current input and returns an error message
 * if something's wrong, or null if everything checks out.
 */
export function validateInput(data: QRData): string | null {
  switch (data.type) {
    case 'url':
      if (!data.url.trim()) return 'Enter a URL to get started';
      try {
        new URL(data.url.trim());
        return null;
      } catch {
        // maybe they forgot the protocol
        if (!data.url.startsWith('http')) {
          try {
            new URL('https://' + data.url.trim());
            return null; // we'll prepend it for them
          } catch {
            /* fall through */
          }
        }
        return 'That doesn\'t look like a valid URL — try including https://';
      }

    case 'text':
      if (!data.text.trim()) return 'Type something to encode';
      if (data.text.length > 2953)
        return 'Text is too long — QR codes max out around 2953 characters';
      return null;

    case 'email':
      if (!data.emailTo.trim()) return 'Enter an email address';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.emailTo.trim()))
        return 'That email doesn\'t look right';
      return null;

    case 'phone':
      if (!data.phone.trim()) return 'Enter a phone number';
      if (!/^\+?[\d\s\-()]{7,}$/.test(data.phone.trim()))
        return 'Enter a valid phone number (e.g. +1 555-0123)';
      return null;

    case 'wifi':
      if (!data.wifiSSID.trim()) return 'Enter the network name';
      if (data.wifiEncryption !== 'nopass' && !data.wifiPassword.trim())
        return 'Password is required for encrypted networks';
      return null;

    default:
      return null;
  }
}

/**
 * Contrast ratio between two hex colors.
 * Used to warn about low-contrast QR codes that might not scan well.
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = relativeLuminance(hex1);
  const lum2 = relativeLuminance(hex2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

function relativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  return [
    parseInt(clean.substring(0, 2), 16),
    parseInt(clean.substring(2, 4), 16),
    parseInt(clean.substring(4, 6), 16),
  ];
}

/** Short label for displaying in the recent codes list */
export function getDisplayLabel(data: QRData): string {
  switch (data.type) {
    case 'url':
      return data.url.length > 35 ? data.url.substring(0, 35) + '…' : data.url;
    case 'text':
      return data.text.length > 35 ? data.text.substring(0, 35) + '…' : data.text;
    case 'email':
      return data.emailTo;
    case 'phone':
      return data.phone;
    case 'wifi':
      return `📶 ${data.wifiSSID}`;
    default:
      return 'QR Code';
  }
}

export const TYPE_LABELS: Record<QRType, string> = {
  url: 'URL',
  text: 'Text',
  email: 'Email',
  phone: 'Phone',
  wifi: 'Wi-Fi',
};

export const TYPE_ICONS: Record<QRType, string> = {
  url: '🔗',
  text: '📝',
  email: '✉️',
  phone: '📞',
  wifi: '📶',
};
