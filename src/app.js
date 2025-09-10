import { Game } from './game.js';
import { renderMap } from './map.js';
import { majorCountries } from './data.js';
import { el, clearChildren, choiceButton } from './ui.js';

// App state
const state = {
  game: null,
  selectedCountryId: null,
  selectedCapitalId: null,
};

// Elements
const $mapContainer = document.getElementById('mapContainer');
const $countryChoices = document.getElementById('countryChoices');
const $capitalChoices = document.getElementById('capitalChoices');
const $flagEmoji = document.getElementById('flagEmoji');
const $feedback = document.getElementById('feedback');
const $submit = document.getElementById('submitBtn');
const $skip = document.getElementById('skipBtn');
const $newGame = document.getElementById('newGameBtn');
const $playAgain = document.getElementById('playAgainBtn');
const $overlay = document.getElementById('overlay');
const $totalCount = document.getElementById('totalCount');
const $modeSelect = document.getElementById('modeSelect');
const $turnBadge = document.getElementById('turnBadge');
const $p1Score = document.getElementById('p1Score');
const $p2Score = document.getElementById('p2Score');
const $playSection = document.getElementById('playSection');
const $toast = document.getElementById('toast');
const $playerBanner = document.getElementById('playerBanner');

function init() {
  console.log('DEBUG: majorCountries', majorCountries);
  state.game = new Game(majorCountries);
  $totalCount.textContent = state.game.totalCountries.toString();
  renderWorld();
  bindEvents();
  nextTurn();
  updateScores();
  updateTurnBadge();
  updatePlaySectionColor();
  updatePlayerBanner();
}

function bindEvents() {
  $submit.addEventListener('click', onSubmit);
  $skip.addEventListener('click', onSkip);
  $newGame.addEventListener('click', () => restart());
  $playAgain.addEventListener('click', () => { hideOverlay(); restart(); });
  $modeSelect.addEventListener('change', () => {
    state.game.setMode($modeSelect.value === 'two' ? 'two' : 'single');
    restart();
  });
}
function restart() {
  state.game.reset();
  state.selectedCapitalId = null;
  state.selectedCountryId = null;
  clearChildren($countryChoices);
  clearChildren($capitalChoices);
  $feedback.textContent = '';
  $submit.disabled = true;
  renderWorld();
  nextTurn();
  updateScores();
  updateTurnBadge();
  updatePlaySectionColor();
  updatePlayerBanner();
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
  console.log('DEBUG: nextQuestion', q);
  if (!q) {
    // All covered
    showOverlay('Game Over', 'No more countries left.');
    return;
  }
  updateTurnBadge();
  // Show flag image if flagCode is present, else fallback to emoji
  $flagEmoji.innerHTML = '';
  const country = state.game.pool.find(c => c.id === state.game.currentTargetId);
  if (country && country.flagCode) {
    const img = document.createElement('img');
    img.src = `https://flagcdn.com/w80/${country.flagCode}.png`;
    img.alt = country.name + ' flag';
    img.width = 48;
    img.height = 36;
    img.style.verticalAlign = 'middle';
    img.style.background = '#fff';
    img.style.borderRadius = '6px';
    img.style.boxShadow = '0 1px 4px #0002';
    $flagEmoji.appendChild(img);
  } else {
    $flagEmoji.textContent = (typeof q.flag === 'string' && q.flag.length > 0) ? q.flag : '🏳️';
  }
  $feedback.textContent = '';
  state.selectedCountryId = null;
  state.selectedCapitalId = null;
  $submit.disabled = true;

  // Render choices
  renderChoices($countryChoices, q.countryOptions, (id) => {
    state.selectedCountryId = id;
    maybeEnableSubmit();
  });
  renderChoices($capitalChoices, q.capitalOptions, (id) => {
    state.selectedCapitalId = id;
    maybeEnableSubmit();
  });
}

function renderChoices(container, options, onPick) {
  clearChildren(container);
  options.forEach(opt => {
    const btn = choiceButton(opt.label);
    btn.addEventListener('click', () => {
      container.querySelectorAll('.choice').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      onPick(opt.id);
    });
    container.appendChild(btn);
  });
}

function maybeEnableSubmit() {
  $submit.disabled = !(state.selectedCapitalId && state.selectedCountryId);
}

function onSubmit() {
  if (!state.selectedCapitalId || !state.selectedCountryId) return;
  const result = state.game.answer(state.selectedCountryId, state.selectedCapitalId);
  if (result.correct) {
    const player = state.game.currentPlayer();
    $feedback.textContent = `Correct! Country conquered for ${player.toUpperCase()}.`;
    $feedback.className = 'feedback success';
    showToast(`+1 for ${player.toUpperCase()}!`);
    playSound('correct');
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
    const title = winner ? `${winner.toUpperCase()} wins! 🎉` : 'You win! 🎉';
    const msg = winner ? `${winner.toUpperCase()} has conquered more than half of the world.` : 'You have conquered more than half of the world.';
    showOverlay(title, msg);
  } else {
    // Always proceed to next turn after brief pause
  setTimeout(() => { nextTurn(); updateTurnBadge(); updatePlaySectionColor(); updatePlayerBanner(); }, 650);
  }
}

function onSkip() {
  state.game.skip();
  nextTurn();
}

function showOverlay(title, message) {
  document.getElementById('overlayTitle').textContent = title;
  document.getElementById('overlayMessage').textContent = message;
  $overlay.classList.remove('hidden');
}

function hideOverlay() {
  $overlay.classList.add('hidden');
}

function updateTurnBadge() {
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
  $p1Score.textContent = state.game.score('p1').toString();
  $p2Score.textContent = state.game.score('p2').toString();
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
    if (state.game.mode === 'single') {
      $playerBanner.textContent = 'Single Player';
      $playerBanner.classList.remove('p1','p2');
      return;
    }
    const player = state.game.currentPlayer();
    $playerBanner.textContent = `${player.toUpperCase()} Turn`;
    $playerBanner.classList.toggle('p1', player === 'p1');
    $playerBanner.classList.toggle('p2', player === 'p2');
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

// Boot
document.addEventListener('DOMContentLoaded', init);
