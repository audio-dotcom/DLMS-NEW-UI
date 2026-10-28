# DLMS — Digital Loudspeaker Management System (2 in 4 out)

Web UI + PWA untuk kontrol DLMS lewat Bluetooth (Web Bluetooth, Chrome Android/PC).

## Isi repo
`index.html`, `sw.js`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png`, `favicon.png`, `.nojekyll`

## Deploy (GitHub Pages)
1. Upload semua file ke root repo, aktifkan Pages (branch main, folder root).
2. Untuk APK: PWABuilder → masukkan URL Pages → Package for Android (TWA).
3. Setiap ubah file, naikkan `VERSI` di `sw.js` supaya cache lama terganti.

## Protokol BLE
Sama dengan firmware UPDATE_MUTE.ino (service `4fafc201-...-c331914b`).
