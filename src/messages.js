'use strict';

// ── Work session reward messages (shown on session complete) ──────
const REWARDS = [
  "🏆 That's one down. You're unstoppable.",
  "🔥 Focus achieved. Treat yourself.",
  "⭐ Another one in the bag. Proud of you.",
  "💪 You just out-focused your past self.",
  "🎯 Bullseye. That was a great session.",
  "✨ Clean work. Go enjoy your break.",
  "🚀 Launching into break mode. You earned it.",
  "😤 Beast mode: activated. Session crushed.",
  "🎉 Done! You're building momentum.",
  "💡 Your brain just did something great.",
  "🌟 Session complete. You're on a roll.",
  "🦁 Absolute unit. Session demolished.",
  "🎸 Rock solid focus. Take five.",
  "🍵 You deserve that cup of tea. Go.",
  "🧠 Brain successfully exercised. Rest it.",
  "📦 Session packed and shipped. Nice.",
  "🏄 You rode that wave perfectly.",
  "🎮 Level up! Break time unlocked.",
  "✅ Checked off. That felt good, right?",
  "🌈 Look at you, being all productive.",
];

// ── Break start messages (shown when break begins) ────────────────
const BREAK_START = [
  "Stand up. Walk around. You've been sitting.",
  "Look away from the screen. Your eyes need a minute.",
  "Take 5 deep breaths. Seriously, do it.",
  "Get some water. Your brain runs on it.",
  "Stretch your neck. You've been hunching.",
  "Step outside for 30 seconds. Just go.",
  "Close your eyes. Rest the machine for a bit.",
  "Walk to the kitchen and back. Just move.",
  "Look out the window. Something far away.",
  "Roll your shoulders back. That's it. Twice more.",
  "Grab a snack. The good kind. You earned it.",
  "Put the phone down too. Yes, this means you.",
  "Do nothing for 5 minutes. That's the assignment.",
  "Text someone you haven't spoken to in a while.",
  "Breathe in for 4, hold for 4, out for 4.",
  "Your posture. Fix it. Right now.",
  "Go look at something that isn't a rectangle.",
  "Hydrate. You probably haven't had enough water.",
  "Take the break. The work will wait. Promise.",
  "You just focused hard. Now unfocus on purpose.",
];

// ── Long break messages (after 4 sessions) ───────────────────────
const LONG_BREAK_START = [
  "Four sessions. That's real work. Take 15 minutes and mean it.",
  "You've been at it a while. Eat something. Rest properly.",
  "Long break earned. Step away from the screen. Fully.",
  "Your brain did four rounds. Give it a proper rest.",
  "This one's 15 minutes. Use all of it. Don't cheat.",
  "Four pomodoros in. You're in the top tier today.",
  "Big break time. Go outside. Come back refreshed.",
  "Four sessions strong. Long break is your reward. Take it.",
  "15 minutes. That's not a suggestion. Rest.",
  "You've been crushing it. Now crush this break.",
];

// ── Break end (time to get back) ─────────────────────────────────
const BREAK_END = [
  "Break's up. Back to it. You've got this.",
  "Ready? Let's go. Focus time.",
  "Refreshed? Good. Next session starts now.",
  "Time's up. Sit down and let's do this.",
  "Break done. New session, same you — but rested.",
  "Back to work. You know what to do.",
  "The break was nice. Now let's earn the next one.",
  "Alright, warrior. Round two.",
];

// ── Motivational idle texts ───────────────────────────────────────
const IDLE_TIPS = [
  "One session at a time.",
  "Start. The rest follows.",
  "25 minutes is nothing. Let's go.",
  "Deep work = real results.",
  "Focus is a skill. You're practising it.",
];

// ── Milestone messages ────────────────────────────────────────────
const MILESTONES = {
  2:  "Two sessions done. Halfway to a long break.",
  4:  "Four sessions! Long break time. Legendary.",
  8:  "Eight sessions today. Are you even human?",
  12: "Twelve sessions. That's a full day of deep work.",
};

// ── Picker helper ────────────────────────────────────────────────
function pick(arr, lastIndex = -1) {
  let idx;
  do { idx = Math.floor(Math.random() * arr.length); }
  while (arr.length > 1 && idx === lastIndex);
  return { text: arr[idx], idx };
}

// Expose globally in renderer
if (typeof window !== 'undefined') {
  window.MESSAGES = { REWARDS, BREAK_START, LONG_BREAK_START, BREAK_END, IDLE_TIPS, MILESTONES, pick };
}
