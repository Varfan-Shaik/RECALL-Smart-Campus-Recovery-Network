import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

const initialForm = {
  fullName: '',
  email: '',
  mobile: '',
  password: '',
  confirmPassword: '',
  gender: '',
  dob: '',
  college: '',
  branch: '',
  graduationYear: '',
  skills: '',
  resume: '',
  terms: false,
}

function Register() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target

    setForm((previous) => ({
      ...previous,
      [name]:
        type === 'checkbox'
          ? checked
          : type === 'file'
            ? files?.[0]?.name || ''
            : value,
    }))
  }

  const validateForm = () => {
    const nextErrors = {}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/

    if (!form.fullName.trim()) nextErrors.fullName = 'Full name is required.'

    if (!emailPattern.test(form.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (!/^\d{10}$/.test(form.mobile)) {
      nextErrors.mobile = 'Mobile number must contain exactly 10 digits.'
    }

    if (!passwordPattern.test(form.password)) {
      nextErrors.password =
        'Use 8+ characters with uppercase, lowercase, number and special character.'
    }

    if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = 'Passwords do not match.'
    }

    if (!form.terms) {
      nextErrors.terms = 'Accept the terms and conditions to register.'
    }

    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const validationErrors = validateForm()
    setErrors(validationErrors)
    setSuccess('')

    if (Object.keys(validationErrors).length > 0) return

    const registeredUsers =
      JSON.parse(localStorage.getItem('recallUsers')) || []

    const userExists = registeredUsers.some(
      (user) => user.email.toLowerCase() === form.email.toLowerCase(),
    )

    if (userExists) {
      setErrors({ email: 'An account already exists with this email.' })
      return
    }

    registeredUsers.push(form)

    localStorage.setItem(
      'recallUsers',
      JSON.stringify(registeredUsers),
    )

    setSuccess('Registration successful. Your recovery profile is ready.')
    setForm(initialForm)
    setErrors({})

    setTimeout(() => navigate('/login'), 1500)
  }

  const handleReset = () => {
    setForm(initialForm)
    setErrors({})
    setSuccess('')
  }

  return (
    <section className="auth-page">
      <div className="auth-intro">
        <p className="eyebrow">JOIN THE RECOVERY NETWORK</p>
        <h1>Create your RECALL identity.</h1>
        <p>
          Register your student profile to report items, receive smart match
          alerts and participate in verified campus recoveries.
        </p>

        <div className="auth-signal">
          <span></span>
          Student recovery network accepting registrations
        </div>
      </div>

      <div className="auth-card register-card">
        <div className="auth-card-heading">
          <p>NEW RECOVERY PROFILE</p>
          <h2>Student Registration</h2>
        </div>

        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <FormField
              label="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              error={errors.fullName}
            />

            <FormField
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />

            <FormField
              label="Mobile Number"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              error={errors.mobile}
            />

            <div className="form-field">
              <label>Password</label>

              <div className="password-field">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>

              {errors.password && (
                <span className="field-error">{errors.password}</span>
              )}
            </div>

            <FormField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />

            <div className="form-field">
              <label>Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange}>
                <option value="">Select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <FormField
              label="Date of Birth"
              name="dob"
              type="date"
              value={form.dob}
              onChange={handleChange}
            />

            <FormField
              label="College Name"
              name="college"
              value={form.college}
              onChange={handleChange}
            />

            <FormField
              label="Branch"
              name="branch"
              value={form.branch}
              onChange={handleChange}
            />

            <FormField
              label="Graduation Year"
              name="graduationYear"
              type="number"
              value={form.graduationYear}
              onChange={handleChange}
            />

            <FormField
              label="Skills"
              name="skills"
              value={form.skills}
              onChange={handleChange}
            />

            <div className="form-field">
              <label>Resume Upload</label>
              <input
                name="resume"
                type="file"
                onChange={handleChange}
              />
              {form.resume && <small>Selected: {form.resume}</small>}
            </div>
          </div>

          <label className="terms-field">
            <input
              type="checkbox"
              name="terms"
              checked={form.terms}
              onChange={handleChange}
            />
            <span>I accept the RECALL terms and recovery guidelines.</span>
          </label>

          {errors.terms && (
            <span className="field-error">{errors.terms}</span>
          )}

          <div className="form-actions">
            <Button type="submit">Register Profile</Button>

            <Button type="button" variant="secondary" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
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
      {error && <span className="field-error">{error}</span>}
    </div>
  )
}

export default Register