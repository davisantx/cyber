import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  advance,
  choose,
  finishInterlude,
  getCurrentEntry,
  getCurrentScene,
  getStageCharacters,
} from '../engine.js';
import { getChapter } from '../registry.js';
import DialoguePanel from './DialoguePanel.jsx';
import HistoryModal from './HistoryModal.jsx';
import InterludeScreen from './InterludeScreen.jsx';
import NextChapterPlaceholder from './NextChapterPlaceholder.jsx';

const DIGITAL_HIGHLIGHTS = {
  boato_banca: {
    source: 'Perfil não oficial · Radar das Provas',
    headline: '“BANCA ALTERADA. NOVO CONTEÚDO PARA DOMINGO”',
    detail: 'Imagem sem número de edital e sem link da organizadora',
    tone: 'warning',
  },
  boato_local: {
    source: 'Mensagem encaminhada · Grupo de candidatos',
    headline: '“LOCAL DE PROVA ALTERADO: CENTRO CÍVICO”',
    detail: 'Rodapé com urgência: “Compartilhe agora”',
    tone: 'warning',
  },
  correcao: {
    source: 'Portal do Candidato · Instituto Vereda',
    headline: 'Local confirmado: Escola Municipal das Palmeiras',
    detail: 'Verificação oficial compartilhada no grupo',
    tone: 'verified',
  },
  grupo_orientado: {
    source: 'Portal do Candidato · Instituto Vereda',
    headline: 'Consulta direta pelo endereço oficial do edital',
    detail: 'Orientação enviada aos candidatos do grupo',
    tone: 'verified',
  },
  recomendacao: {
    source: 'Vídeo recomendado · Canal de comentários',
    headline: '“ADEUS, RAVI MARÉ? FÃS NÃO ACREDITAM” 🕯️',
    detail: 'Miniatura em preto e branco fora do perfil oficial',
    tone: 'warning',
  },
  video_aberto: {
    source: 'Reprodução do vídeo completo',
    headline: 'Pausa temporária em um show para descansar a voz',
    detail: 'O conteúdo real contradiz o tom alarmista da capa',
    tone: 'verified',
  },
  perfil_oficial: {
    source: 'Perfil Oficial · Ravi Maré',
    headline: 'Comunicado: repouso vocal por orientação médica',
    detail: 'Fonte primária consultada diretamente',
    tone: 'verified',
  },
  grupo: {
    source: 'Grupo da turma · Mensagens recentes',
    headline: 'Boato distorcido: “Ravi Maré morreu”',
    detail: 'A interrogação da miniatura sumiu nos repasses',
    tone: 'warning',
  },
  anuncio: {
    source: 'Anúncio externo · Espelho Social',
    headline: '“Descubra quem visitou seu perfil hoje em 1 minuto”',
    detail: 'Cores parecidas com a rede Vitra, mas domínio externo',
    tone: 'warning',
  },
  pedido_acesso: {
    source: 'Solicitação de permissão · Espelho Social',
    headline: 'Pede usuário, senha, contatos e mensagens da Vitra',
    detail: 'Permissões excessivas fora do aplicativo oficial',
    tone: 'warning',
  },
  mensagem_grupo: {
    source: 'Disparo automático · Conta da Vitra',
    headline: '“Veja quem andou olhando você também” + link externo',
    detail: 'Mensagem enviada sem autorização após acesso indevido',
    tone: 'warning',
  },
  conta_protegida: {
    source: 'Configurações de Segurança · Rede Vitra',
    headline: 'Senha alterada · Sessões encerradas · Verificação ativa',
    detail: 'Conta recuperada pelo aplicativo oficial',
    tone: 'verified',
  },
};

export default function StoryScreen({
  progress,
  preferences,
  reducedMotion,
  saveWarning,
  hasExternalModal = false,
  onProgress,
  onOpenChapters,
  onOpenSettings,
  onBack,
}) {
  const [historyOpen, setHistoryOpen] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const dialogueRef = useRef(null);
  const closeHistory = useCallback(() => setHistoryOpen(false), []);

  const chapter = progress && getChapter(progress.chapterId);
  const scene = progress && getCurrentScene(progress);
  const entry = progress && getCurrentEntry(progress);

  // Preload all sprites and backgrounds of the current chapter to avoid flickering
  useEffect(() => {
    if (!chapter?.assets) return;
    const urls = new Set();
    Object.values(chapter.assets.backgrounds ?? {}).forEach((u) => urls.add(u));
    Object.values(chapter.assets.portraits ?? {}).forEach((u) => urls.add(u));
    Object.values(chapter.assets.supportingPortraits ?? {}).forEach((group) => {
      Object.values(group ?? {}).forEach((u) => urls.add(u));
    });
    urls.forEach((relPath) => {
      const img = new Image();
      img.src = import.meta.env.BASE_URL + relPath;
    });
  }, [chapter]);

  // Pause autoPlay when reaching a choice
  useEffect(() => {
    if (entry?.type === 'choice' && autoPlay) {
      setAutoPlay(false);
    }
  }, [autoPlay, entry?.type]);

  const anyModalOpen = hasExternalModal || historyOpen;

  useEffect(() => {
    const onKey = (event) => {
      if (event.defaultPrevented || anyModalOpen || document.querySelector('[role="dialog"]')) return;
      if (event.target instanceof Element && event.target.closest('input, select, textarea')) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        onBack();
        return;
      }
      if (progress?.phase !== 'story') return;
      if (event.key === 'h' || event.key === 'H' || event.key === 'l' || event.key === 'L') {
        event.preventDefault();
        setHistoryOpen(true);
        return;
      }
      if (event.key === 'a' || event.key === 'A') {
        event.preventDefault();
        setAutoPlay((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [anyModalOpen, onBack, progress?.phase]);

  const handleAdvance = useCallback(() => onProgress(advance(progress)), [onProgress, progress]);
  const handleChoose = useCallback((optionId) => onProgress(choose(progress, optionId)), [onProgress, progress]);

  const stageCharacters = useMemo(
    () => getStageCharacters(chapter, scene, progress),
    [chapter, progress, scene]
  );

  if (!chapter || !scene) return null;

  if (progress.phase === 'interlude') {
    return (
      <InterludeScreen
        progress={progress}
        scene={scene}
        reducedMotion={reducedMotion}
        paused={anyModalOpen}
        onProgress={onProgress}
        onOpenChapters={onOpenChapters}
      />
    );
  }

  if (progress.phase === 'awaitingNext') {
    const nextChapter = chapter.nextChapterId && getChapter(chapter.nextChapterId);
    return (
      <NextChapterPlaceholder
        chapter={chapter}
        nextChapter={nextChapter}
        onContinue={() => onProgress(finishInterlude(progress))}
        onOpenChapters={onOpenChapters}
        onBack={onBack}
      />
    );
  }

  const background = chapter.assets.backgrounds?.[scene.background];
  const isChoice = entry?.type === 'choice';
  const isDigitalScene = scene.background.startsWith('digital');
  const digitalCard = isDigitalScene ? DIGITAL_HIGHLIGHTS[progress.sceneId] : null;
  const hasTwoCharacters = Boolean(stageCharacters.left && stageCharacters.right);

  return (
    <>
      <main
        inert={historyOpen}
        aria-hidden={historyOpen || undefined}
        className={
          'vn-stage story-stage story-stage--' +
          scene.background +
          (isDigitalScene ? ' vn-stage--digital' : '')
        }
        style={
          background
            ? {
                backgroundImage: `url("${import.meta.env.BASE_URL + background}")`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }
            : undefined
        }
        onWheel={(event) => {
          const scrollingText = event.target instanceof Element && event.target.closest('.vn-textbox');
          if (!anyModalOpen && !isChoice && !scrollingText && event.deltaY < -35) {
            setHistoryOpen(true);
          }
        }}
      >
        {/* Camada clicável do palco para avançar falas */}
        <div
          className="vn-stage__backdrop"
          onClick={!isChoice && !anyModalOpen ? () => dialogueRef.current?.advance() : undefined}
          aria-hidden="true"
        />

        {/* Badge diegético discreto de Capítulo, Ato e Local */}
        <div className="vn-location-badge" key={`${progress.chapterId}:${scene.act}:${scene.setting}`}>
          <span className="vn-location-badge__act">
            CAP. {chapter.number} · {scene.act}
          </span>
          <span className="vn-location-badge__place">{scene.setting}</span>
        </div>

        {/* Cartela cinematográfica temporária na abertura/mudança de ato */}
        {!reducedMotion && !isChoice && (
          <div className="vn-act-card" key={`${progress.chapterId}:${scene.act}`} aria-hidden="true">
            <span className="vn-act-card__chapter">
              CAPÍTULO {chapter.number} · {chapter.title.toUpperCase()}
            </span>
            <strong className="vn-act-card__act">{scene.act}</strong>
            <span className="vn-act-card__setting">{scene.setting}</span>
          </div>
        )}

        {/* Cartão diegético de tela/notificação nas cenas digitais */}
        {digitalCard && !isChoice && (
          <aside
            className={`vn-digital-card vn-digital-card--${digitalCard.tone}`}
            aria-label="Conteúdo exibido na tela do celular"
          >
            <div className="vn-digital-card__header">
              <span className="vn-digital-card__dot" aria-hidden="true" />
              <span className="vn-digital-card__source">{digitalCard.source}</span>
            </div>
            <p className="vn-digital-card__headline">{digitalCard.headline}</p>
            <p className="vn-digital-card__detail">{digitalCard.detail}</p>
          </aside>
        )}

        {saveWarning && (
          <p className="story-save-warning" role="alert">
            {saveWarning}
          </p>
        )}

        {/* Camada de Personagens ancorada diretamente no topo da caixa de diálogo */}
        <div
          className={
            'vn-stage__characters' + (hasTwoCharacters ? ' vn-stage__characters--duo' : ' vn-stage__characters--solo')
          }
          aria-hidden="true"
        >
          {stageCharacters.left && (
            <div
              className={
                'vn-character-slot vn-character-slot--left' +
                (stageCharacters.left.active ? ' vn-character-slot--active' : ' vn-character-slot--listening')
              }
            >
              <img
                className="vn-character vn-character--protagonist"
                src={import.meta.env.BASE_URL + stageCharacters.left.src}
                alt=""
              />
            </div>
          )}

          {stageCharacters.right && (
            <div
              className={
                'vn-character-slot vn-character-slot--right' +
                (stageCharacters.right.active ? ' vn-character-slot--active' : ' vn-character-slot--listening')
              }
            >
              <img
                className="vn-character vn-character--supporting"
                src={import.meta.env.BASE_URL + stageCharacters.right.src}
                alt=""
              />
            </div>
          )}
        </div>

        <DialoguePanel
          ref={dialogueRef}
          key={`${progress.chapterId}:${progress.sceneId}:${progress.entryIndex}`}
          entry={entry}
          protagonistName={chapter.protagonist.name}
          variables={progress.variables}
          textSpeed={preferences.textSpeed}
          reducedMotion={reducedMotion}
          autoPlay={autoPlay}
          hasModal={anyModalOpen}
          onAdvance={handleAdvance}
          onChoose={handleChoose}
          onOpenHistory={() => setHistoryOpen(true)}
          onToggleAuto={() => setAutoPlay((prev) => !prev)}
          onOpenChapters={onOpenChapters}
          onOpenSettings={onOpenSettings}
          onBack={onBack}
        />

      </main>
      {historyOpen && (
        <HistoryModal progress={progress} onClose={closeHistory} />
      )}
    </>
  );
}
