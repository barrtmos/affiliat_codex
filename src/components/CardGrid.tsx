import type { Card } from '../cards'

type CardGridProps = {
  cards: Card[]
  onSelect: (card: Card) => void
}

function CardGrid({ cards, onSelect }: CardGridProps) {
  return (
    <section className="card-grid" aria-label="Коллекция карточек терминов">
      {cards.map((card) => (
        <button
          key={card.id}
          type="button"
          className="grid-card"
          onClick={() => onSelect(card)}
          aria-label={`Открыть карточку ${card.id}`}
        >
          <span className="grid-card__frame">
            <img className="grid-card__image" src={card.image} alt="" loading="lazy" />
          </span>
        </button>
      ))}
    </section>
  )
}

export default CardGrid
