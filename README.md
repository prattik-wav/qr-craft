# QR Craft ⬡

A beautiful, fully client-side QR Code Generator built for my Google Club recruitment task. 

It works entirely in the browser (no backend required) and allows users to generate, customize, and download highly reliable QR codes instantly.

## Screenshots
#Light Mode
<img width="1710" height="1074" alt="Screenshot 2026-10-04 at 6 32 22 PM" src="https://github.com/user-attachments/assets/9eb35900-2c0f-4e43-a18f-4bd0a32333b9" />

#Dark Mode
<img width="1710" height="1074" alt="Screenshot 2026-10-04 at 6 34 58 PM" src="https://github.com/user-attachments/assets/a0da28a3-03cb-4582-a9f4-efe99dd93ad4" />

#Different Types
<img width="1710" height="1074" alt="Screenshot 2026-10-04 at 6 33 06 PM" src="https://github.com/user-attachments/assets/1fec701d-2fa6-457f-8776-618dbaf98e09" />
<img width="1710" height="1074" alt="Screenshot 2026-10-04 at 6 34 02 PM" src="https://github.com/user-attachments/assets/11580e66-d807-4fb5-9969-1ffccb1efbc7" />

#Customization
<img width="634" height="594" alt="Screenshot 2026-10-04 at 6 32 46 PM" src="https://github.com/user-attachments/assets/a3c1a965-455c-4339-94d0-a2777b127947" />

#Preview Section
<img width="547" height="966" alt="Screenshot 2026-10-04 at 6 34 46 PM" src="https://github.com/user-attachments/assets/f0cd9d76-c99f-4ee8-9638-31935ca9c317" />

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

- **Frontend**: React (with Vite)
- **Language**: TypeScript
- **Styling**: CSS
- **QR Engine**: `qr-code-styling` 
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
This project has been deployed on Vercel, to access go to https://qr-craft-five-virid.vercel.app/
