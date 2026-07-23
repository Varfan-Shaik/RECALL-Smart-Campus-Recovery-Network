import { useLocation } from 'react-router-dom'

function NotFound() {
  const location = useLocation()

  return (
    <div style={{ padding: '40px' }}>
      <h1>404</h1>
      <h2>{location.pathname}</h2>
    </div>
  )
}

export default NotFound