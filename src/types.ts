export type QRType = 'url' | 'text' | 'email' | 'phone' | 'wifi';

export type DotType =
  | 'square'
  | 'dots'
  | 'rounded'
  | 'extra-rounded'
  | 'classy'
  | 'classy-rounded';

export type CornerSquareType = 'square' | 'dot' | 'extra-rounded';
export type CornerDotType = 'square' | 'dot';
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QRData {
  type: QRType;
  url: string;
  text: string;
  emailTo: string;
  emailSubject: string;
  emailBody: string;
  phone: string;
  wifiSSID: string;
  wifiPassword: string;
  wifiEncryption: 'WPA' | 'WEP' | 'nopass';
  wifiHidden: boolean;
}

export interface QRStyleOptions {
  size: number;
  margin: number;
  errorCorrection: ErrorCorrectionLevel;
  dotStyle: DotType;
  cornerSquareStyle: CornerSquareType;
  cornerDotStyle: CornerDotType;
  fgColor: string;
  bgColor: string;
  logoDataUrl: string;
  logoSize: number;
}

export interface SavedQR {
  id: string;
  type: QRType;
  data: string;
  label: string;
  style: QRStyleOptions;
  thumbnail: string;
  createdAt: number;
}

export interface Preset {
  name: string;
  pattern: string;
  style: Partial<QRStyleOptions>;
}

// reasonable defaults
export const DEFAULT_QR_DATA: QRData = {
  type: 'url',
  url: '',
  text: '',
  emailTo: '',
  emailSubject: '',
  emailBody: '',
  phone: '',
  wifiSSID: '',
  wifiPassword: '',
  wifiEncryption: 'WPA',
  wifiHidden: false,
};

export const DEFAULT_STYLE: QRStyleOptions = {
  size: 300,
  margin: 10,
  errorCorrection: 'M',
  dotStyle: 'rounded',
  cornerSquareStyle: 'extra-rounded',
  cornerDotStyle: 'dot',
  fgColor: '#0f172a',
  bgColor: '#ffffff',
  logoDataUrl: '',
  logoSize: 30,
};
