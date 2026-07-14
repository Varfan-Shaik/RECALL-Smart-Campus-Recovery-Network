import { NavLink, useNavigate } from 'react-router-dom'

const menuItems = [
  { label: 'Overview', path: '/dashboard' },
  { label: 'Reports', path: '/reports' },
  { label: 'Smart Matches', path: '/dashboard/matches' },
  { label: 'Hotspot Insights', path: '/dashboard/hotspots' },
  { label: 'Favorites', path: '/dashboard/favorites' },
  { label: 'Recently Viewed', path: '/dashboard/recent' },
  { label: 'Profile', path: '/dashboard/profile' },
  { label: 'Settings', path: '/dashboard/settings' },
]

function Sidebar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('recallCurrentUser')
    navigate('/login', { replace: true })
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-title">RECOVERY CENTER</div>

      <nav>
        {menuItems.map((item) => (
          <NavLink key={item.path} to={item.path} end>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-network">
        <span></span>

        <div>
          <strong>Network Online</strong>
          <p>Campus recovery active</p>
        </div>
      </div>

      <button
        className="sidebar-logout"
        onClick={handleLogout}
      >
        <span>↪</span>
        Logout
      </button>
    </aside>
  )
}

export default Sidebar