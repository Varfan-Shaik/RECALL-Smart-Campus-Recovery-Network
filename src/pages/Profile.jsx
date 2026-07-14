import { useState } from 'react'

function Profile() {
  const savedUser =
    JSON.parse(localStorage.getItem('recallCurrentUser')) || {}

  const [user, setUser] = useState({
    name: savedUser.fullName || '',
    email: savedUser.email || '',
    department: savedUser.department || '',
    studentId: savedUser.studentId || '',
  })

  const [saved, setSaved] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setUser((previous) => ({
      ...previous,
      [name]: value,
    }))

    setSaved(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    localStorage.setItem(
       'recallCurrentUser',
      JSON.stringify({
        ...savedUser,
        ...user,
        fullName: user.name,
      }),
    )

    setSaved(true)
  }

  const initials = user.name
    ? user.name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'RC'

  return (
    <section className="profile-page">
      <div className="collection-heading">
        <p className="eyebrow">RECOVERY IDENTITY</p>
        <h1>Your profile.</h1>

        <p>
          Manage the campus identity connected to your RECALL account.
        </p>
      </div>

      <div className="profile-grid">
        <article className="profile-identity-card">
          <div className="profile-avatar">{initials}</div>

          <h2>{user.name || 'RECALL User'}</h2>
          <p>{user.email || 'No email available'}</p>

          <div className="profile-status">
            <span></span>
            ACTIVE RECALL ACCOUNT
          </div>

          <div className="profile-id-block">
            <span>NETWORK ROLE</span>
            <strong>Campus Member</strong>
          </div>
        </article>

        <article className="profile-form-card">
          <p className="card-label">ACCOUNT INFORMATION</p>
          <h2>Identity details</h2>

          {saved && (
            <div className="success-message">
              Profile information updated successfully.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Full Name</label>

              <input
                name="name"
                value={user.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>Email Address</label>

              <input
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>Department</label>

              <input
                name="department"
                value={user.department}
                onChange={handleChange}
                placeholder="Example: CSE - Data Science"
              />
            </div>

            <div className="form-field">
              <label>Student ID</label>

              <input
                name="studentId"
                value={user.studentId}
                onChange={handleChange}
                placeholder="Campus identification number"
              />
            </div>

            <div className="form-actions">
              <button className="primary-button" type="submit">
                Save Profile
              </button>
            </div>
          </form>
        </article>
      </div>
    </section>
  )
}

export default Profile