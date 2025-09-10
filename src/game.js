import { shuffle, sampleSize } from './utils.js';

export class Game {
  constructor(countries) {
    this.countries = countries.map(c => ({ ...c, owner: null }));
    this.pool = this.countries.filter(c => c.isMajor);
    this._questionQueue = shuffle([...this.pool.map(c => c.id)]);
    this.currentTargetId = null;
    this.players = ['p1', 'p2'];
    this._turnIndex = 0;
    this.mode = 'single'; // 'single' | 'two'
    this.totalCountries = this.pool.length;
  }

  reset() {
    this.countries.forEach(c => { c.owner = null; });
    this._questionQueue = shuffle([...this.pool.map(c => c.id)]);
  this.currentTargetId = null;
  this._turnIndex = 0;
  }

  nextQuestion() {
    if (this._questionQueue.length === 0) return null;
    const id = this._questionQueue.shift();
    this.currentTargetId = id;
    const target = this.byId(id);

    // Build options: 1 correct + 2 distractors
    const countryOptions = shuffle([
      { id: target.id, label: target.name },
      ...sampleSize(this.pool.filter(c => c.id !== id), 2).map(c => ({ id: c.id, label: c.name })),
    ]);

    const capitalOptions = shuffle([
      { id: target.id, label: target.capital },
      ...sampleSize(this.pool.filter(c => c.id !== id), 2).map(c => ({ id: c.id, label: c.capital })),
    ]);

    return { flag: target.flag, countryOptions, capitalOptions };
  }

  answer(countryId, capitalId) {
    const target = this.byId(this.currentTargetId);
    const currentPlayer = this.currentPlayer();
    const correct = (countryId === target.id) && (capitalId === target.id);
    if (correct) {
      target.owner = currentPlayer;
    }
    // Always advance turn regardless of correctness in two-player mode
    if (this.mode === 'two') {
      if (!correct) this._questionQueue.push(this.currentTargetId);
      this.nextTurn();
    }
    return {
      correct,
      correctCountryName: target.name,
      correctCapitalName: target.capital,
    };
  }

  skip() {
    if (this.currentTargetId != null) {
      // push it back later
      this._questionQueue.push(this.currentTargetId);
    }
  if (this.mode === 'two') this.nextTurn();
  }

  conqueredCount() {
    return this.pool.filter(c => c.owner === 'p1').length;
  }

  score(player) {
    return this.pool.filter(c => c.owner === player).length;
  }

  isWin() {
    if (this.mode === 'single') {
      return this.score('p1') > Math.floor(this.totalCountries / 2);
    }
    // In two-player, win is declared at the very end or when one cannot be surpassed
    // Keep simple: first to > half also wins immediately
    return this.score('p1') > Math.floor(this.totalCountries / 2) || this.score('p2') > Math.floor(this.totalCountries / 2);
  }

  winnerPlayer() {
    if (this.mode === 'single') {
      return this.score('p1') > Math.floor(this.totalCountries / 2) ? 'p1' : null;
    }
    if (this.score('p1') > Math.floor(this.totalCountries / 2)) return 'p1';
    if (this.score('p2') > Math.floor(this.totalCountries / 2)) return 'p2';
    return null;
  }

  getCountryFillClass(id) {
    const c = this.byId(id);
    if (!c) return '';
    if (c.owner === 'p1') return 'conquered-p1';
    if (c.owner === 'p2') return 'conquered-p2';
    return '';
  }

  byId(id) { return this.countries.find(c => c.id === id); }

  currentPlayer() { return this.players[this._turnIndex % this.players.length]; }
  setMode(mode) { this.mode = mode; }
  nextTurn() { this._turnIndex = (this._turnIndex + 1) % this.players.length; }
}
