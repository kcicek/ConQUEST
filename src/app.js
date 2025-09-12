import { Game } from './game.js';
import { renderMap } from './map.js';
import { majorCountries } from './data.js';
import { el, clearChildren, choiceButton } from './ui.js';

// --- Intro flag banner population ---
function renderIntroFlagBanner() {
  const $banner = document.getElementById('introFlagBanner');
  if (!$banner) return;
  $banner.innerHTML = '';
  // Pick 10 random unique countries with flagCode
  const pool = majorCountries.filter(c => c.flagCode);
  const used = new Set();
  while ($banner.childElementCount < 10 && used.size < pool.length) {
    const idx = Math.floor(Math.random() * pool.length);
    if (used.has(idx)) continue;
    used.add(idx);
    const c = pool[idx];
    const img = document.createElement('img');
    img.src = `https://flagcdn.com/w40/${c.flagCode.toLowerCase()}.png`;
    img.alt = c.name + ' flag';
    img.title = c.name;
    img.onerror = () => { img.style.display = 'none'; };
    $banner.appendChild(img);
  }
}

// App state
const state = {
  game: null,
  selectedCountryId: null,
  selectedCapitalId: null,
  mode: 'single',
  p1Name: 'Player 1',
  p2Name: 'Player 2',
  submitted: false,
  timerId: null,
  timeLeft: 0,
  turnSeconds: 10,
  inputEnabledAt: 0,
};

// Elements
const $introScreen = document.getElementById('introScreen');
const $introForm = document.getElementById('introForm');
const $introMode = document.getElementById('introMode');
const $p1NameInput = document.getElementById('p1Name');
const $p2NameInput = document.getElementById('p2Name');
const $p1NameField = document.getElementById('p1NameField');
const $p2NameField = document.getElementById('p2NameField');
const $gameRoot = document.getElementById('gameRoot');
const $introTimerSeconds = document.getElementById('introTimerSeconds');
const $mapContainer = document.getElementById('mapContainer');
const $countryChoices = document.getElementById('countryChoices');
const $capitalChoices = document.getElementById('capitalChoices');
const $flagEmoji = document.getElementById('flagEmoji');
const $feedback = document.getElementById('feedback');
const $submit = document.getElementById('submitBtn');
const $newGame = document.getElementById('newGameBtn');
const $playAgain = document.getElementById('playAgainBtn');
const $overlay = document.getElementById('overlay');
const $modeSelect = document.getElementById('modeSelect');
const $turnBadge = document.getElementById('turnBadge');
const $playSection = document.getElementById('playSection');
const $toast = document.getElementById('toast');
const $playerBanner = document.getElementById('playerBanner');
const $topBar = document.querySelector('#playSection .top-bar');
const $surrenderBtn = document.getElementById('surrenderBtn');
const $turnTimer = document.getElementById('turnTimer');
// New side panels
const $p1Panel = document.getElementById('p1Panel');
const $p2Panel = document.getElementById('p2Panel');
const $p1PanelName = document.getElementById('p1PanelName');
const $p2PanelName = document.getElementById('p2PanelName');
const $p1PanelScore = document.getElementById('p1PanelScore');
const $p2PanelScore = document.getElementById('p2PanelScore');
const $p1FlagGrid = document.getElementById('p1FlagGrid');
const $p2FlagGrid = document.getElementById('p2FlagGrid');

function init() {
  // Show intro screen, hide game
  $introScreen.style.display = '';
  $gameRoot.style.display = 'none';
  $p2NameField.style.display = 'none';
  $introMode.addEventListener('change', () => {
    $p2NameField.style.display = $introMode.value === 'two' ? '' : 'none';
  });
  $introForm.addEventListener('submit', (e) => {
    e.preventDefault();
    state.mode = $introMode.value;
    state.p1Name = $p1NameInput.value.trim() || 'Player 1';
    state.p2Name = $p2NameInput.value.trim() || 'Player 2';
  state.turnSeconds = parseInt(($introTimerSeconds && $introTimerSeconds.value) || '10', 10);
  // Reflect names into panels early
  $p1PanelName.textContent = state.p1Name;
  $p2PanelName.textContent = state.p2Name;
    startGame();
  });
  bindEvents();
}

function startGame() {
  $introScreen.style.display = 'none';
  $gameRoot.style.display = '';
  // Sync mode selector in header (if present)
  if ($modeSelect) $modeSelect.value = state.mode;
  // Update side panel names and visibility immediately
  $p1PanelName.textContent = state.p1Name;
  $p2PanelName.textContent = state.p2Name;
  $p2Panel.style.display = state.mode === 'two' ? '' : 'none';
  state.game = new Game(majorCountries);
  state.game.setMode(state.mode);
  renderWorld();
  restart();

  // Show Surrender button only in two-player mode
  if ($surrenderBtn) $surrenderBtn.style.display = (state.mode === 'two') ? 'block' : 'none';
}

function bindEvents() {
  $newGame.addEventListener('click', () => showIntroScreen());
  $playAgain.addEventListener('click', () => { hideOverlay(); restart(); });
  if ($surrenderBtn) {
    $surrenderBtn.addEventListener('click', () => {
      if (state.game && state.mode === 'two') {
        // The other player wins
        const loser = state.game.currentPlayer();
        const winner = loser === 'p1' ? 'p2' : 'p1';
        const name = winner === 'p1' ? state.p1Name : state.p2Name;
        showOverlay(`${name} wins! 🎉`, `${name} wins by surrender.`);
      }
    });
  }
// Show intro screen and hide game UI
function showIntroScreen() {
  clearTurnTimer();
  $introScreen.style.display = '';
  $gameRoot.style.display = 'none';
  // Optionally reset form fields
  $p1NameInput.value = '';
  $p2NameInput.value = '';
  $introMode.value = 'single';
  $p2NameField.style.display = 'none';
}
  if ($modeSelect) {
    $modeSelect.addEventListener('change', () => {
      state.mode = $modeSelect.value === 'two' ? 'two' : 'single';
      state.game.setMode(state.mode);
      restart();
    });
  }
}
function restart() {
  clearTurnTimer();
  state.game.reset();
  state.selectedCapitalId = null;
  state.selectedCountryId = null;
  clearChildren($countryChoices);
  clearChildren($capitalChoices);
  $feedback.textContent = '';
  // submission state gate
  state.submitted = false;
  // Reset flag grids
  clearChildren($p1FlagGrid);
  clearChildren($p2FlagGrid);
  // Update side panel names and visibility
  $p1PanelName.textContent = state.p1Name;
  $p2PanelName.textContent = state.p2Name;
  $p2Panel.style.display = state.mode === 'two' ? '' : 'none';
  renderWorld();
  nextTurn();
  updateScores();
  updateTurnBadge();
  updatePlaySectionColor();
  updatePlayerBanner();
  updateActivePanel();
}

function renderWorld() {
  clearChildren($mapContainer);
  const svg = renderMap({
    countries: state.game.countries,
    onCountryClick: (id) => {
      // Optional: allow tapping a country to highlight it. Not tied to answers.
      const path = svg.querySelector(`[data-id="${id}"]`);
      if (path) {
        svg.querySelectorAll('.country').forEach(p => p.classList.remove('selected'));
        path.classList.add('selected');
      }
    },
    getFillClass: (id) => state.game.getCountryFillClass(id),
  });
  $mapContainer.appendChild(svg);
}

function nextTurn() {
  const q = state.game.nextQuestion();
  if (!q) {
    showOverlay('Game Over', 'No more countries left.');
    return;
  }
  // Reset feedback center mode
  $feedback.classList.remove('centered');
  // Show Surrender button only in two-player mode
  if ($surrenderBtn) $surrenderBtn.style.display = (state.mode === 'two') ? 'block' : 'none';
  updateTurnBadge();
  $flagEmoji.innerHTML = '';
  state.submitted = false;
  // Small grace period to avoid ghost taps selecting in the next turn
  state.inputEnabledAt = Date.now() + 280;
  // Remove focus from any previously focused element
  if (document.activeElement && typeof document.activeElement.blur === 'function') {
    document.activeElement.blur();
  }
  const country = state.game.pool.find(c => c.id === state.game.currentTargetId);
  if (country && country.flagCode) {
    const img = document.createElement('img');
    const code = (country.flagCode || '').toLowerCase();
    img.src = `https://flagcdn.com/w80/${code}.png`;
    img.alt = country.name + ' flag';
    img.title = country.name + ' flag';
    img.onerror = () => {
      const chip = document.createElement('div');
      chip.style.width = '48px';
      chip.style.height = '36px';
      chip.style.borderRadius = '6px';
      chip.style.display = 'flex';
      chip.style.alignItems = 'center';
      chip.style.justifyContent = 'center';
      chip.style.background = '#0b1220';
      chip.style.border = '1px solid #1f2937';
      chip.style.color = '#e5e7eb';
      chip.style.fontSize = '12px';
      chip.textContent = country.name.slice(0,3).toUpperCase();
      $flagEmoji.innerHTML = '';
      $flagEmoji.appendChild(chip);
    };
    $flagEmoji.appendChild(img);
  } else {
    $flagEmoji.textContent = (typeof q.flag === 'string' && q.flag.length > 0) ? q.flag : '🏳️';
  }
  $feedback.textContent = '';
  state.selectedCountryId = null;
  state.selectedCapitalId = null;

  // Only start timer if not Cheater mode (0 seconds)
  if (state.turnSeconds && state.turnSeconds > 0) {
    startTurnTimer(state.turnSeconds);
    if ($turnTimer) $turnTimer.style.visibility = '';
  } else {
    clearTurnTimer();
    if ($turnTimer) $turnTimer.style.visibility = 'hidden';
  }

  renderChoices($countryChoices, q.countryOptions, (id) => {
    state.selectedCountryId = id;
    maybeEnableSubmit();
  });
  renderChoices($capitalChoices, q.capitalOptions, (id) => {
    state.selectedCapitalId = id;
    maybeEnableSubmit();
  });
  updateActivePanel();
}

function renderChoices(container, options, onPick) {
  clearChildren(container);
  // Reset choice container state
  container.dataset.chosen = '0';
  options.forEach(opt => {
    const btn = choiceButton(opt.label);
    btn.addEventListener('click', () => {
      // Ignore clicks if turn not yet fully active or already chosen/submitted
      if (Date.now() < state.inputEnabledAt) return;
      if (state.submitted) return;
      if (container.dataset.chosen === '1') return;
      // Mark selected and hide the others
      container.querySelectorAll('.choice').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      container.dataset.chosen = '1';
      container.querySelectorAll('.choice').forEach(b => {
        if (b !== btn) {
          b.classList.add('vanish');
          b.disabled = true;
        }
      });
      onPick(opt.id);
    });
    container.appendChild(btn);
  });
}

function maybeEnableSubmit() {
  if (!state.submitted && state.selectedCapitalId && state.selectedCountryId) {
  onSubmit();
  }
}

function onSubmit() {
  if (state.submitted) return;
  if (!state.selectedCapitalId || !state.selectedCountryId) return;
  state.submitted = true;
  clearTurnTimer();
  // Capture answering player BEFORE answer() possibly advances the turn
  const answeringPlayer = state.game.currentPlayer();
  const result = state.game.answer(state.selectedCountryId, state.selectedCapitalId);
  if (result.correct) {
    let playerName = answeringPlayer === 'p1' ? state.p1Name : state.p2Name;
    if (state.game.mode === 'single') playerName = state.p1Name;
    $feedback.textContent = `Correct! Country conquered for ${playerName}.`;
  $feedback.className = 'feedback success';
    showToast(`+1 for ${playerName}!`);
    playSound('correct');
    // Add flag chip to answering player's grid
    const country = state.game.byId(state.game.currentTargetId);
    if (country && country.flagCode) {
      const chip = document.createElement('div');
      chip.className = 'flag-chip';
      chip.title = country.name;
      const img = document.createElement('img');
      const code = (country.flagCode || '').toLowerCase();
      img.src = `https://flagcdn.com/w80/${code}.png`;
      img.alt = country.name + ' flag';
      img.onerror = () => {
        chip.innerHTML = '';
        const fallback = document.createElement('div');
        fallback.style.width = '100%';
        fallback.style.height = '100%';
        fallback.style.display = 'flex';
        fallback.style.alignItems = 'center';
        fallback.style.justifyContent = 'center';
        fallback.style.fontSize = '10px';
        fallback.style.color = '#e5e7eb';
        fallback.textContent = country.name.slice(0,3).toUpperCase();
        chip.appendChild(fallback);
      };
      chip.appendChild(img);
      (answeringPlayer === 'p1' ? $p1FlagGrid : $p2FlagGrid).appendChild(chip);
    }
  } else {
    $feedback.textContent = `Wrong. Correct answer: ${result.correctCountryName} / ${result.correctCapitalName}.`;
  $feedback.className = 'feedback error';
    playSound('wrong');
  }
  // Re-render map immediately to reflect new owner
  renderWorld();
  // Pulse the conquered country briefly (if correct)
  if (result.correct) {
    const svg = $mapContainer.querySelector('svg');
    const path = svg && svg.querySelector(`[data-id="${state.game.currentTargetId}"]`);
    if (path) {
      path.classList.add('pulse-win');
      setTimeout(() => path.classList.remove('pulse-win'), 820);
    }
  }

  updateScores();
  if (state.game.isWin()) {
    const winner = state.game.winnerPlayer();
    let title, msg;
    if (winner) {
      const name = winner === 'p1' ? state.p1Name : state.p2Name;
      title = `${name} wins! 🎉`;
      msg = `${name} has conquered more than half of the world.`;
    } else {
      title = 'You win! 🎉';
      msg = 'You have conquered more than half of the world.';
    }
    showOverlay(title, msg);
  } else {
    // Always proceed to next turn after brief pause
  // Center feedback during the brief pause (questions stay visible)
  $feedback.classList.add('centered');
  setTimeout(() => { nextTurn(); updateTurnBadge(); updatePlaySectionColor(); updatePlayerBanner(); }, 850);
  setTimeout(() => { updateActivePanel(); }, 860);
  }
}


function showOverlay(title, message) {
  // Stop any active turn countdown when showing overlay (win/surrender/game over)
  clearTurnTimer();
  if ($turnTimer) {
    $turnTimer.classList.remove('warn','danger');
    $turnTimer.style.visibility = 'hidden';
  }
  document.getElementById('overlayTitle').textContent = title;
  document.getElementById('overlayMessage').textContent = message;
  $overlay.classList.remove('hidden');
}

function hideOverlay() {
  $overlay.classList.add('hidden');
}

function updateTurnBadge() {
  if (!$turnBadge) return;
  const player = state.game.currentPlayer();
  if (state.game.mode === 'single') {
  $turnBadge.textContent = 'Single Player';
  $turnBadge.classList.remove('p1','p2');
  } else {
  $turnBadge.textContent = `Turn: ${player.toUpperCase()}`;
  $turnBadge.classList.toggle('p1', player === 'p1');
  $turnBadge.classList.toggle('p2', player === 'p2');
  }
}

function updateScores() {
  $p1PanelScore.textContent = state.game.score('p1').toString();
  $p2PanelScore.textContent = state.game.score('p2').toString();
}

  function updatePlaySectionColor() {
    const player = state.game.currentPlayer();
    if (state.game.mode === 'single') {
      $playSection.classList.remove('p1','p2');
      return;
    }
    $playSection.classList.toggle('p1', player === 'p1');
    $playSection.classList.toggle('p2', player === 'p2');
  }

  function updatePlayerBanner() {
    if (!$playerBanner) return;
    // Clean timer state each turn
    if ($turnTimer) $turnTimer.classList.remove('warn','danger');
    if (state.game.mode === 'single') {
      $playerBanner.textContent = state.p1Name;
      $playerBanner.classList.remove('p1','p2');
      return;
    }
    const player = state.game.currentPlayer();
    const name = player === 'p1' ? state.p1Name : state.p2Name;
    $playerBanner.textContent = name;
    $playerBanner.classList.toggle('p1', player === 'p1');
    $playerBanner.classList.toggle('p2', player === 'p2');
  }

  function updateActivePanel() {
    const player = state.game.currentPlayer();
    $p1Panel.classList.toggle('active', state.game.mode !== 'single' && player === 'p1');
    $p2Panel.classList.toggle('active', state.game.mode !== 'single' && player === 'p2');
  }

  function playSound(type) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = 'sine';
      if (type === 'correct') {
        o.frequency.value = 880; // A5
        g.gain.setValueAtTime(0.0001, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
        o.start(); o.stop(ctx.currentTime + 0.2);
      } else {
        o.frequency.value = 220; // A3
        o.type = 'triangle';
        g.gain.setValueAtTime(0.0001, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);
        o.start(); o.stop(ctx.currentTime + 0.25);
      }
    } catch (e) {
      // Ignore audio errors (e.g., autoplay policies)
    }
  }

function showToast(text) {
  $toast.textContent = text;
  $toast.classList.add('show');
  setTimeout(() => $toast.classList.remove('show'), 1000);
}

// Turn timer helpers
function startTurnTimer(seconds) {
  if (!$turnTimer) return;
  clearTurnTimer();
  state.timeLeft = seconds;
  $turnTimer.textContent = state.timeLeft.toString();
  $turnTimer.classList.remove('warn','danger');
  state.timerId = setInterval(() => {
    state.timeLeft -= 1;
    if (state.timeLeft <= 0) {
      $turnTimer.textContent = '0';
      $turnTimer.classList.add('danger');
      clearTurnTimer();
      handleTimeUp();
    } else {
      $turnTimer.textContent = state.timeLeft.toString();
      if (state.timeLeft <= 2) {
        $turnTimer.classList.add('danger');
        $turnTimer.classList.remove('warn');
      } else if (state.timeLeft <= 4) {
        $turnTimer.classList.add('warn');
      }
    }
  }, 1000);
}

function clearTurnTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

function handleTimeUp() {
  // If already submitted (just in case), do nothing
  if (state.submitted) return;
  // Auto-mark wrong and advance
  state.selectedCountryId = null;
  state.selectedCapitalId = null;
  state.submitted = true;
  playSound('wrong');
  $feedback.textContent = 'Time\'s up!';
  $feedback.className = 'feedback warn';
  $feedback.classList.add('centered');
  // Requeue the country and advance turn via game.skip()
  state.game.skip();
  // Proceed to next turn after a short delay
  setTimeout(() => { nextTurn(); updateTurnBadge(); updatePlaySectionColor(); updatePlayerBanner(); }, 850);
}

// Boot
document.addEventListener('DOMContentLoaded', () => {
  renderIntroFlagBanner();
  init();
});
