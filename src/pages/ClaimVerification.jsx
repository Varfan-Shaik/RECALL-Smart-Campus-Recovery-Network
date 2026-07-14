import { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Button from '../components/Button'
import { getReports } from '../utils/reportStorage'

function ClaimVerification() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const lostId = searchParams.get('lost')
  const navigate = useNavigate()

  const reports = getReports()

  const foundItem = reports.find((report) => report.id === id)
  const lostItem = reports.find((report) => report.id === lostId)

  const [form, setForm] = useState({
    identifyingDetail: '',
    lastSeenLocation: '',
    ownershipProof: '',
    declaration: false,
  })

  const [errors, setErrors] = useState({})
  const [result, setResult] = useState(null)
  const [verifying, setVerifying] = useState(false)

  if (!foundItem || !lostItem) {
    return (
      <section className="claim-page">
        <div className="empty-state">
          <span>404</span>
          <h2>Verification case unavailable.</h2>
          <p>The recovery connection could not be found.</p>
          <Button onClick={() => navigate('/dashboard/matches')}>
            Return to Matches
          </Button>
        </div>
      </section>
    )
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }))

    setResult(null)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = {}

    if (form.identifyingDetail.trim().length < 5) {
      nextErrors.identifyingDetail =
        'Provide a clear identifying detail.'
    }

    if (!form.lastSeenLocation.trim()) {
      nextErrors.lastSeenLocation =
        'Enter where you last remember the item.'
    }

    if (form.ownershipProof.trim().length < 5) {
      nextErrors.ownershipProof =
        'Describe supporting ownership information.'
    }

    if (!form.declaration) {
      nextErrors.declaration =
        'Confirm the ownership declaration.'
    }

    setErrors(nextErrors)
    setResult(null)

    if (Object.keys(nextErrors).length > 0) return

    setVerifying(true)

    setTimeout(() => {
      const locationMatch =
        form.lastSeenLocation
          .toLowerCase()
          .includes(lostItem.location.toLowerCase()) ||
        lostItem.location
          .toLowerCase()
          .includes(form.lastSeenLocation.toLowerCase())

      const detailWords = form.identifyingDetail
        .toLowerCase()
        .split(/\s+/)
        .filter((word) => word.length > 3)

      const itemText = `${lostItem.title} ${lostItem.color} ${lostItem.description}`
        .toLowerCase()

      const detailMatch = detailWords.some((word) =>
        itemText.includes(word),
      )

      const verificationScore =
        (locationMatch ? 50 : 0) + (detailMatch ? 50 : 0)

      const verification = {
        id: `CLM-${Date.now()}`,
        foundItemId: foundItem.id,
        lostItemId: lostItem.id,
        verificationScore,
        status:
          verificationScore >= 50
            ? 'Pending Review'
            : 'Needs More Evidence',
        submittedAt: new Date().toISOString(),
      }

      const previousClaims =
        JSON.parse(localStorage.getItem('recallClaims')) || []

      localStorage.setItem(
        'recallClaims',
        JSON.stringify([verification, ...previousClaims]),
      )

      setVerifying(false)

      setResult({
        type: verificationScore >= 50 ? 'success' : 'error',
        message:
          verificationScore >= 50
            ? `Ownership signal accepted with ${verificationScore}% verification confidence. Claim moved to pending review.`
            : `Verification confidence is ${verificationScore}%. More ownership evidence is required.`,
      })
    }, 1800)
  }

  return (
    <section className="claim-page">
      <button
        className="back-button"
        onClick={() => navigate('/dashboard/matches')}
      >
        ← Back to Smart Matches
      </button>

      <div className="claim-heading">
        <p className="eyebrow">OWNERSHIP VERIFICATION</p>
        <h1>Prove the recovery connection.</h1>
        <p>
          RECALL checks private ownership signals before a found item can
          move toward recovery.
        </p>
      </div>

      <div className="claim-grid">
        <article className="claim-connection">
          <p className="card-label">MATCH UNDER REVIEW</p>

          <div className="claim-item">
            <span>LOST CASE · {lostItem.id}</span>
            <h2>{lostItem.title}</h2>
            <p>{lostItem.location}</p>
          </div>

          <div className="claim-link">↓</div>

          <div className="claim-item">
            <span>FOUND CASE · {foundItem.id}</span>
            <h2>{foundItem.title}</h2>
            <p>{foundItem.location}</p>
          </div>

          <div className="privacy-note">
            <strong>Private verification layer</strong>
            <p>
              Answers are used only to evaluate this recovery claim.
            </p>
          </div>
        </article>

        <article className="claim-form-card">
          <p className="card-label">CLAIMANT SIGNALS</p>
          <h2>Ownership questions</h2>

          {result?.type === 'success' && (
            <div className="success-message">{result.message}</div>
          )}

          {result?.type === 'error' && (
            <div className="error-message">{result.message}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label>
                What unique detail can identify your item?
              </label>

              <textarea
                name="identifyingDetail"
                rows="3"
                value={form.identifyingDetail}
                onChange={handleChange}
                placeholder="Example: cracked back cover, sticker, initials..."
              />

              {errors.identifyingDetail && (
                <span className="field-error">
                  {errors.identifyingDetail}
                </span>
              )}
            </div>

            <div className="form-field">
              <label>Where did you last see the item?</label>

              <input
                name="lastSeenLocation"
                value={form.lastSeenLocation}
                onChange={handleChange}
              />

              {errors.lastSeenLocation && (
                <span className="field-error">
                  {errors.lastSeenLocation}
                </span>
              )}
            </div>

            <div className="form-field">
              <label>
                Provide another ownership detail
              </label>

              <textarea
                name="ownershipProof"
                rows="3"
                value={form.ownershipProof}
                onChange={handleChange}
                placeholder="Contents, device model, marks or other private details..."
              />

              {errors.ownershipProof && (
                <span className="field-error">
                  {errors.ownershipProof}
                </span>
              )}
            </div>

            <label className="terms-field">
              <input
                type="checkbox"
                name="declaration"
                checked={form.declaration}
                onChange={handleChange}
              />

              <span>
                I declare that I am the legitimate owner of this item.
              </span>
            </label>

            {errors.declaration && (
              <span className="field-error">
                {errors.declaration}
              </span>
            )}

            <div className="form-actions">
              <Button type="submit">
                {verifying
                  ? 'Analyzing Claim...'
                  : 'Verify Ownership'}
              </Button>
            </div>

            {verifying && (
              <div className="login-loader">
                <span></span>
                Comparing private ownership signals...
              </div>
            )}
          </form>
        </article>
      </div>
    </section>
  )
}

export default ClaimVerification