# Sports Timer Overlay

A full-screen digital timer overlay with real-time WebSocket synchronization, designed for sports events and broadcasts. Features separate display and control interfaces with audio alerts.

## Features

- **Countdown Timer**: Digital timer that counts down from a set time to 00:00
- **Real-time Synchronization**: WebSocket-based synchronization between display and control panels
- **Separate Interfaces**: 
  - `display.html` - Full-screen timer overlay for broadcast/overlay
  - `control.html` - Control panel for managing the timer
- **Audio Alerts**:
  - 5-second warning sound when timer reaches 5 seconds
  - End sound when timer reaches 00:00
- **Visual Indicators**:
  - White text when above 5 seconds
  - Red text when 5 seconds or less remain
  - Running/Stopped status indicator
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **PWA Ready**: Includes app icons and manifest for installation as a web app

## Installation

1. Clone or download this repository
2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
node server.js
```

The server will start and display both localhost and network access URLs:
```
Server running on http://localhost:3000
Network access: http://YOUR_IP_ADDRESS:3000
```

## Network Access

The server is configured to accept connections from other devices on your local network:

1. Find your computer's IP address (displayed when server starts)
2. On other devices on the same network, access:
   - Display: `http://YOUR_IP_ADDRESS:3000/display.html`
   - Control: `http://YOUR_IP_ADDRESS:3000/control.html`

**Note:** All devices must be on the same local network/Wi-Fi for this to work.

## Usage

### Access the Interfaces

- **Display Overlay**: Open `http://localhost:3000/display.html`
- **Control Panel**: Open `http://localhost:3000/control.html`

### Using the Control Panel

1. Set the desired time using the minutes and seconds input fields
2. Click "Set Time" to apply the time
3. Click "Start" to begin the countdown
4. Click "Stop" to pause the timer
5. Click "Reset" to return to 00:00

### Audio

- The first click on the display page unlocks audio (browser security requirement)
- 5-second warning plays when timer reaches exactly 5 seconds
- End sound plays when timer reaches 00:00 and stops after 1.5 seconds

## File Structure

```
sports overlay/
├── server.js              # Node.js WebSocket server
├── package.json           # Project dependencies
├── public/
│   ├── display.html      # Full-screen timer display
│   ├── control.html      # Control panel interface
│   ├── end.mp3          # End timer sound
│   ├── 5sec.mp3         # 5-second warning sound
│   ├── apple-touch-icon.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon.ico
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   └── site.webmanifest
```

## Technologies Used

- **Backend**: Node.js, Express, WebSocket (ws)
- **Frontend**: HTML5, CSS3, JavaScript
- **Real-time Communication**: WebSocket

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## Mobile/App Installation

The application can be installed as a Progressive Web App (PWA):

1. Open the display or control page in a supported browser
2. Look for the "Add to Home Screen" option in the browser menu
3. Follow the prompts to install

## Configuration

### Port Configuration

To change the default port (3000), modify the server startup:

```javascript
const PORT = process.env.PORT || 3000;
```

Or set the PORT environment variable:

```bash
PORT=8080 node server.js
```

### Audio Files

Replace the audio files in the `public/` directory:
- `end.mp3` - Sound played when timer reaches 00:00
- `5sec.mp3` - Sound played at 5-second warning

## Troubleshooting

### Audio not playing

Browsers require user interaction before audio can play. Click anywhere on the display page once to unlock audio.

### WebSocket connection issues

Ensure the server is running and accessible on the configured port. Check browser console for error messages.

### Timer not updating

Verify both display and control pages are connected to the same server. Check the browser console for WebSocket connection status.

## License

This project is open source and available for use in sports events and broadcasts.

## Contributing

Feel free to submit issues and enhancement requests.
