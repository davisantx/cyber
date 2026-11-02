import { test, expect } from '@playwright/test';
import { advance, choose, createInitialProgress, getCurrentEntry } from '../src/story/engine.js';

function reach(chapterId, predicate) {
  let progress = createInitialProgress(chapterId);
  for (let step = 0; step < 300; step += 1) {
    if (predicate(progress)) return progress;
    const entry = getCurrentEntry(progress);
    progress = entry.type === 'choice' ? choose(progress, entry.options[0].id) : advance(progress);
  }
  throw new Error(`Position not reached in ${chapterId}`);
}

async function openSaved(page, progress, preferences = {}) {
  await page.addInitScript(({ progress, preferences }) => {
    localStorage.setItem('cyber:save:v2', JSON.stringify(progress));
    localStorage.setItem('cyber:preferences:v1', JSON.stringify({
      textSpeed: 'instantanea', reducedMotion: true, ...preferences,
    }));
  }, { progress, preferences });
  await page.goto('/');
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
}

const readProgress = page => page.evaluate(() => JSON.parse(localStorage.getItem('cyber:save:v2')));

test('blocked storage still allows playing and shows a persistence warning', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      get() { throw new DOMException('Storage denied', 'SecurityError'); },
    });
  });
  await page.goto('/');
  await expect(page.getByRole('status')).toContainText('armazenamento local');
  await page.getByRole('button', { name: 'Novo Jogo', exact: true }).click();
  await expect(page.locator('.vn-textbox')).toBeVisible();
  await expect(page.getByRole('alert')).toContainText('Não foi possível salvar');
  expect(errors).toEqual([]);
});

test('clicking the scenery completes a line before advancing', async ({ page }) => {
  await openSaved(page, createInitialProgress(), { textSpeed: 'lenta', reducedMotion: false });
  const backdrop = page.locator('.vn-stage__backdrop');
  await expect(page.getByRole('button', { name: 'Mostrar texto completo da fala' })).toBeVisible();
  await backdrop.click({ position: { x: 500, y: 300 } });
  await expect(page.getByRole('button', { name: 'Avançar para a próxima fala' })).toBeVisible();
  expect((await readProgress(page)).entryIndex).toBe(0);
  await backdrop.click({ position: { x: 500, y: 300 } });
  await expect.poll(async () => (await readProgress(page)).entryIndex).toBe(1);
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: 'Avançar para a próxima fala' })).toBeVisible();
  expect((await readProgress(page)).entryIndex).toBe(1);
  await page.keyboard.press('Enter');
  await expect.poll(async () => (await readProgress(page)).entryIndex).toBe(2);
});

test('keyboard chooses a numbered alternative', async ({ page }) => {
  const progress = reach('chapter-03', p => p.sceneId === 'pedido_acesso' && getCurrentEntry(p)?.type === 'choice');
  await openSaved(page, progress);
  await expect(page.locator('.vn-choice-btn')).toHaveCount(3);
  await page.keyboard.press('3');
  await expect.poll(async () => (await readProgress(page)).sceneId).toBe('permissoes_negadas');
});

test('chapter selection pauses the interlude and resumes after closing', async ({ page }) => {
  await page.clock.install();
  await openSaved(page, reach('chapter-01', p => p.phase === 'interlude'));
  await page.getByRole('button', { name: 'CAPÍTULOS', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.clock.fastForward(5000);
  expect((await readProgress(page)).chapterId).toBe('chapter-01');
  await page.getByRole('button', { name: 'Fechar seleção de capítulos' }).click();
  await page.clock.fastForward(2000);
  await expect.poll(async () => (await readProgress(page)).chapterId).toBe('chapter-02');
});

test('history shortcut on the final screen does not disable Escape', async ({ page }) => {
  const ending = reach('chapter-03', p => p.phase === 'interlude');
  await openSaved(page, { ...ending, phase: 'awaitingNext' });
  await expect(page.locator('.next-chapter-screen')).toBeVisible();
  await page.keyboard.press('h');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.keyboard.press('Escape');
  await expect(page.locator('#main-menu')).toBeVisible();
});

test('history pauses automatic reading and restores the dialog controls', async ({ page }) => {
  await page.clock.install();
  await openSaved(page, createInitialProgress());
  await page.getByRole('button', { name: 'Auto', exact: true }).click();
  await page.getByRole('button', { name: 'Histórico', exact: true }).click();
  await page.clock.fastForward(10000);
  expect((await readProgress(page)).entryIndex).toBe(0);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('.vn-textbox')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Auto', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.clock.fastForward(5500);
  await expect.poll(async () => (await readProgress(page)).entryIndex).toBeGreaterThan(0);
});

test('window focus refreshes the saved session and storage clearing disables Continue', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Continuar', exact: true })).toBeDisabled();
  await page.evaluate(progress => {
    localStorage.setItem('cyber:save:v2', JSON.stringify(progress));
    window.dispatchEvent(new Event('focus'));
  }, createInitialProgress('chapter-02'));
  await expect(page.getByRole('button', { name: 'Continuar', exact: true })).toBeEnabled();
  await expect(page.locator('.menu-session-card__kicker')).toContainText('CAPÍTULO 2');
  await page.evaluate(() => {
    localStorage.clear();
    window.dispatchEvent(new StorageEvent('storage', { key: null }));
  });
  await expect(page.getByRole('button', { name: 'Continuar', exact: true })).toBeDisabled();
});

test('scrolling a long dialogue does not open the history', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 360 });
  await openSaved(page, createInitialProgress('chapter-02'), { textScale: 'projetor' });
  const textbox = page.locator('.vn-textbox');
  await textbox.evaluate(element => { element.scrollTop = element.scrollHeight; });
  const previousTop = await textbox.evaluate(element => element.scrollTop);
  expect(previousTop).toBeGreaterThan(0);
  await textbox.hover();
  await page.mouse.wheel(0, -100);
  await expect.poll(() => textbox.evaluate(element => element.scrollTop)).toBeLessThan(previousTop);
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

for (const [width, height] of [[320, 568], [390, 844], [640, 360], [844, 390], [1366, 768]]) {
  for (const textScale of ['padrao', 'grande', 'projetor']) {
    test(`choices remain clickable at ${width}x${height}, scale ${textScale}`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      const progress = reach('chapter-03', p => p.sceneId === 'pedido_acesso' && getCurrentEntry(p)?.type === 'choice');
      await openSaved(page, progress, { textScale });
      const choices = page.locator('.vn-choice-btn');
      await expect(choices).toHaveCount(3);
      for (const choice of await choices.all()) {
        await choice.scrollIntoViewIfNeeded();
        expect(await choice.evaluate(button => {
          const rect = button.getBoundingClientRect();
          return document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2)?.closest('button') === button;
        })).toBe(true);
      }
      const overlaps = await page.evaluate(() => {
        const a = document.querySelector('.vn-textbox__nameplate').getBoundingClientRect();
        const b = document.querySelector('.vn-quickmenu').getBoundingClientRect();
        return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
      });
      expect(overlaps).toBe(false);
      await choices.nth(2).click();
      await expect.poll(async () => (await readProgress(page)).sceneId).toBe('permissoes_negadas');
    });
  }
}
