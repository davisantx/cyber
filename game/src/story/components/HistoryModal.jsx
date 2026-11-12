import { useEffect, useMemo, useRef } from 'react';
import ModalShell from '../../components/ModalShell.jsx';
import { buildDialogueHistory } from '../engine.js';
import { getChapter } from '../registry.js';

const EXPRESSION_LABELS = {
  normal: 'sereno',
  feliz: 'sorrindo',
  triste: 'abatido',
  surpreso: 'surpreso',
  constrangido: 'sem graça',
  pensativo: 'pensativo',
  aliviado: 'aliviado',
};

export default function HistoryModal({ progress, onClose }) {
  const endRef = useRef(null);
  const chapter = progress ? getChapter(progress.chapterId) : null;
  const items = useMemo(() => buildDialogueHistory(progress), [progress]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, []);

  return (
    <ModalShell
      title="Histórico do Capítulo"
      label="histórico de diálogos"
      returnLabel="VOLTAR À HISTÓRIA"
      wide
      onClose={onClose}
    >
      <p className="modal-lead">
        {chapter
          ? `Capítulo ${chapter.number}: ${chapter.title} · Releia as falas, pistas e decisões tomadas até este momento.`
          : 'Releia as falas e decisões tomadas até este momento.'}
      </p>

      <div className="history-log" role="log" aria-label="Registro de diálogos da partida">
        {items.map((item, index) => {
          const prev = index > 0 ? items[index - 1] : null;
          const showSceneHeader = !prev || prev.sceneId !== item.sceneId;

          return (
            <div key={item.id} className="history-log__group">
              {showSceneHeader && (
                <div className="history-log__scene-divider">
                  <span>{item.act}</span>
                  <span>{item.setting}</span>
                </div>
              )}

              {item.type === 'choice' ? (
                <article
                  className={
                    'history-entry history-entry--choice' +
                    (item.isBest
                      ? ' history-entry--choice-best'
                      : ' history-entry--choice-inadequate')
                  }
                >
                  <div className="history-entry__choice-header">
                    <span className="history-entry__badge">DECISÃO TOMADA</span>
                    <span
                      className={
                        'history-entry__best-badge ' +
                        (item.isBest
                          ? 'history-entry__best-badge--best'
                          : 'history-entry__best-badge--inadequate')
                      }
                    >
                      {item.isBest ? '✓ OPÇÃO MAIS ADEQUADA' : '✕ OPÇÃO NÃO ADEQUADA'}
                    </span>
                  </div>
                  <p className="history-entry__prompt">{item.prompt}</p>
                  <p className="history-entry__chosen">
                    <span aria-hidden="true">{item.isBest ? '✓' : '✕'}</span> {item.chosenLabel}
                  </p>
                </article>
              ) : (
                <article
                  className={
                    'history-entry history-entry--' +
                    item.mode +
                    (item.isCurrent ? ' history-entry--current' : '')
                  }
                >
                  {item.mode !== 'narration' && item.speaker && (
                    <header className="history-entry__header">
                      <strong className="history-entry__speaker">
                        {item.mode === 'thought' ? `💭 ${item.speaker} (pensamento)` : item.speaker}
                      </strong>
                      {item.expression && item.expression !== 'normal' && (
                        <span className="history-entry__emotion">
                          {EXPRESSION_LABELS[item.expression] ?? item.expression}
                        </span>
                      )}
                      {item.isCurrent && <span className="history-entry__current-tag">AGORA</span>}
                    </header>
                  )}
                  <p className="history-entry__text">{item.text}</p>
                </article>
              )}
            </div>
          );
        })}
        <div ref={endRef} />
      </div>
    </ModalShell>
  );
}
