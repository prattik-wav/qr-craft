# QR Craft ⬡

A beautiful, fully client-side QR Code Generator built for my Google Club recruitment task. 

It works entirely in the browser (no backend required) and allows users to generate, customize, and download highly reliable QR codes instantly.

## Screenshots

## Features

- **Real-Time Generation**: Instantly renders the QR code as you type.
- **Multiple Data Types**: Supports URL, Plain Text, Email, Phone Number, and Wi-Fi networks (dynamically changes inputs based on selection).
- **Extensive Customization**: 
  - Change size and margin/padding.
  - Pick custom foreground and background colors.
  - Adjust Error Correction Levels (L, M, Q, H).
  - Modify dot and corner patterns (squares, dots, rounded, etc.).
  - Upload a custom logo to the center of the QR code.
- **Client-Side Processing**: 100% of the QR generation logic happens in the browser for maximum privacy and speed.
- **Export & Persistence**: Download as PNG or SVG, copy directly to the clipboard, and save your favorite configurations to a "Recent" tab (persisted via `localStorage`).
- **Dark Mode**: Beautiful Neobrutalist Light and Dark modes.

## Tech Stack

- **Frontend**: React (with Vite for fast bundling)
- **Language**: TypeScript
- **Styling**: Pure CSS (Neobrutalism Design System)
- **QR Engine**: `qr-code-styling` (for advanced Canvas/SVG rendering)
- **Deployment**: Vercel

## How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone <https://github.com/prattik-wav/qr-craft.git>
   cd qr-craft
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

## Deployment

This project is optimized for zero-config deployment on Vercel. 
Simply connect the GitHub repository to Vercel, and it will automatically detect the Vite framework, run `npm run build`, and deploy the `dist/` folder.
