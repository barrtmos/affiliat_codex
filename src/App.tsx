import { useState } from 'react'
import './App.css'
import CardGrid from './components/CardGrid'
import CardModal from './components/CardModal'
import { cards, type Card } from './cards'

function App() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const [flipped, setFlipped] = useState(false)

  const handleSelectCard = (card: Card) => {
    setSelectedCard(card)
    setFlipped(false)
  }

  const handleCloseModal = () => {
    setSelectedCard(null)
    setFlipped(false)
  }

  const handleFlipCard = () => {
    setFlipped((currentValue) => !currentValue)
  }

  return (
    <main className="app-shell">
      <header className="page-header" aria-label="Шапка сайта">
        <h1 className="page-title">Affiliat Codex</h1>
      </header>

      <CardGrid cards={cards} onSelect={handleSelectCard} />
      <CardModal
        card={selectedCard}
        flipped={flipped}
        onClose={handleCloseModal}
        onFlip={handleFlipCard}
      />

      <footer className="page-footer">
        <p className="page-footer__text">barrtmos</p>
      </footer>
    </main>
  )
}

export default App
