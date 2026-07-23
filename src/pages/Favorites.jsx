import { useState } from 'react'
import ItemCard from '../components/ItemCard'
import { getFavorites } from '../utils/favoriteStorage'

function Favorites() {
  const [favorites, setFavorites] = useState(getFavorites)

  return (
    <section className="collection-page">
      <div className="collection-heading">
        <p className="eyebrow">SAVED RECOVERY SIGNALS</p>

        <h1>Favorites.</h1>

        <p>
          Keep important recovery cases close for quick
          access and continued tracking.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <span>☆</span>

          <h2>No saved recovery cases.</h2>

          <p>
            Select the star on a report to save it here.
          </p>
        </div>
      ) : (
        <div className="items-grid">
          {favorites.map((report) => (
            <ItemCard
              key={report._id}
              report={report}
              onFavoriteChange={setFavorites}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Favorites