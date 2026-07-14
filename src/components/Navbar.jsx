import { NavLink, useNavigate } from 'react-router-dom'
import Button from './Button'

function Navbar() {
  const navigate = useNavigate()

  return (
    <header className="navbar">
      <NavLink to="/" className="nav-brand">
        <span className="nav-logo">R</span>
        <span>RECALL</span>
      </NavLink>

      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/reports">Reports</NavLink>
        <NavLink to="/safety">Safety</NavLink>
      </nav>

      <div className="nav-actions">
        <NavLink to="/login">Login</NavLink>

        <Button onClick={() => navigate('/report-item')}>
          Report Item
        </Button>
      </div>
    </header>
  )
}

export default Navbar