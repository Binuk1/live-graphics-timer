const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, 'public')));

// Timer state
let timerState = {
    isRunning: false,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0
};

let timerInterval = null;

// Broadcast to all clients
function broadcast(data) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

// Timer logic
function startTimer() {
    if (timerState.isRunning) return;
    if (timerState.totalSeconds <= 0) return;
    
    timerState.isRunning = true;
    broadcast({ type: 'timerState', state: timerState });
    
    timerInterval = setInterval(() => {
        timerState.totalSeconds--;
        timerState.minutes = Math.floor(timerState.totalSeconds / 60);
        timerState.seconds = timerState.totalSeconds % 60;
        
        broadcast({ type: 'timerUpdate', state: timerState });
        
        // Stop when timer reaches 0
        if (timerState.totalSeconds <= 0) {
            stopTimer();
        }
    }, 1000);
}

function stopTimer() {
    if (!timerState.isRunning) return;
    
    timerState.isRunning = false;
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    broadcast({ type: 'timerState', state: timerState });
}

function resetTimer() {
    stopTimer();
    timerState = {
        isRunning: false,
        minutes: 0,
        seconds: 0,
        totalSeconds: 0
    };
    broadcast({ type: 'timerState', state: timerState });
}

function setTimer(minutes, seconds) {
    stopTimer();
    timerState.minutes = minutes;
    timerState.seconds = seconds;
    timerState.totalSeconds = minutes * 60 + seconds;
    broadcast({ type: 'timerState', state: timerState });
}

// WebSocket connection handler
wss.on('connection', (ws) => {
    console.log('Client connected');
    
    // Send current state to new client
    ws.send(JSON.stringify({ type: 'timerState', state: timerState }));
    
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            
            switch (data.type) {
                case 'start':
                    startTimer();
                    break;
                case 'stop':
                    stopTimer();
                    break;
                case 'reset':
                    resetTimer();
                    break;
                case 'setTimer':
                    setTimer(data.minutes, data.seconds);
                    break;
            }
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });
    
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

server.listen(PORT, HOST, () => {
    const os = require('os');
    const interfaces = os.networkInterfaces();
    let ipAddress = 'localhost';
    
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                ipAddress = iface.address;
                break;
            }
        }
        if (ipAddress !== 'localhost') break;
    }
    
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Network access: http://${ipAddress}:${PORT}`);
});
