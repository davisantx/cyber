import { useCallback, useEffect, useRef, useState } from 'react';
import MainMenu from './components/MainMenu.jsx';
import MenuBackground from './components/MenuBackground.jsx';
import SettingsModal from './components/SettingsModal.jsx';
import CreditsModal from './components/CreditsModal.jsx';
import ChaptersModal from './components/ChaptersModal.jsx';
import ModalShell from './components/ModalShell.jsx';
import StoryScreen from './story/components/StoryScreen.jsx';
import { readPreferences, writePreferences } from './lib/preferences.js';
import { LEGACY_SAVE_KEY, readSaveStatus, SAVE_KEY, writeSave } from './lib/save.js';
import { createInitialProgress } from './story/engine.js';

export default function App() {
  const [screen, setScreen] = useState('menu');
  const [modal, setModal] = useState(null);
  const [preferences, setPreferences] = useState(readPreferences);
  const [saveStatus, setSaveStatus] = useState(readSaveStatus);
  const [progress, setProgress] = useState(null);
  const [saveWarning, setSaveWarning] = useState('');
  const [systemReducedMotion, setSystemReducedMotion] = useState(
    () => matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [leaving, setLeaving] = useState(false);
  const transitionTimer = useRef(null);
  const closeModal = useCallback(() => setModal(null), []);

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setSystemReducedMotion(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    writePreferences(preferences);
  }, [preferences]);
  useEffect(() => () => clearTimeout(transitionTimer.current), []);
  useEffect(() => {
    const refresh = (event) => {
      if (event.type === 'focus' || event.key === null || event.key === SAVE_KEY || event.key === LEGACY_SAVE_KEY) {
        setSaveStatus(readSaveStatus());
      }
    };
    window.addEventListener('storage', refresh);
    window.addEventListener('focus', refresh);
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('focus', refresh);
    };
  }, []);

  const reducedMotion = preferences.reducedMotion ?? systemReducedMotion;
  const textScale = preferences.textScale ?? 'padrao';

  const transitionTo = useCallback(
    (target) => {
      clearTimeout(transitionTimer.current);
      const finish = () => {
        setScreen(target);
        setLeaving(false);
        if (target === 'menu') {
          requestAnimationFrame(() => document.querySelector('#main-menu .menu-button')?.focus());
        }
      };
      if (reducedMotion) finish();
      else {
        setLeaving(true);
        transitionTimer.current = setTimeout(finish, 170);
      }
    },
    [reducedMotion]
  );

  const commitProgress = useCallback((next) => {
    setProgress(next);
    const saved = writeSave(next);
    setSaveWarning(
      saved
        ? ''
        : 'Não foi possível salvar nesta sessão. Verifique o armazenamento do navegador antes de sair.'
    );
    setSaveStatus(readSaveStatus());
  }, []);

  const startChapter = useCallback(
    (chapterId) => {
      setModal(null);
      commitProgress(createInitialProgress(chapterId));
      if (screen !== 'story') transitionTo('story');
    },
    [commitProgress, screen, transitionTo]
  );

  const startNewGame = useCallback(() => {
    startChapter();
  }, [startChapter]);

  const continueGame = useCallback(() => {
    if (!saveStatus.save) return;
    setModal(null);
    setProgress(saveStatus.save);
    setSaveWarning('');
    if (screen !== 'story') transitionTo('story');
  }, [saveStatus.save, screen, transitionTo]);

  const backToMenu = useCallback(() => {
    setModal(null);
    setSaveStatus(readSaveStatus());
    transitionTo('menu');
  }, [transitionTo]);

  const shellClasses = [
    'app-shell',
    `app-shell--scale-${textScale}`,
    reducedMotion ? 'app-shell--reduced-motion' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={shellClasses}>
      <MenuBackground savedProgress={saveStatus.save} />
      <div
        className={'app-shell__foreground ' + (leaving ? 'app-shell__foreground--leaving' : '')}
        inert={Boolean(modal) || leaving}
        aria-hidden={Boolean(modal)}
      >
        {screen === 'menu' ? (
          <MainMenu
            hasSave={Boolean(saveStatus.save)}
            savedProgress={saveStatus.save}
            saveIssue={saveStatus.issue}
            preferences={preferences}
            onNewGame={() => (saveStatus.save ? setModal('restart') : startNewGame())}
            onContinue={continueGame}
            onChapters={() => setModal('chapters')}
            onSettings={() => setModal('settings')}
            onCredits={() => setModal('credits')}
          />
        ) : (
          <StoryScreen
            progress={progress}
            preferences={preferences}
            reducedMotion={reducedMotion}
            saveWarning={saveWarning}
            hasExternalModal={Boolean(modal)}
            onProgress={commitProgress}
            onOpenChapters={() => setModal('chapters')}
            onOpenSettings={() => setModal('settings')}
            onBack={backToMenu}
          />
        )}
      </div>
      {modal === 'chapters' && (
        <ChaptersModal
          activeProgress={screen === 'story' ? progress : saveStatus.save}
          inStory={screen === 'story'}
          preferences={preferences}
          onSelectChapter={startChapter}
          onContinueSaved={saveStatus.save ? continueGame : null}
          onClose={closeModal}
        />
      )}
      {modal === 'settings' && (
        <SettingsModal
          preferences={preferences}
          onChange={setPreferences}
          onClose={closeModal}
          systemReducedMotion={systemReducedMotion}
        />
      )}
      {modal === 'credits' && <CreditsModal onClose={closeModal} />}
      {modal === 'restart' && (
        <ModalShell title="Começar de novo?" label="reiniciar partida" onClose={closeModal}>
          <p className="modal-lead">
            O progresso salvo desta partida será substituído pelo início do Capítulo 1, ou você pode escolher outro capítulo para iniciar.
          </p>
          <div className="modal-actions-row">
            <button
              className="return-button return-button--primary"
              type="button"
              onClick={startNewGame}
            >
              COMEÇAR CAPÍTULO 1
            </button>
            <button
              className="return-button"
              type="button"
              onClick={() => setModal('chapters')}
            >
              ESCOLHER CAPÍTULO
            </button>
          </div>
        </ModalShell>
      )}
    </div>
  );
}
