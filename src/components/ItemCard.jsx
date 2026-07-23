import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBadge from './StatusBadge'
import {
  isFavorite,
  toggleFavorite,
} from '../utils/favoriteStorage'

function ItemCard({ report, onFavoriteChange }) {
  const navigate = useNavigate()

  const [favorite, setFavorite] = useState(() =>
    isFavorite(report._id),
  )

  const handleFavorite = () => {
    const updatedFavorites = toggleFavorite(report)

    setFavorite(
      updatedFavorites.some((item) => item._id === report._id),
    )

    if (onFavoriteChange) {
      onFavoriteChange(updatedFavorites)
    }
  }

  return (
    <article className="item-card">
      <div className="item-card-top">
        <span className="case-id">
          {report.recoveryId || report._id}
        </span>        <div className="item-card-status">
          <button
            className={`favorite-button ${favorite ? 'active' : ''}`}
            onClick={handleFavorite}
            aria-label="Toggle favorite"
          >
            {favorite ? '★' : '☆'}
          </button>

          <StatusBadge status={report.status} />
        </div>
      </div>

      <div className="item-category">{report.category}</div>

      <h3>{report.title}</h3>

      <p>{report.description}</p>

      <div className="item-meta">
        <span>⌖ {report.location}</span>
        <span>{report.date}</span>
      </div>

      <button
        className="item-view-button"
        onClick={() => navigate(`/items/${report._id}`)}
      >
        View Recovery Case →
      </button>
    </article>
  )
}

export default ItemCard