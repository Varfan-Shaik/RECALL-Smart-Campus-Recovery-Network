import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import StatCard from '../components/StatCard'
import StatusBadge from '../components/StatusBadge'
import { getReports } from '../utils/reportStorage'
import { getActivities } from '../utils/activityStorage'

function Dashboard() {
  const navigate = useNavigate()

  const [reports] = useState(getReports)
  const [activities] = useState(getActivities)
  const [guidance, setGuidance] = useState([])
  const [apiLoading, setApiLoading] = useState(true)
  const [apiError, setApiError] = useState('')

  const currentUser =
    JSON.parse(localStorage.getItem('recallCurrentUser')) || {}

  useEffect(() => {
    const fetchRecoveryGuidance = async () => {
      try {
        setApiLoading(true)
        setApiError('')

        const response = await fetch('/recovery-guidance.json')

        if (!response.ok) {
          throw new Error('Failed to fetch recovery guidance.')
        }

        const data = await response.json()
        setGuidance(data)
      } catch {
        setApiError(
          'Recovery guidance is temporarily unavailable.',
        )
      } finally {
        setApiLoading(false)
      }
    }

    fetchRecoveryGuidance()
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

  return (
    <section>
      <div className="dashboard-heading">
        <div>
          <p className="eyebrow">RECOVERY CENTER</p>

          <h1>
            Welcome, {currentUser.fullName || 'Student'}.
          </h1>

          <p>
            Monitor campus recovery signals and manage active cases.
          </p>
        </div>

        <Button onClick={() => navigate('/report-item')}>
          Report Item
        </Button>
      </div>

      <div className="stats-grid">
        <StatCard
          label="Total Reports"
          value={reports.length}
          icon="R"
          trend="Campus records"
        />

        <StatCard
          label="Lost Items"
          value={lostCount}
          icon="L"
          trend="Active cases"
        />

        <StatCard
          label="Found Items"
          value={foundCount}
          icon="F"
          trend="Awaiting claims"
        />

        <StatCard
          label="Recovered"
          value={returnedCount}
          icon="✓"
          trend="Cases closed"
        />
      </div>

      <div className="campus-api-panel">
        <div>
          <p className="eyebrow">RECOVERY GUIDANCE FEED</p>
          <h2>Safe recovery practices</h2>
        </div>

        {apiLoading ? (
          <div className="api-loading">
            <span></span>
            Fetching recovery guidance...
          </div>
        ) : apiError ? (
          <div className="api-error">{apiError}</div>
        ) : (
          <div className="campus-condition-grid">
            {guidance.map((item) => (
              <div key={item.id}>
                <span>
                  GUIDANCE {String(item.id).padStart(2, '0')}
                </span>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="dashboard-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">ACTIVE SIGNALS</p>
            <h2>Recent recovery cases</h2>
          </div>

          <Button
            variant="ghost"
            onClick={() => navigate('/reports')}
          >
            View Reports
          </Button>
        </div>

        <div className="dashboard-table-wrap">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Recovery ID</th>
                <th>Item</th>
                <th>Location</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td className="table-id">{report.id}</td>
                  <td>{report.title}</td>
                  <td>{report.location}</td>
                  <td>{report.date}</td>

                  <td>
                    <StatusBadge status={report.status} />
                  </td>

                  <td>
                    <button
                      className="table-view"
                      onClick={() =>
                        navigate(`/items/${report.id}`)
                      }
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="dashboard-panel activity-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">NETWORK HISTORY</p>
            <h2>Recent activity</h2>
          </div>
        </div>

        {activities.length === 0 ? (
          <div className="empty-state">
            <h2>No recent activity.</h2>
            <p>RECALL actions will appear here.</p>
          </div>
        ) : (
          <div className="activity-list">
            {activities.map((activity) => (
              <div className="activity-row" key={activity.id}>
                <span className="activity-type">
                  {activity.type}
                </span>

                <div>
                  <strong>{activity.message}</strong>
                  <p>{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Dashboard