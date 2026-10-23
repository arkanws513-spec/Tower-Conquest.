'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const match = html.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(match, 'index.html must contain the game script');
assert.doesNotThrow(() => new vm.Script(match[1]), 'game script must parse');

function createGame() {
  const elements = new Map();
  const get = id => {
    if (!elements.has(id)) {
      const listeners = {};
      elements.set(id, {
        id, value: id === 'playerCount' ? '2' : '', innerHTML: '', textContent: '',
        disabled: false, open: false, style: {},
        classList: { toggle() {} },
        addEventListener(type, callback) { listeners[type] = callback; },
        dispatch(type, event) { if (listeners[type]) listeners[type](event); },
        scrollIntoView() {},
      });
    }
    return elements.get(id);
  };
  const document = { getElementById: get };
  vm.runInNewContext(match[1], { document, window: {}, console });
  return { get, elements };
}
function groups(svg) {
  return [...svg.matchAll(/<g class="cell" data-k="([^"]+)"[\s\S]*?<\/g>/g)]
    .map(m => ({ key: m[1], html: m[0] }));
}
function clickCell(board, key) {
  board.dispatch('click', { target: { closest: selector => selector === '[data-k]' ? { dataset: { k: key } } : null } });
}
function pieceTotal(board) {
  return groups(board.innerHTML).filter(g => /<circle[^>]*r="(?:13|10\.5)"[^>]*fill="#(?:e75c64|53a9ff|65d49a|f5b84e|b29aff)"/.test(g.html)).length;
}

{
  const { get } = createGame();
  const board = get('board');
  assert.equal(groups(board.innerHTML).length, 91, 'hex board should have 91 cells');
  assert.equal((get('players').innerHTML.match(/12 قطعة/g) || []).length, 2, 'two players should each start with 12 pieces');
  assert.equal(get('pieceMetric').textContent, '12', 'current player should start with 12 pieces');
  console.log('PASS: initial two-player game and 91-cell board');
}
{
  const { get } = createGame();
  get('playerCount').value = '5';
  get('newGame').onclick();
  assert.equal((get('players').innerHTML.match(/12 قطعة/g) || []).length, 5, 'five players should each start with 12 pieces');
  assert.equal(groups(get('board').innerHTML).length, 91, 'board remains 91 cells with five players');
  console.log('PASS: five-player setup and piece allocation');
}
{
  const { get } = createGame();
  const board = get('board');
  const initialTotal = pieceTotal(board);
  const ownPiece = groups(board.innerHTML).find(g => g.html.includes('fill="#e75c64"') && /<text/.test(g.html));
  assert.ok(ownPiece, 'red player should have a selectable piece');
  clickCell(board, ownPiece.key);
  const destination = groups(board.innerHTML).find(g => g.html.includes('r="4.5" fill="#58d5a1"') && !/<text/.test(g.html));
  assert.ok(destination, 'selecting a piece should show at least one legal destination');
  clickCell(board, destination.key);
  assert.equal(get('turnName').textContent, 'الأزرق', 'a legal move should advance the turn');
  assert.equal(pieceTotal(board), initialTotal, 'a normal move should not change the number of pieces');
  assert.equal(get('undoBtn').disabled, false, 'undo should be enabled after a move');
  get('undoBtn').onclick();
  assert.equal(get('turnName').textContent, 'الأحمر', 'undo should restore the player whose turn it was');
  assert.equal(pieceTotal(board), initialTotal, 'undo should restore the board piece count');
  console.log('PASS: legal move, turn advance, and undo');
}
{
  const { get } = createGame();
  get('hintBtn').onclick();
  assert.ok(get('hint').textContent.includes('اقتراح'), 'hint button should provide a tactical suggestion');
  console.log('PASS: tactical hint action');
}
console.log('All JABHAT smoke tests passed.');
