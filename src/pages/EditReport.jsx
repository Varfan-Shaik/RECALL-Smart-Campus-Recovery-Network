import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import {
  getReports,
  updateReport,
} from '../utils/reportStorage'

function EditReport() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState(null)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const reports = getReports()
    const selectedReport = reports.find(
      (report) => report.id === id,
    )

    setForm(selectedReport || null)
  }, [id])

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = {}

    if (!form.title.trim()) {
      nextErrors.title = 'Item title is required.'
    }

    if (!form.category) {
      nextErrors.category = 'Select an item category.'
    }

    if (!form.location.trim()) {
      nextErrors.location = 'Location is required.'
    }

    if (!form.date) {
      nextErrors.date = 'Select the report date.'
    }

    if (!form.description.trim()) {
      nextErrors.description = 'Describe the item.'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    updateReport({
      ...form,
      status: form.type,
    })

    setSuccess(
      `Recovery case ${form.id} updated successfully.`,
    )

    setTimeout(() => {
      navigate(`/items/${form.id}`)
    }, 1200)
  }

  if (!form) {
    return (
      <section className="report-page">
        <div className="empty-state">
          <span>404</span>
          <h2>Recovery case not found.</h2>

          <Button onClick={() => navigate('/reports')}>
            Return to Reports
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="report-page">
      <div className="report-heading">
        <p className="eyebrow">UPDATE RECOVERY SIGNAL</p>
        <h1>Edit recovery case.</h1>

        <p>
          Update case information and preserve the latest recovery
          details across the RECALL network.
        </p>
      </div>

      <div className="report-form-card">
        {success && (
          <div className="success-message">{success}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <ReportField
              label="Item Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              error={errors.title}
            />

            <div className="form-field">
              <label>Report Type</label>

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
              >
                <option>Lost</option>
                <option>Found</option>
              </select>
            </div>

            <div className="form-field">
              <label>Category</label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">Select category</option>
                <option>Electronics</option>
                <option>Documents</option>
                <option>Bags</option>
                <option>Accessories</option>
                <option>Books</option>
                <option>Keys</option>
                <option>Other</option>
              </select>

              {errors.category && (
                <span className="field-error">
                  {errors.category}
                </span>
              )}
            </div>

            <ReportField
              label="Color"
              name="color"
              value={form.color || ''}
              onChange={handleChange}
            />

            <ReportField
              label="Campus Location"
              name="location"
              value={form.location}
              onChange={handleChange}
              error={errors.location}
            />

            <ReportField
              label="Date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              error={errors.date}
            />
          </div>

          <div className="form-field description-field">
            <label>Item Description</label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="5"
            />

            {errors.description && (
              <span className="field-error">
                {errors.description}
              </span>
            )}
          </div>

          <div className="form-actions">
            <Button type="submit">Save Changes</Button>

            <Button
              variant="secondary"
              onClick={() => navigate(`/items/${form.id}`)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

function ReportField({
  label,
  name,
  value,
  onChange,
  error,
  type = 'text',
}) {
  return (
    <div className="form-field">
      <label>{label}</label>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />

      {error && (
        <span className="field-error">{error}</span>
      )}
    </div>
  )
}

export default EditReport