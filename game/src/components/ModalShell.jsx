import { useEffect, useRef } from 'react';

export default function ModalShell({ title, label, onClose, returnLabel = 'VOLTAR AO MENU', wide = false, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const dialog = dialogRef.current;
    dialog?.querySelector('button:not([disabled]), input:not([disabled]), select:not([disabled])')?.focus();
    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialog) return;
      const focusable = [...dialog.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), a[href]')];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      previousFocus?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className={'modal-panel' + (wide ? ' modal-panel--wide' : '')} role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-label={label} ref={dialogRef}>
        <div className="modal-panel__topline"><span>CYBER</span><button className="modal-close" type="button" onClick={onClose} aria-label={`Fechar ${label}`}>×</button></div>
        <h2 id="modal-title">{title}</h2>
        {children}
        <button className="return-button modal-return" type="button" onClick={onClose}>{returnLabel}</button>
      </section>
    </div>
  );
}
