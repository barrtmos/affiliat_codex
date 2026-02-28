import { useEffect } from 'react'
import type { Card } from '../cards'
import { resolvePublicAsset } from '../utils/assets'

type CardModalProps = {
  card: Card | null
  flipped: boolean
  onClose: () => void
  onFlip: () => void
}

function CardModal({ card, flipped, onClose, onFlip }: CardModalProps) {
  useEffect(() => {
    if (!card) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [card, onClose])

  if (!card) {
    return null
  }

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Карточка ${card.id}`}
      onClick={onClose}
    >
      <div className="modal-shell" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="modal-close"
          aria-label="Закрыть карточку"
          onClick={onClose}
        >
          ×
        </button>

        <div className="modal-card-block">
          <button
            type="button"
            className={`modal-card ${flipped ? 'is-flipped' : ''}`}
            onClick={onFlip}
            aria-label={flipped ? 'Показать лицевую сторону' : 'Показать обратную сторону'}
          >
            <span className="modal-card__face modal-card__face--front">
              <img className="modal-card__image" src={resolvePublicAsset(card.image)} alt="" />
            </span>

            <span className="modal-card__face modal-card__face--back">
              <span className="modal-card__backdrop" />
              <span className="modal-card__back-content">
                <span className="modal-card__badge">Affiliat Notes</span>
                {card.term ? <span className="modal-card__term">{card.term}</span> : null}
                <span className="modal-card__text">{card.backText}</span>
              </span>
            </span>
          </button>
        </div>

        <div className="modal-actions">
          <button type="button" className="action-button" onClick={onFlip}>
            {flipped ? 'На лицевую' : 'Подробнее'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardModal
