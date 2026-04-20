# 🍅 Pomo Float

A tiny floating Pomodoro timer for your pc windows while you work. With Dark frosted glass UI and Satisfying sounds. It have some Different reward and break messages every time. Also it is never gets in the way.

It's 280px wide. It floats. It stays out of the way.

---

## What it does

- Floats over every app on your screen (toggle-able)
- Work / Short Break / Long Break modes with an arc progress ring
- Different message every session — rewards when you finish, break suggestions when it's time to rest
- 20 reward texts, 20 break messages, 10 long break messages — never repeats consecutively
- Web Audio API sound effects — session done chime, break bell, break-over alert, tick on the last 5 seconds
- Session dots showing progress toward your long break
- Full settings — work/break durations, sessions before long break, volume, tick toggle
- Drag it anywhere on screen by the title bar
- Pin/unpin always-on-top from the title bar
- Tray icon with show/hide and quit

---

## Looks like

```
┌───────────────────────────┐
│ ● ● ●  POMO FLOAT    🔔 ⚙ │  ← drag bar
│  [ Work ] [ Short ] [Long]│
│                           │
│       ╭──────────╮        │
│      /   24:33    \       │  ← arc ring
│     |    FOCUS     |      │
│      \             /      │
│       ╰──────────╯        │
│         ● ○ ○ ○           │  ← session dots
│  ┌─────────────────────┐  │
│  │ One session at time.│  │  ← rotating messages
│  └─────────────────────┘  │
│  [    Start    ] [ Reset ] │
└───────────────────────────┘
```

When a session finishes, a full-window reward card pops up with a random message and sound before starting the break automatically.

---

## Requirements

- [Node.js](https://nodejs.org) 18 or later
- npm (comes with Node)

That's it. No Python, no other tools.

---

## Run it (no install — just run)

```bash
# Clone or download the repo
git clone https://github.com/YOUR_USERNAME/Pomo-Float.git
cd Pomo-Float

# Install dependencies (one time)
npm install

# Run
npm start
```

The floating window appears in the top-right corner of your screen.

---

## Build an app (optional — creates a real .app or .exe)

```bash
# Mac (.dmg)
npm run build:mac

# Windows (.exe installer)
npm run build:win

# Both at once
npm run build:all
```

Output goes to a `dist/` folder. On Mac you get a `.dmg`, on Windows an `.exe` installer and a portable `.exe`.

---

## Controls

| Thing | How |
|---|---|
| Start / Pause | Click the Start button |
| Reset timer | Click Reset |
| Switch mode | Click Work / Short / Long in the mode bar |
| Move window | Drag the title bar |
| Pin on top | Click the coloured dot (top-left row, third one) |
| Mute sound | Click 🔔 in the title bar |
| Settings | Click ⚙ in the title bar |
| Hide to tray | Click the yellow dot (middle) |
| Quit | Click the red dot, or right-click the tray icon |

---

## Settings

Click ⚙ to open:

| Setting | Default | Range |
|---|---|---|
| Work duration | 25 min | 5 – 90 |
| Short break | 5 min | 1 – 30 |
| Long break | 15 min | 5 – 60 |
| Sessions before long break | 4 | 2 – 8 |
| Tick sound (last 5 sec) | ON | ON / OFF |
| Volume | 60% | 10 – 100% |

Changes take effect on the next timer reset.

---

## Sounds (all generated — no files)

All audio is created with the Web Audio API. No `.mp3` or `.wav` files included.

| Event | Sound |
|---|---|
| Session complete | Ascending 4-note chime (C E G C) |
| Break starts | Descending 3-note gentle bell |
| Long break starts | Warm 6-note melody |
| Break ends / back to work | Short 3-pulse alert |
| Last 5 seconds | Soft tick |
| Milestone (4, 8, 12 sessions) | Happy fanfare |
| Button clicks | Subtle click |

---

## Messages

There are 20 reward messages, 20 break messages, 10 long break messages, and 8 break-end nudges. They're picked randomly and never repeat back-to-back.

Sample rewards:
- *"You just out-focused your past self."*
- *"Another one in the bag. Proud of you."*
- *"Absolute unit. Session demolished."*

Sample break messages:
- *"Stand up. Walk around. You've been sitting."*
- *"Go look at something that isn't a rectangle."*
- *"Breathe in for 4, hold for 4, out for 4."*

---

## File structure

```
Pomo-Float/
├── package.json
├── src/
│   ├── main.js       ← Electron window + tray setup
│   ├── preload.js    ← IPC bridge (drag, close, etc.)
│   ├── index.html    ← Everything visual + timer logic
│   ├── messages.js   ← All reward/break text
│   └── sounds.js     ← Web Audio sound engine
└── assets/
    └── icon.*        ← App icon (add your own)
```

---

## Notes

**Why Electron?** Cross-platform desktop app with a web renderer. Gives us the transparent floating window, always-on-top, tray icon, and drag — all with HTML/CSS/JS. The alternative would be separate codebases for Mac and Windows.

**No internet needed.** The app is 100% offline after `npm install`. The sounds are generated in code, messages are bundled, nothing phones home.

**CPU usage** is very low — the timer fires once per second and redraws only what changed.

---

## License

MIT
