import { FIRST_CHAPTER_ID, getChapter } from './registry.js';

export const PROGRESS_SCHEMA_VERSION = 2;
export const STORY_PHASES = Object.freeze(['story', 'interlude', 'awaitingNext']);

export function matchesCondition(condition, variables) {
  if (!condition) return true;
  if (condition.all) return condition.all.every((part) => matchesCondition(part, variables));
  if (condition.any) return condition.any.some((part) => matchesCondition(part, variables));
  if (condition.not) return !matchesCondition(condition.not, variables);
  return Object.hasOwn(variables, condition.var) && variables[condition.var] === condition.equals;
}

function nextSceneId(scene, variables) {
  if (typeof scene.next === 'string') return scene.next;
  if (scene.next?.routes) {
    return scene.next.routes.find((route) => matchesCondition(route.when, variables))?.to ?? scene.next.default;
  }
  return null;
}

function normalizePosition(progress) {
  if (progress.phase !== 'story') return progress;
  const chapter = getChapter(progress.chapterId);
  if (!chapter) throw new Error('Capítulo não encontrado.');

  let current = progress;
  for (let steps = 0; steps < 200; steps += 1) {
    const scene = chapter.scenes[current.sceneId];
    if (!scene) throw new Error('Cena não encontrada.');
    const entry = scene.entries[current.entryIndex];

    if (!entry) {
      const next = nextSceneId(scene, current.variables);
      if (next === 'chapterEnd') return { ...current, phase: 'interlude', entryIndex: scene.entries.length - 1 };
      if (!next || !chapter.scenes[next]) throw new Error('Transição de cena inválida.');
      current = { ...current, sceneId: next, entryIndex: 0 };
      continue;
    }
    if (!matchesCondition(entry.when, current.variables)) {
      current = { ...current, entryIndex: current.entryIndex + 1 };
      continue;
    }
    return current;
  }
  throw new Error('O roteiro contém uma sequência de transições sem diálogo.');
}

export function createInitialProgress(chapterId = FIRST_CHAPTER_ID) {
  const chapter = getChapter(chapterId);
  if (!chapter) throw new Error('Capítulo não encontrado.');
  return normalizePosition({
    schemaVersion: PROGRESS_SCHEMA_VERSION,
    contentRevision: chapter.revision,
    chapterId,
    sceneId: chapter.firstSceneId,
    entryIndex: 0,
    phase: 'story',
    variables: { ...chapter.initialVariables },
    choices: [],
    updatedAt: Date.now(),
  });
}

export function getCurrentScene(progress) {
  return getChapter(progress.chapterId)?.scenes[progress.sceneId] ?? null;
}

export function getCurrentEntry(progress) {
  if (progress.phase !== 'story') return null;
  return getCurrentScene(progress)?.entries[progress.entryIndex] ?? null;
}

export function advance(progress) {
  const entry = getCurrentEntry(progress);
  if (!entry || entry.type !== 'line') return progress;
  return normalizePosition({ ...progress, entryIndex: progress.entryIndex + 1, updatedAt: Date.now() });
}

export function choose(progress, optionId) {
  const entry = getCurrentEntry(progress);
  if (!entry || entry.type !== 'choice') return progress;
  const option = entry.options.find((candidate) => candidate.id === optionId && matchesCondition(candidate.when, progress.variables));
  if (!option) return progress;

  const chapter = getChapter(progress.chapterId);
  if (option.to && !chapter.scenes[option.to]) throw new Error('Destino da escolha não encontrado.');
  return normalizePosition({
    ...progress,
    variables: { ...progress.variables, ...option.effects },
    choices: [...progress.choices, { sceneId: progress.sceneId, entryIndex: progress.entryIndex, optionId }],
    sceneId: option.to ?? progress.sceneId,
    entryIndex: option.to ? 0 : progress.entryIndex + 1,
    updatedAt: Date.now(),
  });
}

export function finishInterlude(progress) {
  if (progress.phase !== 'interlude' && progress.phase !== 'awaitingNext') return progress;
  const chapter = getChapter(progress.chapterId);
  const next = chapter?.nextChapterId && getChapter(chapter.nextChapterId);
  if (next) return createInitialProgress(next.id);
  return { ...progress, phase: 'awaitingNext', updatedAt: Date.now() };
}

export function buildDialogueHistory(progress) {
  if (!progress) return [];
  const chapter = getChapter(progress.chapterId);
  if (!chapter) return [];

  const history = [];
  let cursor = createInitialProgress(progress.chapterId);
  let choiceCursor = 0;

  for (let steps = 0; steps < 400; steps += 1) {
    const scene = getCurrentScene(cursor);
    const entry = getCurrentEntry(cursor);
    if (!scene || !entry) break;

    const isTarget =
      cursor.sceneId === progress.sceneId &&
      cursor.entryIndex === progress.entryIndex &&
      cursor.phase === progress.phase;

    if (entry.type === 'line') {
      history.push({
        id: `${cursor.sceneId}:${cursor.entryIndex}`,
        sceneId: cursor.sceneId,
        act: scene.act,
        setting: scene.setting,
        type: 'line',
        mode: entry.mode,
        speaker: entry.speaker,
        expression: entry.expression,
        text: entry.text,
        isCurrent: isTarget,
      });
      if (isTarget) break;
      cursor = advance(cursor);
    } else if (entry.type === 'choice') {
      if (isTarget) break;
      const recorded =
        progress.choices.find(
          (c, idx) => idx >= choiceCursor && c.sceneId === cursor.sceneId && c.entryIndex === cursor.entryIndex
        ) ?? progress.choices[choiceCursor];
      if (!recorded) break;
      choiceCursor += 1;
      const chosenOption = entry.options.find((opt) => opt.id === recorded.optionId);
      history.push({
        id: `${cursor.sceneId}:${cursor.entryIndex}:choice`,
        sceneId: cursor.sceneId,
        act: scene.act,
        setting: scene.setting,
        type: 'choice',
        mode: 'choice',
        speaker: chapter.protagonist.name,
        prompt: entry.prompt,
        chosenLabel: chosenOption?.label ?? recorded.optionId,
        isCurrent: false,
      });
      cursor = choose(cursor, recorded.optionId);
    } else {
      break;
    }
  }

  return history;
}

export function getStageCharacters(chapter, scene, progress) {
  if (!chapter || !scene || !progress) return { left: null, right: null };
  const protagonistName = chapter.protagonist.name;
  const protagonistPortraits = chapter.assets.portraits ?? {};
  const supportingMap = chapter.assets.supportingPortraits ?? {};

  let lastProtagonistExpr = 'normal';
  let lastSupportingSpeaker = null;
  let lastSupportingExpr = 'normal';

  const maxIdx = Math.min(progress.entryIndex, scene.entries.length - 1);
  for (let i = 0; i <= maxIdx; i += 1) {
    const item = scene.entries[i];
    if (!item || !matchesCondition(item.when, progress.variables)) continue;
    if (item.type === 'choice') {
      lastProtagonistExpr = 'pensativo';
    } else if (item.type === 'line') {
      if (item.speaker === protagonistName && item.expression) {
        lastProtagonistExpr = item.expression;
      } else if (item.speaker && supportingMap[item.speaker]) {
        lastSupportingSpeaker = item.speaker;
        lastSupportingExpr = item.expression ?? 'normal';
      }
    }
  }

  const entry = scene.entries[progress.entryIndex];
  const isProtagonistSpeaking =
    entry?.type === 'choice' ||
    (entry?.type === 'line' && entry.speaker === protagonistName);
  const isSupportingSpeaking =
    entry?.type === 'line' &&
    entry.mode === 'dialogue' &&
    Boolean(entry.speaker && supportingMap[entry.speaker]);

  const leftSrc = protagonistPortraits[lastProtagonistExpr] ?? protagonistPortraits.normal ?? null;
  const left = leftSrc
    ? {
        name: protagonistName,
        role: 'protagonist',
        expression: lastProtagonistExpr,
        src: leftSrc,
        active: isProtagonistSpeaking,
      }
    : null;

  let right = null;
  if (lastSupportingSpeaker && supportingMap[lastSupportingSpeaker]) {
    const portraits = supportingMap[lastSupportingSpeaker];
    const rightSrc = portraits[lastSupportingExpr] ?? portraits.normal ?? null;
    if (rightSrc) {
      right = {
        name: lastSupportingSpeaker,
        role: 'supporting',
        expression: lastSupportingExpr,
        src: rightSrc,
        active: isSupportingSpeaking,
      };
    }
  }

  return { left, right };
}

export function isValidProgress(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const chapter = getChapter(value.chapterId);
  if (!chapter || value.schemaVersion !== PROGRESS_SCHEMA_VERSION || value.contentRevision !== chapter.revision) return false;
  if (!STORY_PHASES.includes(value.phase)) return false;
  if (typeof value.sceneId !== 'string' || !Object.hasOwn(chapter.scenes, value.sceneId)) return false;
  const scene = chapter.scenes[value.sceneId];
  if (!scene || !Number.isInteger(value.entryIndex) || value.entryIndex < 0 || value.entryIndex >= scene.entries.length) return false;
  if (!Number.isFinite(value.updatedAt) || value.updatedAt <= 0) return false;
  if (!value.variables || typeof value.variables !== 'object' || Array.isArray(value.variables)) return false;
  for (const [key, initial] of Object.entries(chapter.initialVariables)) {
    if (typeof value.variables[key] !== typeof initial) return false;
  }
  if (value.phase === 'story' && !matchesCondition(scene.entries[value.entryIndex].when, value.variables)) return false;
  if (!Array.isArray(value.choices) || value.choices.length > 400) return false;
  if (!value.choices.every((choice) => (
    choice && typeof choice === 'object' && !Array.isArray(choice) &&
    typeof choice.sceneId === 'string' &&
    Number.isInteger(choice.entryIndex) && choice.entryIndex >= 0 &&
    typeof choice.optionId === 'string'
  ))) return false;

  // Replay decisions to reject impossible positions, forged variables and stale
  // choice references. awaitingNext also supports the former chapter placeholder.
  const targetPhase = value.phase === 'awaitingNext' ? 'interlude' : value.phase;
  let cursor = createInitialProgress(value.chapterId);
  let choiceIndex = 0;
  for (let steps = 0; steps < 400; steps += 1) {
    if (cursor.sceneId === value.sceneId && cursor.entryIndex === value.entryIndex && cursor.phase === targetPhase) {
      return choiceIndex === value.choices.length &&
        Object.keys(value.variables).length === Object.keys(cursor.variables).length &&
        Object.entries(cursor.variables).every(([key, expected]) => value.variables[key] === expected);
    }
    const entry = getCurrentEntry(cursor);
    if (!entry) return false;
    if (entry.type === 'choice') {
      const recorded = value.choices[choiceIndex];
      if (!recorded || recorded.sceneId !== cursor.sceneId || recorded.entryIndex !== cursor.entryIndex) return false;
      const next = choose(cursor, recorded.optionId);
      if (next === cursor) return false;
      cursor = next;
      choiceIndex += 1;
    } else {
      cursor = advance(cursor);
    }
  }
  return false;
}
