import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import StatusBadge from '../components/StatusBadge'
import { deleteReport, getReports, } from '../utils/reportStorage'
function ItemDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [report, setReport] = useState(null)

  useEffect(() => {
    const reports = getReports()
    const selectedReport = reports.find((item) => item.id === id)

    setReport(selectedReport || null)

    if (selectedReport) {
      const recentlyViewed =
        JSON.parse(localStorage.getItem('recallRecentlyViewed')) || []

      const updatedRecentlyViewed = [
        selectedReport,
        ...recentlyViewed.filter((item) => item.id !== selectedReport.id),
      ].slice(0, 5)

      localStorage.setItem(
        'recallRecentlyViewed',
        JSON.stringify(updatedRecentlyViewed),
      )
    }
  }, [id])
  const handleDelete = () => {
    const confirmed = window.confirm(
      `Delete recovery case ${report.id}? This action cannot be undone.`,
    )

    if (!confirmed) return

    deleteReport(report.id)
    navigate('/reports')
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
          <span className="details-id">{report.id}</span>
          <h1>{report.title}</h1>
        </div>

        <div className="details-header-actions">
          <StatusBadge status={report.status} />

          <Button
            variant="secondary"
            onClick={() => navigate(`/items/${report.id}/edit`)}
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
          <p className="card-label">CASE DESCRIPTION</p>
          <p className="case-description">{report.description}</p>

          <div className="details-information">
            <Detail label="Report Type" value={report.type} />
            <Detail label="Category" value={report.category} />
            <Detail label="Color" value={report.color || 'Not specified'} />
            <Detail label="Campus Location" value={report.location} />
            <Detail label="Report Date" value={report.date} />
            <Detail label="Recovery ID" value={report.id} />
          </div>
        </article>

        <article className="details-card timeline-card">
          <p className="card-label">RECOVERY TIMELINE</p>

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

          <Button onClick={() => navigate('/dashboard/matches')}>
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
    <div className={`timeline-step ${active ? 'active' : ''}`}>
      <span className="timeline-dot"></span>

      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default ItemDetails