import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { addActivity } from '../utils/activityStorage'

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loginResult, setLoginResult] = useState(null)

  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))

    setLoginResult(null)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = {}

    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.'
    }

    if (!form.password) {
      nextErrors.password = 'Password is required.'
    }

    setErrors(nextErrors)
    setLoginResult(null)

    if (Object.keys(nextErrors).length > 0) return

    setLoading(true)

    setTimeout(() => {
      const registeredUsers =
        JSON.parse(localStorage.getItem('recallUsers')) || []

      const matchedUser = registeredUsers.find(
        (user) =>
          user.email.toLowerCase() === form.email.toLowerCase() &&
          user.password === form.password,
      )

      setLoading(false)

      if (matchedUser) {
        localStorage.setItem(
          'recallCurrentUser',
          JSON.stringify(matchedUser),
        )
        addActivity(
          'Login',
          `${matchedUser.fullName} logged into RECALL.`,
        )

        setLoginResult({
          type: 'success',
          message: `Welcome back, ${matchedUser.fullName}.`,
        })

        setTimeout(() => navigate('/dashboard'), 1000)
      } else {
        setLoginResult({
          type: 'error',
          message: 'Invalid email or password. Please try again.',
        })
      }
    }, 2000)
  }

  const handleClear = () => {
    setForm({
      email: '',
      password: '',
    })

    setErrors({})
    setLoginResult(null)
  }

  return (
    <section className="auth-page login-page">
      <div className="auth-intro">
        <p className="eyebrow">RECOVERY ACCESS</p>

        <h1>Return to the network.</h1>

        <p>
          Access your recovery cases, smart match alerts and verified
          campus reports through your RECALL identity.
        </p>

        <div className="auth-signal">
          <span></span>
          Secure recovery access online
        </div>
      </div>

      <div className="auth-card login-card">
        <div className="auth-card-heading">
          <p>IDENTITY VERIFICATION</p>
          <h2>Login to RECALL</h2>
        </div>

        {loginResult?.type === 'success' && (
          <div className="success-message">
            {loginResult.message}
          </div>
        )}

        {loginResult?.type === 'error' && (
          <div className="error-message">
            {loginResult.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="login-fields">
            <div className="form-field">
              <label>Email Address</label>

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="student@college.edu"
              />

              {errors.email && (
                <span className="field-error">{errors.email}</span>
              )}
            </div>

            <div className="form-field">
              <label>Password</label>

              <div className="password-field">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>

              {errors.password && (
                <span className="field-error">
                  {errors.password}
                </span>
              )}
            </div>
          </div>

          <button type="button" className="forgot-link">
            Forgot Password?
          </button>

          <div className="form-actions login-actions">
            <Button type="submit">
              {loading ? 'Verifying...' : 'Login'}
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={handleClear}
            >
              Clear
            </Button>
          </div>

          {loading && (
            <div className="login-loader">
              <span></span>
              Verifying recovery identity...
            </div>
          )}

          <p className="register-prompt">
            New to the recovery network?{' '}
            <Link to="/register">Create Profile</Link>
          </p>
        </form>
      </div>
    </section>
  )
}

export default Login