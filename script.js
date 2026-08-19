// ⚡ script.js — ang "utak" ng pahina.
// Kinukuha nito ang tunay na git history at ginagawang buhay ang pahina.

const timeline = document.getElementById('timeline');
const commitBtn = document.getElementById('commitBtn');
const hint = document.getElementById('hint');

// Backup list kung sakaling walang server (offline viewing ng file)
const FALLBACK = [
  { hash: 'abc1234', date: 'Ago 19, 2026', message: '🎉 Feature: lumilipad na emoji tuwing may commit' },
  { hash: 'def5678', date: 'Ago 19, 2026', message: '🖥️ Dinagdag ang mini server: server.py' },
  { hash: 'a1b2c3d', date: 'Ago 19, 2026', message: '⚡ Ginawang interactive: script.js' },
  { hash: 'e4f5a6b', date: 'Ago 19, 2026', message: '🎨 Pinaganda ang disenyo: style.css' },
  { hash: 'c7d8e9f', date: 'Ago 19, 2026', message: '🌱 Unang pahina: index.html' },
  { hash: '0123abc', date: 'Ago 19, 2026', message: '📝 Simula: ginawa ang README (paliwanag ng proyekto)' },
];

// Ipinapakita ang listahan ng commits sa timeline
function renderLog(entries, offline) {
  timeline.innerHTML = '';
  if (offline) {
    const note = document.createElement('p');
    note.className = 'loading';
    note.textContent = '⚠️ Hindi maabot ang server — ipinapakita ang nakaimbak na bersyon.';
    timeline.appendChild(note);
  }
  entries.forEach((entry) => {
    const div = document.createElement('div');
    div.className = 'commit' + (entry.simulated ? ' simulated' : '');

    const body = document.createElement('div');
    body.className = 'commit-body';

    const top = document.createElement('div');
    top.className = 'commit-top';

    const hash = document.createElement('span');
    hash.className = 'hash';
    hash.textContent = entry.hash;

    const date = document.createElement('span');
    date.className = 'date';
    date.textContent = entry.date;

    top.appendChild(hash);
    if (entry.simulated) {
      const badge = document.createElement('span');
      badge.className = 'sim-badge';
      badge.textContent = '🎭 simulasyon';
      top.appendChild(badge);
    }
    top.appendChild(date);

    const msg = document.createElement('div');
    msg.className = 'msg';
    msg.textContent = entry.message;

    body.appendChild(top);
    body.appendChild(msg);

    const dot = document.createElement('div');
    dot.className = 'dot';

    div.appendChild(dot);
    div.appendChild(body);
    timeline.appendChild(div);
  });
}

// Kinukuha ang tunay na git log mula sa server
async function loadLog() {
  try {
    const res = await fetch('/api/gitlog');
    if (!res.ok) throw new Error('no api');
    const data = await res.json();
    renderLog(data, false);
  } catch (err) {
    renderLog(FALLBACK, true);
  }
}

// 🎭 Simulasyon ng paggawa ng commit
const FAKE_MESSAGES = [
  '🐛 May inayos na typo sa title',
  '🌈 Dinagdagan ang kulay ng background',
  '⚡ Binilisan ang pag-load ng pahina',
  '🧹 Naglinis ng lumang code',
  '🍜 Kumain muna ng pancit canton bago mag-code',
  '🦋 Inayos ang bug na hindi naman pala bug',
  '🎵 Pinakinggan ang playlist habang nag-code',
  '📷 Nagdagdag ng bagong section',
];

let fakeCount = 0;

commitBtn.addEventListener('click', (event) => {
  const entry = {
    hash: 'sim' + Math.random().toString(16).slice(2, 8),
    date: 'ngayon',
    message: FAKE_MESSAGES[Math.floor(Math.random() * FAKE_MESSAGES.length)],
    simulated: true,
  };
  timeline.insertBefore(buildCommit(entry), timeline.firstChild);

  fakeCount += 1;
  hint.textContent =
    fakeCount === 1
      ? 'Nakagawa ka na ng 1 simuladong commit! Sa totoong buhay, may kasama itong pagbabago sa code. ✏️'
      : 'May ' + fakeCount + ' simuladong commits ka na! Sa totoong buhay, may kasama itong pagbabago sa code. ✏️';
});

// Pantulong para makagawa ng commit element
function buildCommit(entry) {
  const div = document.createElement('div');
  div.className = 'commit' + (entry.simulated ? ' simulated' : '');

  const body = document.createElement('div');
  body.className = 'commit-body';

  const top = document.createElement('div');
  top.className = 'commit-top';

  const hash = document.createElement('span');
  hash.className = 'hash';
  hash.textContent = entry.hash;

  const date = document.createElement('span');
  date.className = 'date';
  date.textContent = entry.date;

  top.appendChild(hash);
  if (entry.simulated) {
    const badge = document.createElement('span');
    badge.className = 'sim-badge';
    badge.textContent = '🎭 simulasyon';
    top.appendChild(badge);
  }
  top.appendChild(date);

  const msg = document.createElement('div');
  msg.className = 'msg';
  msg.textContent = entry.message;

  body.appendChild(top);
  body.appendChild(msg);

  const dot = document.createElement('div');
  dot.className = 'dot';

  div.appendChild(dot);
  div.appendChild(body);
  return div;
}

loadLog();
