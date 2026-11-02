import { useCallback, useEffect, useRef } from 'react';
import { finishInterlude } from '../engine.js';
import { getChapter } from '../registry.js';

export default function InterludeScreen({ progress, scene, reducedMotion, paused = false, onProgress, onOpenChapters }) {
  const completed = useRef(false);
  const lastLine = scene.entries.at(-1);
  const currentChapter = getChapter(progress.chapterId);
  const nextChapter = currentChapter?.nextChapterId ? getChapter(currentChapter.nextChapterId) : null;
  const background = currentChapter?.assets.backgrounds?.[scene.background];

  const finish = useCallback(() => {
    if (completed.current || paused) return;
    completed.current = true;
    onProgress(finishInterlude(progress));
  }, [onProgress, paused, progress]);

  useEffect(() => {
    if (paused) return undefined;
    const timer = setTimeout(finish, reducedMotion ? 1800 : 3600);
    return () => clearTimeout(timer);
  }, [finish, paused, reducedMotion]);

  return (
    <main className={'story-stage story-stage--' + scene.background + ' interlude-screen' + (reducedMotion ? ' interlude-screen--reduced' : '')} style={background ? { backgroundImage: `url("${import.meta.env.BASE_URL + background}")`, backgroundPosition: 'center', backgroundSize: 'cover' } : undefined}>
      <div className="interlude-screen__last-frame" aria-hidden="true">
        <span>{scene.setting}</span>
        {lastLine?.type === 'line' && <p>{lastLine.text}</p>}
      </div>
      <div className="interlude-screen__veil" />
      <div className="interlude-screen__center">
        <p className="interlude-screen__message">Enquanto isso...</p>
        {nextChapter && (
          <p className="interlude-screen__next">
            A seguir · Capítulo {nextChapter.number}: {nextChapter.title} ({nextChapter.protagonist.name})
          </p>
        )}
      </div>
      <div className="interlude-screen__controls">
        {onOpenChapters && (
          <button className="interlude-screen__skip" type="button" onClick={onOpenChapters}>CAPÍTULOS</button>
        )}
        <button className="interlude-screen__skip" type="button" onClick={finish}>
          {nextChapter ? `AVANÇAR PARA CAPÍTULO ${nextChapter.number}` : 'PULAR TRANSIÇÃO'}
        </button>
      </div>
    </main>
  );
}
