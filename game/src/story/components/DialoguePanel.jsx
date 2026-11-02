import { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { matchesCondition } from '../engine.js';

const LETTER_DELAY = { lenta: 42, normal: 24, rapida: 11, instantanea: 0 };

const SPEAKER_ACCENTS = {
  André: '#ffd080',
  Lia: '#f2a679',
  Nina: '#b8c8ec',
  Mãe: '#eab69f',
  Luana: '#8ed4c6',
  Tomás: '#8fc2f5',
  'Professora Nádia': '#d7b8ee',
};

const EXPRESSION_SR_LABELS = {
  normal: '',
  feliz: 'feliz',
  triste: 'triste',
  surpreso: 'surpreso',
  constrangido: 'constrangido',
  pensativo: 'pensativo',
  aliviado: 'aliviado',
};

export default function DialoguePanel({
  ref,
  entry,
  protagonistName,
  variables,
  textSpeed,
  reducedMotion,
  autoPlay = false,
  hasModal = false,
  onAdvance,
  onChoose,
  onOpenHistory,
  onToggleAuto,
  onOpenChapters,
  onOpenSettings,
  onBack,
}) {
  const isChoice = entry.type === 'choice';
  const fullText = isChoice ? entry.prompt ?? '' : entry.text ?? '';
  const instant = reducedMotion || textSpeed === 'instantanea';
  const [visible, setVisible] = useState(instant ? fullText.length : 0);
  const choiceRefs = useRef([]);

  const options = useMemo(
    () => (isChoice ? entry.options.filter((option) => matchesCondition(option.when, variables)) : []),
    [entry.options, isChoice, variables]
  );

  useEffect(() => {
    if (isChoice) {
      setVisible(fullText.length);
      requestAnimationFrame(() => choiceRefs.current[0]?.focus());
      return undefined;
    }
    if (instant) {
      setVisible(fullText.length);
      return undefined;
    }
    setVisible(0);
    const delay = LETTER_DELAY[textSpeed] ?? LETTER_DELAY.normal;
    const timer = setInterval(() => {
      setVisible((count) => {
        if (count >= fullText.length) {
          clearInterval(timer);
          return count;
        }
        return count + 1;
      });
    }, delay);
    return () => clearInterval(timer);
  }, [fullText, instant, isChoice, textSpeed]);

  const isTyping = !isChoice && visible < fullText.length;

  const handleAdvance = useCallback(() => {
    if (isChoice || hasModal) return;
    if (visible < fullText.length) setVisible(fullText.length);
    else onAdvance();
  }, [fullText.length, hasModal, isChoice, onAdvance, visible]);

  useImperativeHandle(ref, () => ({ advance: handleAdvance }), [handleAdvance]);

  // Auto-advance timer when autoPlay is enabled and line finished typing
  useEffect(() => {
    if (!autoPlay || isChoice || isTyping || hasModal) return undefined;
    const readingTime = Math.max(1800, Math.min(5200, fullText.length * 42));
    const timer = setTimeout(() => {
      onAdvance();
    }, readingTime);
    return () => clearTimeout(timer);
  }, [autoPlay, fullText.length, hasModal, isChoice, isTyping, onAdvance]);

  // Keyboard navigation for dialogue and choices
  useEffect(() => {
    const onKey = (event) => {
      if (event.defaultPrevented || hasModal || document.querySelector('[role="dialog"]')) return;
      if (event.target instanceof Element && event.target.closest('input, select, textarea')) return;

      if (isChoice) {
        if (['1', '2', '3', '4'].includes(event.key)) {
          const idx = Number(event.key) - 1;
          if (options[idx]) {
            event.preventDefault();
            onChoose(options[idx].id);
          }
          return;
        }
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault();
          const buttons = choiceRefs.current.filter(Boolean);
          if (!buttons.length) return;
          const currentIdx = buttons.indexOf(document.activeElement);
          const delta = event.key === 'ArrowDown' ? 1 : -1;
          const nextIdx = currentIdx === -1 ? 0 : (currentIdx + delta + buttons.length) % buttons.length;
          buttons[nextIdx]?.focus();
        }
        return;
      }

      if (['Enter', ' ', 'ArrowRight'].includes(event.key)) {
        if (event.target instanceof Element && event.target.closest('.vn-quickmenu')) return;
        event.preventDefault();
        handleAdvance();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleAdvance, hasModal, isChoice, onChoose, options]);

  const mode = isChoice ? 'prompt' : entry.mode ?? 'dialogue';
  const speakerName = isChoice
    ? protagonistName
    : entry.mode === 'narration'
      ? null
      : entry.speaker;

  const speakerAccent =
    mode === 'thought'
      ? '#a9b7d1'
      : SPEAKER_ACCENTS[speakerName] ?? '#ffd080';

  const emotionWord = !isChoice && entry.expression ? EXPRESSION_SR_LABELS[entry.expression] : '';
  const srAnnouncement = isChoice
    ? `Escolha narrativa para ${protagonistName}: ${fullText}`
    : entry.mode === 'narration'
      ? fullText
      : entry.mode === 'thought'
        ? `Pensamento de ${entry.speaker}${emotionWord ? ` (${emotionWord})` : ''}: ${fullText}`
        : `${entry.speaker}${emotionWord ? ` (${emotionWord})` : ''}: ${fullText}`;

  return (
    <>
      {isChoice && (
        <div className="vn-choices-overlay" role="group" aria-labelledby="vn-choice-prompt">
          <div className="vn-choices-container">
            <p className="vn-choices-header">
              <span aria-hidden="true">◆</span> O QUE {protagonistName?.toUpperCase()} DECIDE FAZER?
            </p>
            <div className="vn-choice-list">
              {options.map((option, index) => (
                <button
                  key={option.id}
                  type="button"
                  className="vn-choice-btn"
                  style={{ '--choice-index': index }}
                  ref={(el) => {
                    choiceRefs.current[index] = el;
                  }}
                  onClick={() => onChoose(option.id)}
                >
                  <kbd className="vn-choice-btn__key" aria-hidden="true">
                    {index + 1}
                  </kbd>
                  <span className="vn-choice-btn__label">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <section
        className={`vn-textbox vn-textbox--${mode} story-dialogue story-dialogue--${isChoice ? 'choices' : mode}`}
        style={{ '--speaker-accent': speakerAccent }}
        onClick={!isChoice ? handleAdvance : undefined}
        aria-label={isChoice ? 'Pergunta da decisão narrativa' : 'Caixa de diálogo'}
      >
        <div className="vn-textbox__toolbar">
          {speakerName && (
            <div className={`vn-textbox__nameplate vn-textbox__nameplate--${mode}`}>
              {mode === 'thought' && (
                <span className="vn-textbox__nameplate-icon" aria-hidden="true">
                  💭
                </span>
              )}
              {isChoice && (
                <span className="vn-textbox__nameplate-tag">DECISÃO ·</span>
              )}
              <span className="vn-textbox__nameplate-name">{speakerName}</span>
              {mode === 'thought' && (
                <span className="vn-textbox__nameplate-sub">pensamento</span>
              )}
            </div>
          )}

          <nav
            className="vn-quickmenu"
            aria-label="Controles rápidos da partida"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="vn-quickmenu__btn"
              onClick={onOpenHistory}
              title="Histórico de falas (Tecla H)"
            >
              Histórico
            </button>
            <button
              type="button"
              className={'vn-quickmenu__btn' + (autoPlay ? ' vn-quickmenu__btn--active' : '')}
              onClick={onToggleAuto}
              aria-pressed={autoPlay}
              title="Avanço automático (Tecla A)"
            >
              Auto
            </button>
            <button
              type="button"
              className="vn-quickmenu__btn"
              onClick={onOpenChapters}
              title="Selecionar capítulo"
            >
              Capítulos
            </button>
            <button
              type="button"
              className="vn-quickmenu__btn"
              onClick={onOpenSettings}
              title="Configurações de leitura e tela"
            >
              Opções
            </button>
            <button
              type="button"
              className="vn-quickmenu__btn"
              onClick={onBack}
              title="Voltar ao menu principal (Esc)"
            >
              Menu
            </button>
          </nav>
        </div>

        <div className="vn-textbox__body">
          {isChoice ? (
            <h2 id="vn-choice-prompt" className="vn-textbox__prompt story-dialogue__prompt">
              {fullText}
            </h2>
          ) : (
            <p className="vn-textbox__content story-dialogue__text" aria-hidden="true">
              <span className="vn-textbox__revealed">{fullText.slice(0, visible)}</span>
              <span className="vn-textbox__unrevealed">{fullText.slice(visible)}</span>
            </p>
          )}

          {!isChoice && (
            <button
              type="button"
              className={'vn-textbox__ctc ' + (isTyping ? 'vn-textbox__ctc--typing' : 'vn-textbox__ctc--ready')}
              onClick={(event) => {
                event.stopPropagation();
                handleAdvance();
              }}
              aria-label={isTyping ? 'Mostrar texto completo da fala' : 'Avançar para a próxima fala'}
            >
              <span className="vn-textbox__ctc-label" aria-hidden="true">
                {isTyping ? 'COMPLETAR' : 'AVANÇAR'}
              </span>
              <span className="vn-textbox__ctc-glyph" aria-hidden="true">
                ▼
              </span>
            </button>
          )}
        </div>

        <p className="sr-only" aria-live="polite">
          {srAnnouncement}
        </p>
      </section>
    </>
  );
}
