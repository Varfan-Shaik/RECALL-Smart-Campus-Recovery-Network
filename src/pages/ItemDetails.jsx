import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import StatusBadge from '../components/StatusBadge'
import api from '../services/api'

function ItemDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await api.get(`/reports/${id}`)

        setReport(response.data)

        const recentlyViewed =
          JSON.parse(localStorage.getItem('recallRecentlyViewed')) || []

        const updatedRecentlyViewed = [
          response.data,
          ...recentlyViewed.filter(
            (item) => item._id !== response.data._id,
          ),
        ].slice(0, 5)

        localStorage.setItem(
          'recallRecentlyViewed',
          JSON.stringify(updatedRecentlyViewed),
        )
      } catch (error) {
        console.error('Failed to fetch report:', error)
        setReport(null)
      } finally {
        setLoading(false)
      }
    }

    fetchReport()
  }, [id])

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Delete this recovery case? This action cannot be undone.',
    )

    if (!confirmed) return

    try {
      await api.delete(`/reports/${report._id}`)
      navigate('/reports')
    } catch (error) {
      console.error('Failed to delete report:', error)
    }
  }

  if (loading) {
    return (
      <section className="details-page">
        <div className="empty-state">
          <h2>Loading recovery case...</h2>
        </div>
      </section>
    )
  }

  if (!report) {
    return (
      <section className="details-page">
        <div className="empty-state">
          <span>404</span>
          <h2>Recovery case not found.</h2>
          <p>The requested Recovery ID does not exist.</p>

          <Button onClick={() => navigate('/reports')}>
            Return to Reports
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="details-page">
      <button
        className="back-button"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="details-header">
        <div>
          <p className="eyebrow">RECOVERY CASE</p>

          <span className="details-id">
            {report.recoveryId || report._id}
          </span>

          <h1>{report.title}</h1>
        </div>

        <div className="details-header-actions">
          <StatusBadge status={report.status} />

          <Button
            variant="secondary"
            onClick={() =>
              navigate(`/items/${report._id}/edit`)
            }
          >
            Edit Report
          </Button>

          <button
            className="delete-report-button"
            onClick={handleDelete}
          >
            Delete Report
          </button>
        </div>
      </div>

      <div className="details-grid">
        <article className="details-card main-details-card">
          <p className="card-label">
            CASE DESCRIPTION
          </p>

          <p className="case-description">
            {report.description}
          </p>

          <div className="details-information">
            <Detail
              label="Report Type"
              value={report.type}
            />

            <Detail
              label="Category"
              value={report.category}
            />

            <Detail
              label="Color"
              value={report.color || 'Not specified'}
            />

            <Detail
              label="Campus Location"
              value={report.location}
            />

            <Detail
              label="Report Date"
              value={report.date}
            />

            <Detail
              label="Recovery ID"
              value={report.recoveryId || report._id}
            />
          </div>
        </article>

        <article className="details-card timeline-card">
          <p className="card-label">
            RECOVERY TIMELINE
          </p>

          <div className="recovery-timeline">
            <TimelineStep
              title="Case Reported"
              text="Recovery signal registered."
              active
            />

            <TimelineStep
              title="Smart Match Scan"
              text="Searching campus records."
              active={report.status !== 'Lost'}
            />

            <TimelineStep
              title="Claim Verification"
              text="Ownership verification pending."
              active={report.status === 'Returned'}
            />

            <TimelineStep
              title="Item Returned"
              text="Recovery case successfully closed."
              active={report.status === 'Returned'}
            />
          </div>

          <Button
            onClick={() =>
              navigate('/dashboard/matches')
            }
          >
            Find Possible Matches
          </Button>
        </article>
      </div>
    </section>
  )
}

function Detail({ label, value }) {
  return (
    <div className="detail-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function TimelineStep({ title, text, active }) {
  return (
    <div
      className={`timeline-step ${active ? 'active' : ''
        }`}
    >
      <span className="timeline-dot"></span>

      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default ItemDetails