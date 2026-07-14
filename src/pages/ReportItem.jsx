import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import {
  generateRecoveryId,
  getReports,
  saveReports,
} from '../utils/reportStorage'

const initialForm = {
  title: '',
  type: 'Lost',
  category: '',
  color: '',
  location: '',
  date: '',
  description: '',
}

function ReportItem() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

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

    const reports = getReports()
    const recoveryId = generateRecoveryId(reports)

    const newReport = {
      id: recoveryId,
      ...form,
      status: form.type,
    }

    saveReports([newReport, ...reports])

    setSuccess(
      `Recovery case ${recoveryId} created successfully.`,
    )

    setForm(initialForm)

    setTimeout(() => {
      navigate('/reports')
    }, 1500)
  }

  return (
    <section className="report-page">
      <div className="report-heading">
        <p className="eyebrow">NEW RECOVERY SIGNAL</p>
        <h1>Report an item.</h1>
        <p>
          Submit accurate information to help RECALL identify possible
          matches across the campus recovery network.
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
              value={form.color}
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
              placeholder="Describe identifying details, where the item was last seen or how it was found..."
            />

            {errors.description && (
              <span className="field-error">
                {errors.description}
              </span>
            )}
          </div>

          <div className="form-actions">
            <Button type="submit">Create Recovery Case</Button>

            <Button
              variant="secondary"
              onClick={() => navigate('/dashboard')}
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

export default ReportItem