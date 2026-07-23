import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import StatCard from '../components/StatCard'
import StatusBadge from '../components/StatusBadge'
import { useEffect, useState } from 'react'
import api from '../services/api'

function Home() {
  const navigate = useNavigate()
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await api.get('/reports')
        setReports(response.data)
      } catch (error) {
        console.error('Failed to fetch reports:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  const lostCount = reports.filter(
    (report) => report.status === 'Lost',
  ).length

  const foundCount = reports.filter(
    (report) => report.status === 'Found',
  ).length

  const returnedCount = reports.filter(
    (report) => report.status === 'Returned',
  ).length

  const recentCases = [...reports]
    .sort(
      (first, second) =>
        new Date(second.date) - new Date(first.date),
    )
    .slice(0, 3)

  if (loading) {
    return (
      <section>
        <div className="empty-state">
          <h2>Loading home...</h2>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            SMART CAMPUS RECOVERY NETWORK
          </p>

          <h1>
            Lost something?
            <span> Let's bring it back.</span>
          </h1>

          <p className="hero-description">
            RECALL connects lost and found reports, identifies possible
            matches, verifies ownership, and tracks every recovery until
            the item returns home.
          </p>

          <div className="hero-actions">
            <Button onClick={() => navigate('/report-item')}>
              Report an Item
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate('/reports')}
            >
              Browse Reports
            </Button>
          </div>
        </div>

        <div className="recovery-panel">
          <div className="panel-header">
            <span>LIVE RECOVERY SIGNAL</span>
            <StatusBadge status="Found" />
          </div>

          <div className="match-score">
            <strong>87%</strong>
            <span>POSSIBLE MATCH</span>
          </div>

          <div className="match-line">
            <div>
              <small>LOST</small>
              <p>Black OnePlus Nord</p>
              <span>CSE Block</span>
            </div>

            <div className="signal-link">↔</div>

            <div>
              <small>FOUND</small>
              <p>Black OnePlus Phone</p>
              <span>Lab Corridor</span>
            </div>
          </div>

          <p className="recovery-id">
            RECOVERY ID · RCL-2026-0017
          </p>
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">NETWORK OVERVIEW</p>
            <h2>Recovery at a glance</h2>
          </div>
        </div>

        <div className="stats-grid">
          <StatCard
            label="Total Reports"
            value={reports.length}
            icon="◎"
            trend="Campus records"
          />

          <StatCard
            label="Lost Items"
            value={lostCount}
            icon="?"
            trend="Active cases"
          />

          <StatCard
            label="Found Items"
            value={foundCount}
            icon="⌖"
            trend="Awaiting claims"
          />

          <StatCard
            label="Recovered"
            value={returnedCount}
            icon="✓"
            trend="Cases closed"
          />
        </div>
      </section>

      <section className="home-section recent-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">RECENT SIGNALS</p>
            <h2>Latest recovery cases</h2>
          </div>

          <Button
            variant="ghost"
            onClick={() => navigate('/reports')}
          >
            View All
          </Button>
        </div>

        <div className="case-list">
          {recentCases.map((item) => (
            <article className="case-row" key={item._id}>
              <div>
                <span className="case-id">{item._id}</span>
                <h3>{item.title}</h3>
                <p>{item.location}</p>
              </div>

              <StatusBadge status={item.status} />
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export default Home