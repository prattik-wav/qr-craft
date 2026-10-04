import { Preset } from './types';

export const PRESETS: Preset[] = [
  {
    name: 'Minimal',
    pattern: 'dots',
    style: {
      fgColor: '#0f172a',
      bgColor: '#ffffff',
      dotStyle: 'rounded',
      cornerSquareStyle: 'extra-rounded',
      cornerDotStyle: 'dot',
    },
  },
  {
    name: 'Elegant',
    pattern: 'grid',
    style: {
      fgColor: '#3b82f6',
      bgColor: '#eff6ff',
      dotStyle: 'dots',
      cornerSquareStyle: 'dot',
      cornerDotStyle: 'dot',
    },
  },
  {
    name: 'Professional',
    pattern: 'lines',
    style: {
      fgColor: '#0f172a',
      bgColor: '#f8fafc',
      dotStyle: 'square',
      cornerSquareStyle: 'square',
      cornerDotStyle: 'square',
    },
  },
  {
    name: 'Vibrant',
    pattern: 'waves',
    style: {
      fgColor: '#ec4899',
      bgColor: '#fdf2f8',
      dotStyle: 'classy',
      cornerSquareStyle: 'extra-rounded',
      cornerDotStyle: 'dot',
    },
  },
  {
    name: 'Ocean',
    pattern: 'dots',
    style: {
      fgColor: '#0284c7',
      bgColor: '#f0f9ff',
      dotStyle: 'rounded',
      cornerSquareStyle: 'extra-rounded',
      cornerDotStyle: 'dot',
    },
  },
  {
    name: 'Dark',
    pattern: 'grid',
    style: {
      fgColor: '#ffffff',
      bgColor: '#09090b',
      dotStyle: 'square',
      cornerSquareStyle: 'square',
      cornerDotStyle: 'square',
      errorCorrection: 'H',
    },
  },
];
