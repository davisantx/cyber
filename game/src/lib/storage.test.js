import assert from 'node:assert/strict';
import test from 'node:test';
import { DEFAULT_PREFERENCES, PREFERENCES_KEY, readPreferences, writePreferences } from './preferences.js';
import { BACKUP_SAVE_KEY, LEGACY_SAVE_KEY, readSave, readSaveStatus, SAVE_KEY, writeSave } from './save.js';
import { createInitialProgress, advance } from '../story/engine.js';
import { nextOptionIndex } from './menuNavigation.js';

function memoryStorage() {
  const items = new Map();
  return { getItem: key => items.get(key) ?? null, setItem: (key, value) => items.set(key, value) };
}

test('preferences persist and invalid fields fall back safely', () => {
  const storage = memoryStorage();
  assert.deepEqual(readPreferences(storage), DEFAULT_PREFERENCES);
  assert.equal(writePreferences({ textSpeed: 'rapida', reducedMotion: true, masterVolume: 45, musicVolume: 120, effectsVolume: 30 }, storage), true);
  assert.deepEqual(readPreferences(storage), { textSpeed: 'rapida', reducedMotion: true, masterVolume: 45, musicVolume: 100, effectsVolume: 30 });
  assert.equal(writePreferences({ textSpeed: 'instantanea', textScale: 'projetor', reducedMotion: false, masterVolume: 80, musicVolume: 60, effectsVolume: 70 }, storage), true);
  assert.deepEqual(readPreferences(storage), { textSpeed: 'instantanea', textScale: 'projetor', reducedMotion: false, masterVolume: 80, musicVolume: 60, effectsVolume: 70 });
  storage.setItem(PREFERENCES_KEY, '{broken');
  assert.deepEqual(readPreferences(storage), DEFAULT_PREFERENCES);
});

test('narrative progress persists and resumes at the exact line', () => {
  const storage = memoryStorage();
  const progress = advance(createInitialProgress());
  assert.equal(writeSave(progress, storage), true);
  assert.deepEqual(readSave(storage), progress);
  assert.equal(readSave(storage).entryIndex, 1);
});

test('incompatible progress is reported and preserved', () => {
  const storage = memoryStorage();
  const progress = { ...createInitialProgress(), contentRevision: 'old-script' };
  storage.setItem(SAVE_KEY, JSON.stringify(progress));
  assert.equal(readSave(storage), null);
  assert.match(readSaveStatus(storage).issue, /outra versão/);
  assert.equal(storage.getItem(SAVE_KEY), JSON.stringify(progress));
  assert.equal(writeSave(createInitialProgress(), storage), true);
  assert.equal(storage.getItem(BACKUP_SAVE_KEY), JSON.stringify(progress));
  storage.setItem(SAVE_KEY, '{broken');
  assert.match(readSaveStatus(storage).issue, /não pode ser lido/);
  assert.equal(storage.getItem(SAVE_KEY), '{broken');
});

test('legacy progress remains available for manual recovery', () => {
  const storage = memoryStorage();
  storage.setItem(LEGACY_SAVE_KEY, '{"schemaVersion":1}');
  assert.equal(readSave(storage), null);
  assert.match(readSaveStatus(storage).issue, /versão anterior/);
  assert.equal(storage.getItem(LEGACY_SAVE_KEY), '{"schemaVersion":1}');
});

test('blocked localStorage access does not prevent starting a session', () => {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    get() { throw new DOMException('Storage denied', 'SecurityError'); },
  });
  try {
    assert.deepEqual(readPreferences(), DEFAULT_PREFERENCES);
    assert.equal(writePreferences(DEFAULT_PREFERENCES), false);
    assert.equal(readSave(), null);
    assert.match(readSaveStatus().issue, /não está disponível/);
    assert.equal(writeSave(createInitialProgress()), false);
  } finally {
    if (descriptor) Object.defineProperty(globalThis, 'localStorage', descriptor);
    else delete globalThis.localStorage;
  }
});

test('successive incompatible saves are backed up without blocking new games', () => {
  const storage = memoryStorage();
  const originals = ['first', 'second', 'third'].map(contentRevision =>
    JSON.stringify({ ...createInitialProgress(), contentRevision }));
  originals.forEach((raw, index) => {
    storage.setItem(SAVE_KEY, raw);
    const next = advance(createInitialProgress());
    assert.equal(writeSave(next, storage), true);
    assert.deepEqual(readSave(storage), next);
    assert.equal(storage.getItem(index ? `${BACKUP_SAVE_KEY}:${index + 1}` : BACKUP_SAVE_KEY), raw);
  });
  assert.equal(storage.getItem(BACKUP_SAVE_KEY), originals[0]);
  storage.setItem(SAVE_KEY, originals[1]);
  assert.equal(writeSave(createInitialProgress(), storage), true);
  assert.equal(storage.getItem(`${BACKUP_SAVE_KEY}:4`), null, 'existing backups are reused');
});

test('quota errors preserve the incompatible save and report failure', () => {
  const previous = JSON.stringify({ ...createInitialProgress(), contentRevision: 'old' });
  const storage = {
    getItem: key => key === SAVE_KEY ? previous : null,
    setItem() { throw new DOMException('Full', 'QuotaExceededError'); },
  };
  assert.equal(writeSave(createInitialProgress(), storage), false);
  assert.equal(storage.getItem(SAVE_KEY), previous);
  assert.equal(writePreferences(DEFAULT_PREFERENCES, storage), false);
});

test('arrow navigation wraps around enabled menu options', () => {
  assert.equal(nextOptionIndex('ArrowDown', -1, 3), 0);
  assert.equal(nextOptionIndex('ArrowDown', 2, 3), 0);
  assert.equal(nextOptionIndex('ArrowUp', 0, 3), 2);
  assert.equal(nextOptionIndex('Home', 2, 3), 0);
  assert.equal(nextOptionIndex('End', 0, 3), 2);
});
