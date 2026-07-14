import { useState } from 'react'
import { getReports } from '../utils/reportStorage'
import { generateHotspotInsights } from '../utils/hotspotEngine'

function HotspotInsights() {
  const [view, setView] = useState('All')

  const reports = getReports()
  const hotspots = generateHotspotInsights(reports)

  const visibleHotspots = hotspots.filter((hotspot) => {
    if (view === 'Lost') return hotspot.lost > 0
    if (view === 'Found') return hotspot.found > 0

    return true
  })

  const maximumReports = Math.max(
    ...hotspots.map((hotspot) => hotspot.total),
    1,
  )

  const totalLost = hotspots.reduce(
    (total, hotspot) => total + hotspot.lost,
    0,
  )
  const highestCount = hotspots[0]?.total || 0

const highestLocations = hotspots.filter(
  (hotspot) => hotspot.total === highestCount,
)

const highestActivity =
  highestLocations.length > 1
    ? 'Multiple Locations'
    : highestLocations[0]?.location || 'No data'

  return (
    <section>
      <div className="dashboard-heading hotspot-heading">
        <div>
          <p className="eyebrow">CAMPUS SIGNAL ANALYSIS</p>
          <h1>Recovery hotspots.</h1>

          <p>
            Every reported campus location is automatically analyzed and
            ranked by RECALL.
          </p>
        </div>

        <div className="hotspot-filter">
          {['All', 'Lost', 'Found'].map((option) => (
            <button
              key={option}
              className={view === option ? 'active' : ''}
              onClick={() => setView(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="hotspot-summary">
        <SummaryCard
          label="Locations Tracked"
          value={hotspots.length}
        />

        <SummaryCard
          label="Highest Activity"
          value={highestActivity}
        />

        <SummaryCard
          label="Lost Signals"
          value={totalLost}
        />
      </div>

      <div className="signal-grid-section">
        <div className="signal-grid-heading">
          <div>
            <p className="card-label">DYNAMIC LOCATION NETWORK</p>
            <h2>Campus signal grid</h2>
          </div>

          <span>{visibleHotspots.length} LOCATIONS ACTIVE</span>
        </div>

        {visibleHotspots.length === 0 ? (
          <div className="empty-state">
            <span>◎</span>
            <h2>No location signals found.</h2>
            <p>No locations match the selected report type.</p>
          </div>
        ) : (
          <div className="location-signal-grid">
            {visibleHotspots.map((hotspot, index) => (
              <article
                className={`location-signal-card risk-border-${hotspot.riskLevel.toLowerCase()}`}
                key={hotspot.location}
              >
                <div className="location-card-top">
                  <span>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <strong
                    className={`risk-text-${hotspot.riskLevel.toLowerCase()}`}
                  >
                    {hotspot.riskLevel} Activity
                  </strong>
                </div>

                <h3>{hotspot.location}</h3>

                <div className="location-signal-count">
                  <strong>{hotspot.total}</strong>
                  <span>TOTAL SIGNALS</span>
                </div>

                <div className="location-breakdown">
                  <div>
                    <span>Lost</span>
                    <strong>{hotspot.lost}</strong>
                  </div>

                  <div>
                    <span>Found</span>
                    <strong>{hotspot.found}</strong>
                  </div>

                  <div>
                    <span>Returned</span>
                    <strong>{hotspot.returned}</strong>
                  </div>
                </div>

                <div className="signal-strength-track">
                  <span
                    style={{
                      width: `${(hotspot.total / maximumReports) * 100}%`,
                    }}
                  ></span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <article className="hotspot-ranking dynamic-ranking">
        <p className="card-label">LOCATION RANKING</p>
        <h2>Activity by area</h2>

        <div className="ranking-list">
          {visibleHotspots.map((hotspot, index) => (
            <div className="ranking-row" key={hotspot.location}>
              <span className="ranking-number">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="ranking-info">
                <div>
                  <strong>{hotspot.location}</strong>

                  <span>
                    {hotspot.lost} lost · {hotspot.found} found
                  </span>
                </div>

                <div className="activity-track">
                  <span
                    style={{
                      width: `${(hotspot.total / maximumReports) * 100}%`,
                    }}
                  ></span>
                </div>
              </div>

              <span
                className={`risk-label risk-text-${hotspot.riskLevel.toLowerCase()}`}
              >
                {hotspot.riskLevel}
              </span>
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}

function SummaryCard({ label, value }) {
  return (
    <article className="hotspot-summary-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  )
}

export default HotspotInsights