import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import api from '../services/api'
import { generateSmartMatches } from '../utils/matchEngine'

function SmartMatches() {
  const navigate = useNavigate()

  const [minimumScore, setMinimumScore] =
    useState(30)

  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await api.get('/reports')
        setReports(response.data)
      } catch (error) {
        console.error(
          'Failed to fetch reports:',
          error,
        )
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  const matches = generateSmartMatches(reports)

  const visibleMatches = matches.filter(
    (match) => match.score >= minimumScore,
  )

  if (loading) {
    return (
      <section>
        <div className="empty-state">
          <h2>Loading smart matches...</h2>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className="dashboard-heading matches-heading">
        <div>
          <p className="eyebrow">
            SMART RECOVERY ENGINE
          </p>

          <h1>Possible matches.</h1>

          <p>
            RECALL compares lost and found signals
            using item characteristics, location and
            report timing.
          </p>
        </div>

        <div className="match-filter">
          <label>Minimum confidence</label>

          <select
            value={minimumScore}
            onChange={(event) =>
              setMinimumScore(
                Number(event.target.value),
              )
            }
          >
            <option value={30}>30%+</option>
            <option value={50}>50%+</option>
            <option value={70}>70%+</option>
            <option value={85}>85%+</option>
          </select>
        </div>
      </div>

      <div className="engine-status">
        <div className="engine-pulse">
          <span></span>
        </div>

        <div>
          <strong>
            RECALL Match Engine Active
          </strong>

          <p>
            {matches.length} possible recovery
            connections detected
          </p>
        </div>
      </div>

      {visibleMatches.length === 0 ? (
        <div className="empty-state">
          <span>◎</span>

          <h2>
            No matches above {minimumScore}%.
          </h2>

          <p>
            Try lowering the minimum confidence
            level.
          </p>
        </div>
      ) : (
        <div className="matches-list">
          {visibleMatches.map((match) => (
            <article
              className="smart-match-card"
              key={match.id}
            >
              <div className="match-confidence">
                <strong>{match.score}%</strong>
                <span>MATCH CONFIDENCE</span>
              </div>

              <div className="match-comparison">
                <MatchItem
                  label="LOST SIGNAL"
                  item={match.lostItem}
                />

                <div className="match-connector">
                  <span>↔</span>
                  <small>POSSIBLE MATCH</small>
                </div>

                <MatchItem
                  label="FOUND SIGNAL"
                  item={match.foundItem}
                />
              </div>

              <div className="match-reasons">
                <span>
                  WHY RECALL MATCHED THESE
                </span>

                <div>
                  {match.reasons.map((reason) => (
                    <p key={reason}>
                      ✓ {reason}
                    </p>
                  ))}
                </div>
              </div>

              <div className="match-actions">
                <Button
                  variant="secondary"
                  onClick={() =>
                    navigate(
                      `/items/${match.lostItem._id}`,
                    )
                  }
                >
                  Lost Case
                </Button>

                <Button
                  onClick={() =>
                    navigate(
                      `/claim/${match.foundItem._id}?lost=${match.lostItem._id}`,
                    )
                  }
                >
                  Verify Ownership
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

function MatchItem({ label, item }) {
  return (
    <div className="match-item">
      <span>{label}</span>

      <small>{item.recoveryId || item._id}</small>
      <h3>{item.title}</h3>

      <p>
        {item.category} ·{' '}
        {item.color || 'Color unknown'}
      </p>

      <p>⌖ {item.location}</p>

      <p>{item.date}</p>
    </div>
  )
}

export default SmartMatches