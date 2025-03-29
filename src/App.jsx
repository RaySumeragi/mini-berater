import React from 'react'
import PartyBoxFinder from './components/PartyBoxFinder'

function App() {
  return (
    <div className="container">
      <header style={{marginBottom: '2rem', textAlign: 'center'}}>
        <h1 style={{fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>PartyBox-Finder</h1>
        <p style={{color: '#4b5563'}}>Finde die perfekte Sound-Lösung für deine Veranstaltung</p>
      </header>
      
      <main>
        <PartyBoxFinder />
      </main>
      
      <footer style={{marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: '#6b7280'}}>
        <p>© 2025 PartyBox-Finder | Alle Angaben ohne Gewähr</p>
      </footer>
    </div>
  )
}

export default App