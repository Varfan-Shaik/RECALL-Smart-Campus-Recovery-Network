import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const currentUser = localStorage.getItem('recallCurrentUser')

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute